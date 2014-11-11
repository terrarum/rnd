Collection = require "./Collection"
Tile = require "../models/TileModel"

module.exports = class TileCollection extends Collection
  model: Tile

  initialize: ->
    @.buildGrid()

  buildGrid: ->
    rows = 15
    cols = 20
    tileSize = 32

    col = 0
    while col < cols
      console.log col
      row = 0
      while row < rows
        console.log row
        y = row * tileSize
        x = col * tileSize

        @.add new Tile
          x: x
          y: y
          size: tileSize
          id: col + "/" + row

        row++
      col++

    console.log @