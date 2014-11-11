var $token,
  $xml,
  proxyUrl = 'simplephpproxy.php?url=',
  games = [],
  gamesLoaded = 0,
  gameCounter = 0,
  $gbScope;

function GiantBombController($scope, $http) {
  $gbScope = $scope;
  var api_key = '171e641602dd9e640cff0ad48e884fb702fee8c9',
      baseUrl = 'http://api.giantbomb.com/game/',
      callBack = 'gamesList',
      format = 'jsonp',
      gameIds = ['35850', '36989', '38538', '37494', '32933', '37957', '27312', '26417', '38490', '26513', '35533', '37620', '24301', '31463'],
      config = {};

      gameCounter = gameIds.length;
      for (var i = 0; i < gameIds.length; i++) {
        url = baseUrl + gameIds[i] + '/';
        config.params = {
          api_key: api_key,
          format: format,
          json_callback: callBack,
          field_list: 'name,platforms,expected_release_month,expected_release_quarter,expected_release_year,original_release_date,image,site_detail_url'
        }
        $http.jsonp(url, config);
      } 
}

function gamesList(data, status) {
  var game = data.results;

  // Format release date nicely
  if (game.original_release_date == null) {
    if (game.expected_release_month != null) {
      game.releaseDate = game.expected_release_month + '/' + game.expected_release_year;
    }
    else if (game.expected_release_month == null && game.expected_release_year != null) {
      if (game.expected_release_quarter != null) {
        game.releaseDate = 'Q' + game.expected_release_quarter + ' ' + game.expected_release_year;
      }
      else {
        game.releaseDate = game.expected_release_year;
      }
    }
    else {
      game.releaseDate = 'Unknown';
    }
  }
  else {
    var d = new Date(game.original_release_date),
      month = parseInt(d.getMonth()) + 1;

    game.releaseDate = d.getDate() + '/' + month + '/' + d.getFullYear()
  }

  // Add the game data to the game array and increment the loaded counter.
  games.push(game);
  gamesLoaded++;

  // When all requests are completed.
  if (gamesLoaded == gameCounter) {
    // Sort games alphabetically.
    games.sort(sortAlpha);
    // Sort platforms alphabetically.
    for (var i = 0; i < games.length; i++) {
      // Convert 'PlayStation 3' to 'PS3'
      for (var j = 0; j < games[i].platforms.length; j++) {
        if (games[i].platforms[j].name == 'PlayStation 3') {
          games[i].platforms[j].name = 'PS3';
        }
      }
      var sortedPlatforms = games[i].platforms.sort(sortAlpha);
      games[i].platforms = sortedPlatforms;
    } 
    $gbScope.games = games;
  }
}

// Sorts array of objects alphabetically by Name value
function sortAlpha(a, b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}