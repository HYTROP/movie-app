import React from "react";

import format from "date-fns/format";
import "./Movie.css";
import icon from "./inf.jpeg";
import { RateStars } from "../RateStars/RateStars";
import { Genre } from "../Genre/Genre";
import { changeColors } from "../Helper/ChangeColors";
import { AppContext } from "../Context/Context";

Movie.defaultProps = {
  img: "",
  title: "",
  date: "",
  description: "",
  rating: "",
  genreIds: [],
  getRatedMovie: () => {},
  ratedId: {},
  ids: 0,
};
