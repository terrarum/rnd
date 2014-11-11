// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var log;
    log = function(m) {
      return $('#output').prepend('> ' + m + '<br />');
    };
    log('Document Ready');
    window.setInterval((function() {
      var req;
      $('#loggedin').append('*');
      req = {
        'op': 'loggedin'
      };
      return $.post('server.php', req, function(response) {
        var loggedin;
        loggedin = 'No';
        if (response) {
          loggedin = 'Yes';
        }
        return $('#loggedin').html(loggedin);
      }, 'json');
    }), 2000);
    $('#loginform').submit(function(e) {
      var password, remember, user, username;
      e.preventDefault();
      log('Logging In');
      username = $('#username').val();
      password = $('#password').val();
      remember = $('#remember').is(':checked');
      user = {
        'op': 'login',
        'username': username,
        'password': password,
        'remember': remember
      };
      console.log(user);
      return $.post('server.php', user, function(response) {
        log('-- Login Response --');
        return log(response);
      }, 'json');
    });
    $('#registerform').submit(function(e) {
      var password, password1, password2, user, username;
      e.preventDefault();
      log('Registering User');
      password = null;
      username = $('#username-reg').val();
      password1 = $('#password-reg1').val();
      password2 = $('#password-reg2').val();
      if (password1 === password2) {
        password = password1;
      }
      user = {
        'op': 'register',
        'username': username,
        'password': password
      };
      return $.post('server.php', user, function(response) {
        log('-- Register Response --');
        return log(response);
      }, 'json');
    });
    $('#privateform').submit(function(e) {
      var user;
      e.preventDefault();
      log('Getting Data');
      user = {
        'op': 'private'
      };
      return $.post('server.php', user, function(response) {
        return log(response);
      }, 'json');
    });
    return $('#logoutform').submit(function(e) {
      var user;
      e.preventDefault();
      log('Getting Data');
      user = {
        'op': 'logout'
      };
      return $.post('server.php', user, function(response) {
        return log(response);
      }, 'json');
    });
  });

}).call(this);
