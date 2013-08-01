(function(){
  var socket   = io.connect('/'),
      form     = $("form"),
      display  = $('#messages'),
      messages = [],
      message_input = $('#new-message-body'),
      name = prompt('What is your name?');

  socket.on('message', function (data) {
    if(data.content) {
      display.append(data.content);
      display.scrollTop(display[0].scrollHeight);
    } else {
      console.log("There is a problem:", data);
    }
  });

  form.on('submit', function(e){
    e.stopPropagation();
    e.preventDefault();

    var text = message_input.val();
    message_input.val('');

    socket.emit('send', { name: name, message: text });
  });
})(jQuery);
