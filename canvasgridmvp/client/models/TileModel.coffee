Model = require "./Model"

# Model for a single client.
# GiantBomb's ID is intentionally not used as the model ID to facilitate Backbone's own syncing functions.
module.exports = class Tile extends Model
  defaults:
    x: null
    y: null
    size: null      # Used for width and height.
    hit: false    # Tiles selection status.
    drawn: false  # Render status. Set to false to trigger redraw.

  initialize: ->
