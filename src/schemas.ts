import Joi from '@hapi/joi'

export const listSchema = {
  limit: Joi.number().integer().min(1).max(50),
  page: Joi.number().integer().min(1),
  quality: Joi.string().valid([`720p`, `1080p`, `3D`, `All`]),
  minimum_rating: Joi.number().integer().min(0).max(9),
  query_term: Joi.string(),
  genre: Joi.string().valid([
    `action`,
    `adventure`,
    `animation`,
    `biography`,
    `comedy`,
    `crime`,
    `documentary`,
    `drama`,
    `family`,
    `fantasy`,
    `film noir`,
    `history`,
    `horror`,
    `music`,
    `musical`,
    `mystery`,
    `romance`,
    `sci-fi`,
    `short film`,
    `sport`,
    `superhero`,
    `thriller`,
    `war`,
    `western`,
  ]),
  sort_by: Joi.string().valid([
    `title`,
    `year`,
    `rating`,
    `peers`,
    `seeds`,
    `download_count`,
    `like_count`,
    `date_added`
  ]),
  order_by: Joi.string().valid([`asc`, `desc`]),
  with_rt_ratings: Joi.boolean()
}

export const detailsSchema = {
  movie_id: Joi.number().integer().required(),
  with_images: Joi.boolean(),
  with_cast: Joi.boolean()
}

export const suggestionsSchema = {
  movie_id: Joi.number().integer().required()
}
