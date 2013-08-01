(function(){
  var socket  = io.connect('http://localhost:8080'),
      form    = $("form"),
      display = $('#messages'),
      message_input = $('#new-message-body');

  socket.on('message', function (data) {
    if(data.message) {
      var html = "<p>" + data.message + "</p>";
      display.append(html);
    } else {
      console.log("There is a problem:", data);
    }
  });

  form.on('submit', function(e){
    e.stopPropagation();
    e.preventDefault();

    var text = message_input.val();
    message_input.val('');

    socket.emit('send', { message: text });
  });
})(jQuery);
