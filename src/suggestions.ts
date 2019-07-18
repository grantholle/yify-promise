import axios from 'axios'
import magnetMaker from './build-magnet'
import defaultOptions from './default-options'
import {
  YifyOptions,
  YifyTorrent,
  YifyMovie,
  YifySuggestionsResponse
} from './yify'

export default async function (id: number, options: YifyOptions): Promise<YifySuggestionsResponse> {
  if (!id) {
    throw new Error(`Missing movie ID!`)
  }

  const mergedOptions = Object.assign(defaultOptions, options)
  const url = mergedOptions.host + mergedOptions.suggestionsPath
  const { data } = await axios.get(url, {
    params: {
      movie_id: id
    }
  })

  const results: YifySuggestionsResponse = data.data

  if (mergedOptions.createMagnets) {
    results.movies = results.movies.map(magnetMaker)
  }

  return results
}
