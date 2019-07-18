export interface YifyDefaultOptions {
  host: string
  listPath: string
  detailsPath: string
  createMagnets: boolean
}

export interface YifyOptions {
  host?: string
  listPath?: string
  detailsPath?: string
  createMagnets?: boolean
}

export interface YifyListOptions {
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

export interface YifyDetailsOptions {
  movie_id: number
  with_images?: boolean
  with_cast?: boolean
}

export interface YifyTorrent {
  url: string
  hash: string
  magnet?: string
  quality: string
  type: string
  seeds: number
  peers: number
  size: string
  size_bytes: number
  date_uploaded: string
  date_uploaded_unix: number
}

export interface YifyMovie {
  id: string
  url: string
  imdb_code: string
  title: string
  title_english: string
  title_long: string
  slug: string
  year: number
  rating: number
  runtime: number
  genres: Array<string>,
  summary: string
  description_full: string
  synopsis: string
  yt_trailer_code: string
  language: string
  mpa_rating: string
  background_image: string
  background_image_original: string
  small_cover_image: string
  medium_cover_image: string
  large_cover_image: string
  state: string
  torrents: Array<YifyTorrent>,
  date_uploaded: string
  date_uploaded_unix: number
}

export interface YifyListResponse {
  movie_count: number
  limit: number
  page_number: number
  movies?: Array<YifyMovie>
}

export interface YifySuggestionsResponse {
  movie_count: number
  movies: Array<YifyMovie>
}
