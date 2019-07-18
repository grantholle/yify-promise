import { YifyMovie, YifyTorrent } from './yify'
import trackerArray from './trackers'
const trackers = trackerArray.join('&tr=')

const magnetMaker = (hash: string, title: string) => {
  return `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(title)}&tr=${trackers}`
}

export default (movie: YifyMovie) => {
  movie.torrents = movie.torrents.map((torrent: YifyTorrent) => {
    torrent.magnet = magnetMaker(torrent.hash, movie.title_long)

    return torrent
  })

  return movie
}
