(function(){
  var socket   = io.connect('/'),
      form     = $("form"),
      display  = $('#messages'),
      messages = [],
      message_input = $('#new-message-body');

  socket.on('message', function (data) {
    if(data.message) {
      var html = '';

      messages.push(data.message);

      messages.forEach(function(message){
        html += "<p>" + message + "</p>";
      });

      display.html(html);
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
