Application = require "./Application"

# When the DOM is ready, start applicationing.
$ ->
  ct = new Application()
  ct.initialize()