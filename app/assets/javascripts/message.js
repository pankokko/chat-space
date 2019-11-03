$(function(){

function buildmessage(message){

  var addImage = (message.image.url !== null) ? `<img class="chat-main_message__text " src="${message.image.url}">` : ''

     var html = `<div class="chat-main__message" data-id="${message.id}">
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
          contentType: false,
        })
      .done(function(message){
       var html = buildmessage(message);
        $('.messages').append(html)
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('.new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
        $('.form__submit').prop('disabled', false);
      })
    })

    
    var reloadMessages = function() {
      if (location.href.match(/\/groups\/\d+\/messages/)){
         console.log(location.href)
      last_message_id = $('.chat-main__message').last().data('id');
      group_id = $('.left-box__team').data('userid');
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: `/groups/${group_id}/api/messages`,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id},
      })
      .done(function(messages) {
        console.log('success');
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});  
      })
      .fail(function() {
        console.log('error');
      }); 
    };
  }
    setInterval(reloadMessages, 5000); 

  });






