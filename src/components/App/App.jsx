import React, { Component } from "react";

import { MovieService } from "../../services/MovieService";
import { Provider } from "../../services/GenresContext";

import Spinner from "../Spin/Spin";

import ErrorIndicator from "../MovieList/ErrorIndicator";

import "./App.css";
import Card from "../Card/Card";
import { debounce } from "lodash";
import { Pagination, Tabs } from "antd";

export default class App extends Component {
  movieService = new MovieService();

  state = {
    moviesData: [],
    searchInput: "",
    query: "",
    loading: true,
    error: false,
    isOnline: navigator.onLine,
    pageNumber: 1,
    idSession: "",
    ratedMovies: [],
    getGenres: [],
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

  async componentDidMount() {
    window.addEventListener("online", this.handleNetworkChange);
    window.addEventListener("offline", this.handleNetworkChange);

    this.fetchMovies();
    try {
      const idSession = await this.movieService.getGuestSession();
      const genresData = await this.movieService.getGenres();
      // console.log(genreData);
      this.setState({ idSession: idSession.guest_session_id });
      this.setState({ getGenres: genresData.genres });
    } catch (err) {
      throw new Error(err);
    }
    // this.getSession();
    // this.getGenres();

    if (this.state.query === this.state.searchInput) {
      this.setState({ searchInput: this.state.query, loading: true }, () =>
        this.fetchMovies(this.state.query, this.state.pageNumber)
      );
    }
  }

  fetchMovies = debounce(async () => {
    try {
      const { query, pageNumber } = this.state;
      const data = await this.movieService.getSearchMovies(query, pageNumber);
      const totalItems = data.total_results;
      const totalPages = data.total_pages;

      this.setState({
        moviesData: data.results,
        loading: false,
        error: false,
        totalItems,
        totalPages,
      });
    } catch (error) {
      this.onError(error);
    }
  }, 500);

  // getRatedMovie = async (id, value) => {
  //   console.log(id, value);
  //   if (value === 0) {
  //     return null;
  //   }
  //   const { idSession } = this.state;
  //   await fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/rating?&guest_session_id=${idSession}`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json;charset=utf-8" },
  //       body: JSON.stringify({
  //         value: value,
  //       }),
  //     }
  //   ).then((item) =>
  //     this.setState(({ ratedId }) => {
  //       console.log(item);
  //       const rateObj = { ...ratedId, [id]: value };
  //       return { ratedId: rateObj };
  //     })
  //   );
  // };

  handleChangeQuery = (event) => {
    const query = event.target.value;
    if (!this.state.query.trim() && query.startsWith(" ")) {
      return;
    }
    this.setState({ query }, this.fetchMovies);
  };

  handlePageChange = (pageNumber) => {
    this.setState({ pageNumber }, this.fetchMovies);
  };

  handleNetworkChange = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  render() {
    const { moviesData, loading, error, isOnline, query, pageNumber } =
      this.state;

    const totalItems = this.state.totalItems;
    // const itemsPerPage = 20;

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <Provider value={this.state.genres}>
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

                {moviesData.length === 0 && query.trim() !== "" && (
                  <div className="not-found">
                    <p>
                      Мы не смогли найти ни одного фильма по Вашему запросу.
                      Пожалуйста, измените запрос.
                    </p>
                  </div>
                )}

                {moviesData.map((movie) => {
                  return (
                    <Card
                      {...movie} // все данные объекта
                      key={movie.id}
                    />
                  );
                })}
              </ul>

              {moviesData.length !== 0 && (
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
                      // pageSize={itemsPerPage}
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
            ></Tabs.TabPane>
          </Tabs>
        </main>
      </Provider>
    );
  }
}
