$ ->
  # Adds output to page
  log = (m) ->
    $('#output').prepend '> ' + m + '<br />'

  log 'Document Ready'

  window.setInterval (->
    $('#loggedin').append('*')
    req =
      'op' : 'loggedin'

    $.post 'server.php',
    req
    , (response) ->
      loggedin = 'No'
      if (response)
        loggedin = 'Yes'

      $('#loggedin').html(loggedin)
    , 'json'
  ), 2000

  # Login
  $('#loginform').submit (e) ->
    e.preventDefault()
    log 'Logging In'

    username = $('#username').val()
    password = $('#password').val()
    remember = $('#remember').is(':checked')

    user =
      'op' : 'login'
      'username': username
      'password': password
      'remember': remember

    console.log user

    $.post 'server.php',
      user
    , (response) ->
      log '-- Login Response --'
      log response
    , 'json'

  # Register
  $('#registerform').submit (e) ->
    e.preventDefault()
    log 'Registering User'

    password = null
    username = $('#username-reg').val()
    password1 = $('#password-reg1').val()
    password2 = $('#password-reg2').val()

    if (password1 == password2)
      password = password1

    user =
      'op' : 'register'
      'username': username
      'password': password

    $.post 'server.php',
    user
    , (response) ->
      log '-- Register Response --'
      log response
    , 'json'

  $('#privateform').submit (e) ->
    e.preventDefault()
    log 'Getting Data'

    user =
      'op' : 'private'

    $.post 'server.php',
    user
    , (response) ->
      log response
    , 'json'


  $('#logoutform').submit (e) ->
    e.preventDefault()
    log 'Getting Data'

    user =
      'op' : 'logout'

    $.post 'server.php',
    user
    , (response) ->
      log response
    , 'json'

