import './App.css';
import React, { Component } from 'react';
import Spinner from "./Spin";
import Card from "./Card";
import ErrorIndicator from './ErrorIndicator';

export default class App extends Component {

  state = {
    movies: [],
    searchInput: '',
    loading: true,
    error: false
  };

  onError = (err) => {
    // console.log('ERR HERE', err.status)
    this.setState({
      error: true,
      loading: false
    })
    return err
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=6dce2a79655cf9304a13d5633dead5ab&query='return'")
      .then((response) => {
        return response.json()
      })
      .then(data => {
        this.setState(() => {
          return {
            movies: data.results,
            loading: false,
            error: false
          }
        })
      })
      .catch(this.onError)
  }

  render() {

    const { movies, loading, error } = this.state;

    // error ? <ErrorIndicator /> : null;

    // const hasData = !(loading || error);

    if (loading) {
      return <Spinner />
    }
    if (error) {
      return <ErrorIndicator />
    }

    return (
      <main>
        <header>
          <div className='search-block'>
            <div className="search-panel">
              <input
                id='id'
                className='search-input'
                type='search'
                placeholder='Type to search...'
                autoFocus
                onChange={(event) => {
                  const item = event.target.value;
                  this.setState(() => {
                    return { searchInput: item }
                  })
                }}
              />
            </div>
          </div>
          <ul className="card-box">
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