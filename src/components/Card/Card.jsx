import React, { Component } from "react";

// import Genre from "../Genres/Genres";
import { format } from "date-fns";
import { Rate } from "antd";
import "./Card.css";
import { MovieService } from "../../services/MovieService";

export default class Card extends Component {
  state = {
    voteValue: 0,
  };

  movieService = new MovieService();

  render() {
    const {
      id,
      title,
      poster_path,
      overview,
      release_date,
      genreIds,
      rating,
      voteAverage,
    } = this.props;

    const { voteValue } = this.state;

    const voteAverageRound = Math.round(voteAverage * 10) / 10;

    let borderColor = "";
    if (voteAverage >= 0 && voteAverage < 3) {
      borderColor = "#E90000";
    } else if (voteAverage >= 3 && voteAverage < 5) {
      borderColor = "#E97E00";
    } else if (voteAverage >= 5 && voteAverage < 7) {
      borderColor = "#E9D100";
    } else {
      borderColor = "#66E900";
    }

    const borderStyle = {
      border: `2px solid ${borderColor}`,
    };

    if (!release_date) {
      return null;
    }

    function shortenDescription(overview, maxLength = 100) {
      if (overview.length <= maxLength) {
        return overview;
      }
      const words = overview.split(" ");
      let shortened = "";

      for (let i = 0; i < words.length; i++) {
        if ((shortened + words[i]).length <= maxLength) {
          shortened += words[i] + " ";
        } else {
          break;
        }
      }

      return shortened.trim() + "...";
    }

    return (
      <li key={id}>
        <div className="card">
          <div className="img-film">
            <img
              // className="card-img"
              alt=""
              src={"https://image.tmdb.org/t/p/w500" + poster_path}
            ></img>
          </div>

          <div className="card-text">
            <h1 className="title">{shortenDescription(title)}</h1>
            <div className="vote" style={borderStyle}>
              <span>{voteAverageRound}</span>
            </div>
            <div className="data-of-release">
              {release_date ? format(new Date(release_date), "MMMM d, y") : ""}
            </div>
            <button></button>
            {/* <Genre className="film-tag" genreIds={genreIds} /> */}

            <div className="card-description">
              <span>{shortenDescription(overview)}</span>
            </div>
            <Rate
              className="rated-stars"
              count={10}
              defaultValue={voteValue}
              value={rating || voteValue}
              onChange={rating ? null : this.handleRatingChange}
            />
          </div>
        </div>
      </li>
    );
  }
}
