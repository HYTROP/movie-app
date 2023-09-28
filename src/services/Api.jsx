// export class MovieApi {
//   _apiBase = "https://api.themoviedb.org/3/";

//   async getResource(url) {
//     const res = await fetch(`${this._apiBase}${url}`);

//     if (!res.ok) {
//       throw new Error(`Could not fetch ${url}, received ${res.status}`);
//     }
//     const result = await res.json();
//     return result;
//   }

//   async getMovies(movie, page) {
//     const res = await this.getResource(
//       `search/movie/?api_key=${process.env.REACT_APP_API_KEY}&query=${movie}&page=${page}`
//     );
//     return res;
//   }

//   async getPages()
// }
