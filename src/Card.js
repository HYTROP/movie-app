import React, { Component } from "react";
import { format } from 'date-fns';
export default class Card extends Component {

  render() {
    // const { error } = this.props;

    // const errorMessage = error ? <ErrorIndicator /> : null;

    // const loading = errorMessage ? <Card /> : null;

    const { id, title,
      poster_path, overview,
      release_date } = this.props;

    function shortenDescription(overview, maxLength = 130) {
      if (overview.length <= maxLength) {
        return overview;
      }
      const words = overview.split(' ');
      let shortened = '';

      for (let i = 0; i < words.length; i++) {
        if ((shortened + words[i]).length <= maxLength) {
          shortened += words[i] + ' ';
        } else {
          break;
        }
      }

      return shortened.trim() + '...';
    }


    return (
      <li key={id}>
        <div className="card">
          <div className="img-film">
            <img className="card-img" alt="" src={"https://image.tmdb.org/t/p/w500" + poster_path} >
            </img>
          </div>
          <div className="card-text">
            <h1 className="title">
              {shortenDescription(title)}
            </h1>
            <div className="data-of-release">
              {release_date ? format(new Date(release_date), 'MMMM d, y') : ""}
            </div>
            <div>
              <button className="genre">
                <span>Action</span>
              </button>

            </div>
            <div>
              <span className="card-description"
              >
                {shortenDescription(overview)}
              </span>
            </div>
          </div>
        </div>
      </li >
    )
  }
}

