Calamity  = require "calamity"


module.exports = class Router extends Backbone.Router
  Calamity.proxy @.prototype

  initialize: (options) ->
