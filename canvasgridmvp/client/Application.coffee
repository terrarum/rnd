Router = require "./Router"
MainView = require "./views/MainView"
TileCollection = require "./collections/TileCollection"

module.exports = class Application

  initialize: ->
    new MainView()
    new TileCollection()

    # Start Backbone's history tracking.
    Backbone.history.start()