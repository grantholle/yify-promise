# yify-promise

This is a wrapper around the Yify api.

## Installation

```
npm i -S yify-promise
```

## Usage

There are three functions in this package: `search`, `details` and `suggestions`. They all accept an object of options as one of their arguments. Below are the default values for the properties:

```js
{
  host: `https://yts.lt`,
  listPath: `/api/v2/list_movies.json`,
  detailsPath: `/api/v2/movie_details.json`,
  suggestionsPath: `/api/v2/movie_suggestions.json`,
  upcomingPath: `/api/v2/list_upcoming.json`,
  createMagnets: false
}
```

This allows you to set the host and endpoints for the api. The `createMagnets` flag will generate the magnet url for the torrent files. This is just a convenience as the `url` property on the torrent is perfectly sufficient.

### Search

There are multiple options for seaching. See the [documentation](https://yts.lt/api#list_movies) on each option that's available.

```ts
interface YifyListOptions {
  limit?: number
  page?: number
  quality?: string
  minimum_rating?: number
  query_term?: string
  genre?: string
  sort_by?: string
  order_by?: string
  with_rt_ratings?: boolean
}
```

```js
const yify = require('yify-search')

const options = {
  query_term: `star wars episode ii`
}

yify.search(options).then(results => {
  console.log(results)
  // {
  //   movie_count: 1,
  //   limit: 20,
  //   page_number: 1,
  //   movies: [
  //     {
  //       id: 2860,
  //       url: 'https://yts.lt/movie/star-wars-episode-ii-attack-of-the-clones-2002',
  //       imdb_code: 'tt0121765',
  //       title: 'Star Wars: Episode II - Attack of the Clones',
  //       title_english: 'Star Wars: Episode II - Attack of the Clones',
  //       title_long: 'Star Wars: Episode II - Attack of the Clones (2002)',
  //       slug: 'star-wars-episode-ii-attack-of-the-clones-2002',
  //       year: 2002,
  //       rating: 6.6,
  //       runtime: 142,
  //       genres: [Array],
  //       summary: '...',
  //       description_full: '...',
  //       synopsis: '...',
  //       yt_trailer_code: 'gYbW1F_c9eM',
  //       language: 'English',
  //       mpa_rating: 'PG',
  //       background_image: 'https://yts.lt/assets/images/movies/Star_Wars_Episode_II_Attack_of_the_Clones_2002/background.jpg',
  //       background_image_original: 'https://yts.lt/assets/images/movies/Star_Wars_Episode_II_Attack_of_the_Clones_2002/background.jpg',
  //       small_cover_image: 'https://yts.lt/assets/images/movies/Star_Wars_Episode_II_Attack_of_the_Clones_2002/small-cover.jpg',
  //       medium_cover_image: 'https://yts.lt/assets/images/movies/Star_Wars_Episode_II_Attack_of_the_Clones_2002/medium-cover.jpg',
  //       large_cover_image: 'https://yts.lt/assets/images/movies/Star_Wars_Episode_II_Attack_of_the_Clones_2002/large-cover.jpg',
  //       state: 'ok',
  //       torrents: [
  //         {
  //           url: ...
  //           hash: ...
  //           magnet: ...
  //           quality: ...
  //           type: ...
  //           seeds: ...
  //           peers: ...
  //           size: ...
  //           size_bytes: ...
  //           date_uploaded: ...
  //           date_uploaded_unix: ...
  //         },
  //         {
  //           ...
  //         }
  //       ],
  //       date_uploaded: '2017-10-27 11:14:07',
  //       date_uploaded_unix: 1509095647
  //     }
  //   ]
  // }
})
```

To attach the magnet urls to the `torrent.magnet` property, pass the option in the second argument.

```js
const options = {
  query_term: `star wars episode ii`
}

yify.search(options, { createMagnets: true }).then(results => {
  // ...
})
```

### Details

Fetches the [details](https://yts.lt/api#movie_details) for a single movie based on the movie id.

```js
const options = {
  movie_id: 2860,
  // with_images: boolean,
  // with_cast: boolean
}

yify.details(options).then(movie => {
  // ...
})
```

### Suggestions

Fetches four [suggestions](https://yts.lt/api#movie_suggestions) based on a movie id.

```js
yify.suggestions(2860).then(results => {
  // ...
})
```
