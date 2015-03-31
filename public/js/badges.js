'use strict';

$(function(){
  var socket = io.connect();

  socket.on('badge', function (badge) {
    var $img = $('<div><h3>' + badge.badge_id +'</h3><img src="" alt="Code School badge"></div>');
    $('body').prepend($img);
  });

});
