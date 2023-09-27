import './App.css';
import React, { Component } from 'react';
import Spinner from "./Spin";
import Card from "./Card";
import ErrorIndicator from './ErrorIndicator';
import { debounce } from 'lodash';

export default class App extends Component {

  state = {
    movies: [],
    searchInput: '',
    loading: true,
    error: false,
    isOnline: navigator.onLine,
    query: ''
  };

  onError = (err) => {
    window.dispatchEvent(new Event('offline'))
    this.setState({
      error: true,
      loading: false,
      offline: false
    })
    return err
  }

  componentDidMount() {
    window.addEventListener("online", this.handleNetworkChange);
    window.addEventListener("offline", this.handleNetworkChange);

    this.fetchMovies();

    if (this.state.query === this.state.searchInput) {
      this.setState({ searchInput: this.state.query }, this.fetchMovies)
    }
    // if (this.state.movies.length === 0) {
    //   this.setState({ searchInput: 'return' })
    // }

  }

  fetchMovies = debounce(() => {
    const { query } = this.state;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=6dce2a79655cf9304a13d5633dead5ab&query='${query}'`)
      .then((response) => {
        return response.json()
      })
      .then(data => {
        this.setState(() => {
          return {
            movies: data.results,
            loading: false,
            error: false,
          }
        })
      })
      .catch(this.onError)
  }, 500);

  handleChangeQuery = (event) => {
    const query = event.target.value.trim();
    this.setState({ query }, this.fetchMovies);
  }

  handleNetworkChange = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  render() {

    const { movies, loading, error, isOnline, query } = this.state;

    if (loading) {
      return <Spinner />
    }
    if (error) {
      return <ErrorIndicator />
    }

    return (

      <main>
        <div className='offline-message'>
          {!isOnline && (
            <div className='isOffline'>
              <p>Отсутствует подключение к интернету. Проверьте сетевое соединение и попробуйте еще раз.</p>
            </div>
          )}
        </div>
        <header>
          <div className='search-block'>
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
                <p>Ни одного фильма не найдено по вашему запросу.</p>
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
          </ul>
        </header>
      </main >
    )
  }

}