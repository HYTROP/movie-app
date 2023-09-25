import React, { Component } from "react";
import { formatDistanceToNow } from 'date-fns';
export default class Card extends Component {


  render() {

    const { id, title, posterPath, overview, releaseDate } = this.props;
    // console.log(releaseDate)

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
            <img className="card-img" alt="">
              {/* {posterPath} */}
            </img>
          </div>
          <div className="card-text">
            <h1 className="title">
              {shortenDescription(title)}
              {/* {title} */}
            </h1>
            <div className="data-of-release">
              {/* {formatDistanceToNow(Date())} */}
              <span>March 05</span>
            </div>
            <div>
              <button className="genre">
                <span >Action</span>
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
      </li>
    )
  }

}

