import './App.css';
import { Component } from 'react';

import Card from "./Card";
export default class App extends Component {

  state = {
    movies: [],
    backdropPath: ''
  };

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=6dce2a79655cf9304a13d5633dead5ab&query='return'")
      .then((response) => {
        return response.json()
      })
      .then(data => {
        this.setState(() => {
          return {
            movies: data.results
          }
        })
      })
  }



  render() {

    const { movies } = this.state;

    return (
      <main>
        <header>
          <div>
            <span className="search-panel">
              SPACE FOR SEARCH BLOCK
            </span>
          </div>
          <ul className="card-box">
            {movies.map((movie) => {
              console.log(movie)
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