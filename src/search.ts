import axios from 'axios'
import Joi from '@hapi/joi'
import magnetMaker from './build-magnet'
import defaultOptions from './default-options'
import { listSchema } from './schemas'
import {
  YifyOptions,
  YifyListResponse,
  YifyListOptions
} from './yify'

export default async function (listOptions: YifyListOptions, options: YifyOptions): Promise<YifyListResponse> {
  const params = await Joi.validate(listOptions, listSchema)

  const mergedOptions = Object.assign(defaultOptions, options)
  const { data } = await axios.get(mergedOptions.host + mergedOptions.listPath, { params })

  const results = data.data
  results.movies = results.movies || []

  if (mergedOptions.createMagnets && results.movies) {
    results.movies = results.movies.map(magnetMaker)
  }

  return results
}
