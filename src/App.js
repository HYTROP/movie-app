import './App.css';
import { Component } from 'react';

import Card from "./Card";
export default class App extends Component {

  state = {
    movies: []
  };

  async componentDidMount() {
    try {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6dce2a79655cf9304a13d5633dead5ab&query='return'`
      )
        .then(response => {
          console.log('GET', response.status)
        })
        .then((apiMovies) => this.setState(() => {
          return { movies: apiMovies }
        }))
    } catch (err) {
      console.log(err, 'Message Error')
    }

  }
  //   const { movies } = this.state;
  render() {
    return (
      <main>
        <header>
          <div>
            <span className="search-panel">SPACE FOR SEARCH</span>
          </div>
          <ul className="card-box">
            {this.state.movies.map((movie) => {
              return (
                <li key={movie.id}>
                  <Card
                    movies={this.movies}
                  />
                </li>
              )
            })}
          </ul>
        </header>
      </main >
    )
  }

}