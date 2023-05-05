// login form
$('#submit').click(function () {
     const name = $('.registry-box #name').val();
     const username = $('.registry-box #username').val();
     const password = $('.registry-box #password').val();

     $('.error-message p').text('');

     $.ajax({
          url: "http://localhost:3000/user/",
          type: "POST",
          dataType: "json",
          data: {
               name: name,
               username: username,
               password: password,
               role: "USER",
          },
          success: function (data) {
               // console.log('data: ', data);
               window.location.href = 'http://127.0.0.1:5500/FrontEnd/common/html/login.html';
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
               $('.error-message p').text('Tài khoản đã được sử dụng !');
          }
     });
})