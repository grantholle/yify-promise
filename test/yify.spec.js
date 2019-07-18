const chai = require('chai')
const expect = chai.expect

const yify = require('../dist/index')

describe('yify', function () {
  this.timeout(10000)

  describe('search', () => {
    it('should return movies without magnets by default', async () => {
      const res = await yify.search({ query_term: 'big hero 6' })
      const movie = res.movies[0]
      const torrent = movie.torrents[0]

      expect(res.movies.length).to.be.greaterThan(0)
      expect(movie.torrents.length).to.be.greaterThan(0)
      expect(torrent.magnet).to.be.undefined
    })

    it('should return movies with magnets', async () => {
      const res = await yify.search({ query_term: 'big hero 6' }, { createMagnets: true })
      const movie = res.movies[0]
      const torrent = movie.torrents[0]

      expect(torrent.magnet).to.be.a('string')
    })

    it('should return 0 movies', async () => {
      const res = await yify.search({
        query_term: 'small hero 6'
      })

      expect(res.movie_count).to.equal(0)
      expect(res.movies.length).to.equal(0)
    })
  })

  describe('details', () => {
    it('should return 1 movie', async () => {
      const res = await yify.details({ movie_id: '3024' })
      expect(res.title).to.equal('The Amazing Spider-Man')
      expect(res.torrents.length).to.be.greaterThan(0)
    })

    it('should return 0 movies', async () => {
      try {
        const res = await yify.details({ movie_id: '-404' })
      } catch (err) {
        expect(err.message).to.equal(`No movie was found. Invalid movie ID.`)
      }
    })
  })

  describe('suggestions', () => {
    it('should return 4 movie suggestions', async () => {
      const { movies } = await yify.suggestions(3024)
      expect(movies.length).to.equal(4)
    })

    it('throw an error for no id', async () => {
      try {
        const res = await yify.suggestions()
      } catch (err) {
        expect(err.message).to.equal(`Missing movie ID!`)
      }
    })
  })
})
