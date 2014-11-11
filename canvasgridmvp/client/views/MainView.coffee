View = require './View'
CanvasView = require './CanvasView'

module.exports = class MainView extends View
  initialize: ->
    console.log "mainview"
    new CanvasView()