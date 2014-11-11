View = require "./View"

module.exports = class CanvasView extends View
  el: '#canvasContainer'

  initialize: ->
    console.log "canvasview"
    @.render()

  render: ->
    template = templates['canvas']
    @.$el.html template()