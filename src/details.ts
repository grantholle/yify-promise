import axios from 'axios'
import Joi from '@hapi/joi'
import { detailsSchema } from './schemas'
import magnetMaker from './build-magnet'
import defaultOptions from './default-options'
import {
  YifyOptions,
  YifyTorrent,
  YifyMovie,
  YifyDetailsOptions
} from './yify'

export default async function (detailsOptions: YifyDetailsOptions, options: YifyOptions): Promise<YifyMovie> {
  const params = await Joi.validate(detailsOptions, detailsSchema)

  const mergedOptions = Object.assign(defaultOptions, options)
  const { data } = await axios.get(mergedOptions.host + mergedOptions.detailsPath, { params })

  if (!data.data || !data.data.movie) {
    throw new Error(`No movie was found. Invalid movie ID.`)
  }

  let movie: YifyMovie = data.data.movie

  if (mergedOptions.createMagnets) {
    movie = magnetMaker(movie)
  }

  return movie
}
