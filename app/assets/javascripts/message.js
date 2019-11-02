$(function(){

function buildmessage(message){

  var addImage = (message.image.url !== null) ? `<img class="chat-main_message__text " src="${message.image.url}">` : ''

     var html = `<div class="chat-main__message">
     <div class="chat-main__message__upper-info">
     <div class="chat-main__message__upper-info__talker">
     ${message.user_name}
     </div>
     <div class="chat-main__message__upper-info__date">
     ${message.created_at}
     </div>
     </div>
     <div class="chat-main_message__text">
     <p class="lower-message__content">
      ${message.content}
     </p>
     <div class="lower-message__image">
     ${addImage}
     </div>
     </div>
     </div>`
return html;

}
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);  
    var url = $(this).attr('action');
    $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType:'json',
          processData: false,
          contentType: false
        })
      .done(function(message){
       var html = buildmessage(message);
       $('.messages').append(html)
         $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('.form-submit').prop('disabled', true);
        $('.new_message')[0].reset();
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      })
    })
  });






