import React from "react";

export default function Card({ movies }) {


  return (
    <div className="card">
      <div className="img-film">
        <img className="card-img" alt=""></img>
      </div>
      <div className="card-text">
        <h1>The way back</h1>
        <div>
          <span className="data-of-release">March 05</span>
        </div>
        <div>
          <span className="genre"></span>
        </div>
        <div>
          <span className="card-description"

          >
          </span>
        </div>
      </div>
    </div>


  )
}

