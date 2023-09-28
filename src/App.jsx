import "./App.css";
import React, { Component } from "react";

import Spinner from "./Spin";
import Card from "./Card";
import ErrorIndicator from "./ErrorIndicator";
import { debounce } from "lodash";
import { Pagination, Tabs } from "antd";

export default class App extends Component {
  state = {
    movies: [],
    searchInput: "",
    query: "1",
    loading: true,
    error: false,
    isOnline: navigator.onLine,
    pageNumber: 1,
    idSession: "",
    ratedMovies: [],
  };

  onError = (err) => {
    window.dispatchEvent(new Event("offline"));
    this.setState({
      error: true,
      loading: false,
      offline: false,
    });
    return err;
  };

  componentDidMount() {
    window.addEventListener("online", this.handleNetworkChange);
    window.addEventListener("offline", this.handleNetworkChange);

    this.fetchMovies();

    if (this.state.query === this.state.searchInput) {
      this.setState(
        { searchInput: this.state.query, loading: true },
        this.fetchMovies
      );
    }
  }

  fetchMovies = debounce(() => {
    const { query, pageNumber } = this.state;
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6dce2a79655cf9304a13d5633dead5ab&query='${query}'&page=${pageNumber}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const totalItems = data.total_results;
        const totalPages = data.total_pages;
        this.setState(() => {
          return {
            movies: data.results,
            loading: false,
            error: false,
            totalItems,
            totalPages,
          };
        });
      })
      .catch(this.onError);
  }, 500);

  //ГОСТЕВАЯ

  getSession = () => {
    fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=6dce2a79655cf9304a13d5633dead5ab`
    )
      .then((response) => response.json())
      .then((idSession) => {
        this.setState({
          idSession: idSession.guest_session_id,
        });
      });
  };

  getIdSessionMovies = () => {
    const { idSession } = this.state;
    this.setState({
      ratedMovies: [],
    });
    fetch(
      `https://api.themoviedb.org/3/guest_session/${idSession}/rated/movies?api_key=6dce2a79655cf9304a13d5633dead5ab&language=en-US&sort_by=created_at.asc`
    )
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
        this.setState({
          ratedMovies: [...movies.results],
        });
      });
  };

  handleChangeQuery = (event) => {
    const query = event.target.value.trim();
    this.setState({ query }, this.fetchMovies);
  };

  handlePageChange = (pageNumber) => {
    this.setState({ pageNumber }, this.fetchMovies);
  };

  handleNetworkChange = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  render() {
    const { movies, loading, error, isOnline, query, pageNumber } = this.state;

    const totalItems = this.state.totalItems;
    const itemsPerPage = 5;

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <main>
        <div className="offline-message">
          {!isOnline && (
            <div className="isOffline">
              <p>
                Отсутствует подключение к интернету. Проверьте сетевое
                соединение и попробуйте еще раз.
              </p>
            </div>
          )}
        </div>

        <Tabs defaultActiveKey="tab1" centered>
          <Tabs.TabPane tab="Search" className="tab-content" key="tab1">
            <div className="search-block">
              <div className="search-panel">
                <input
                  id="id"
                  className="search-input"
                  type="search"
                  placeholder="Type to search..."
                  autoFocus
                  value={query}
                  onChange={this.handleChangeQuery}
                />
              </div>
            </div>

            <ul className="card-box">
              {query.trim() === "" && (
                <div className="search-start-message">
                  <p>Начните вводить название фильма.</p>
                </div>
              )}

              {movies.length === 0 && query.trim() !== "" && (
                <div className="not-found">
                  <p>
                    Мы не смогли найти ни одного фильма по Вашему запросу.
                    Пожалуйста, измените запрос.
                  </p>
                </div>
              )}

              {movies.map((movie) => {
                return (
                  <Card
                    {...movie} // все данные объекта
                    key={movie.id}
                  />
                );
              })}
            </ul>

            {movies.length !== 0 && (
              <div className="paggy">
                <div className="pagination-container">
                  <Pagination
                    defaultCurrent={1}
                    style={{
                      display: "flex",
                      margin: "0 auto",
                      width: 300,
                    }}
                    current={pageNumber}
                    total={totalItems}
                    pageSize={itemsPerPage}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Rated"
            className="tab-content"
            key="tab2"
            onChange={() => this.getIdSessionMovies()}
          >
            {/* <RatedFilms
              ratedMovies={ratedMovies}
              genres={genres}
              getRatedMovie={(id, value) => this.getRatedMovie(id, value)}
              ratedId={ratedId}
            /> */}
          </Tabs.TabPane>
        </Tabs>
        <header>
          {/* <div className='search-block'>
            <div className="search-panel">
              <input
                id='id'
                className='search-input'
                type='search'
                placeholder='Type to search...'
                autoFocus
                value={query}
                onChange={this.handleChangeQuery}
              />
            </div>
          </div>

          <ul className="card-box">
            {query.trim() === '' && (
              <div className='search-start-message'>
                <p>Начните вводить название фильма.</p>
              </div>
            )}

            {movies.length === 0 && query.trim() !== '' && (

              <div className='not-found'>

                <p>Мы не смогли найти ни одного фильма по Вашему запросу. Пожалуйста, измените запрос.</p>
              </div>
            )}

            {movies.map((movie) => {
              return (
                <Card
                  {...movie} // все данные объекта
                  key={movie.id}
                />
              )
            })}
          </ul> */}

          {/* {movies.length !== 0 && (
            <div className='paggy'>
              <div className="pagination-container">
                <Pagination
                  defaultCurrent={1}
                  style={
                    {
                      display: 'flex',
                      margin: '0 auto',
                      width: 300
                    }}
                  current={pageNumber}
                  total={totalItems}
                  pageSize={itemsPerPage}
                  onChange={this.handlePageChange}
                />
              </div>
            </div>
          )} */}
        </header>
      </main>
    );
  }
}
