// user
var user;
var category;


// get cookie 
function getCookieValue(cookieName) {
     const name = cookieName + "=";
     const decodedCookie = decodeURIComponent(document.cookie);
     const cookieArray = decodedCookie.split(';');

     for (let i = 0; i < cookieArray.length; i++) {
          let cookie = cookieArray[i];
          while (cookie.charAt(0) == ' ') {
               cookie = cookie.substring(1);
          }
          if (cookie.indexOf(name) == 0) {
               return cookie.substring(name.length, cookie.length);
          }
     }
     return "";
}

$('#profile').click(function () {
     $.ajax({
          url: `http://localhost:3000/auth/profile`,
          type: "GET",
          headers: {
               'Authorization': `Bearer ${getCookieValue('access_token')}`,
               'Content-Type': 'application/json'
          },
          dataType: "json",
          success: function (data) {
               user = data;
               LoadUserProfile(user);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
})

// load message
function LoadMessage(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add user')

     // add content to iframe create
     createForm.html(`${message}`);
}

// update user
function updateUser(id, name, username, password, address, email, phoneNumber) {
     const data = {
          name: name,
          username: username,
          password: password,
          role: 'USER',
          address: address,
          email: email,
          phone_number: phoneNumber,
     }
     if (!data.password) {
          delete data.password;
     }
     $.ajax({
          url: `http://localhost:3000/user/${id}`,
          type: "PATCH",
          dataType: "json",
          data: data,
          success: function (data) {
               user = data;
               const message = `<p>Updated user: ${data.name}</p>`;
               LoadMessage(message);
               LoadUserProfile(user);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}

// load form update user
function loadFormUpdate(user) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Edit user')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" value="${user.name}" placeholder="Enter user name" />
                    </div>
                    <div class="flex-column">
                         <h3>Username</h3>
                         <input type="text" name="username" id="username" value="${user.username}" placeholder="Enter username"/>
                    </div>
                    <div class="flex-column">
                         <h3>Password</h3>
                         <input type="password" name="password" id="password" value="" placeholder="Enter new password"/>
                    </div>
                    <div class="flex-column">
                         <h3>Address</h3>
                         <input type="text" name="address" id="address" value="${user.address}" placeholder="Enter address"/>
                    </div>
                    <div class="flex-column">
                         <h3>Email</h3>
                         <input type="text" name="email" id="email" value="${user.email}" placeholder="Enter email"/>
                    </div>
                     <div class="flex-column">
                         <h3>Phone Number</h3>
                         <input type="text" name="phoneNumber" id="phoneNumber" value="${user.phone_number}" placeholder="Enter phoneNumber"/>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                            Submit
                        </button>
                    </div>
               `)

     // add event update user
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const username = $(iframe).find('#username').val();
          const password = $(iframe).find('#password').val();
          const address = $(iframe).find('#address').val();
          const email = $(iframe).find('#email').val();
          const phoneNumber = $(iframe).find('#phoneNumber').val();

          updateUser(user.id, name, username, password, address, email, phoneNumber);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}

// load user profile 
function LoadUserProfile() {
     $('.main').empty();
     $('.main').append(`
                    <h1 class="page-header">Profile</h1>
                    <div class="detail">
                         <p><strong>Name :</strong>${user?.name || ''}</p>
                         <p><strong>Username :</strong>${user?.username || ''}</p>
                         <p><strong>Address :</strong>${user?.address || ''}</p>
                         <p><strong>Email :</strong>${user?.email || ''}</p>
                         <p><strong>Phone number :</strong>${user?.phone_number || ''}</p>
                    </div>
                    <div><button id="edit">Edit</button></div>
                    <div id="iframe-container-create" >
                         <iframe id="user-form-iframe" style="display: block;" src="../html/form.html"></iframe>
                         <button id="close-iframe-btn">Đóng</button>
                    </div>
               `);


     // add event load form edit 
     $('#edit').click(function () {
          loadFormUpdate(user);
     })
}




