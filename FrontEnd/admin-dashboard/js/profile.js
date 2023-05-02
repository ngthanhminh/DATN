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
               LoadContent(user);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
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


// load user content 
function LoadContent(user) {
     $('#name').text(`${user.name}`);
     $('#username').text(`${user.username}`);
     $('#address').text(`${user.address}`);
     $('#email').text(`${user.email}`);
     $('#phoneNumber').text(`${user.phone_number}`);


     // add event edit 
     $('.edit-user').click(function () {
          loadFormUpdate(user);

          $('#iframe-container-create').fadeIn();
          $('#iframe-container-detail #close-iframe-btn').click(function () {
               $('#iframe-container-create').fadeOut();
          })
     })
}

function LoadPage() {
     $('.col-9').empty();
     $('.col-9')
          .html(`
                    <section class="dashboard">
                         <div class="profile">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="profile-image"
                              viewBox="0 0 16 16">
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                              <path fill-rule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                         </svg>
                         <div class="details">

                              <div class="center">
                              <div class="eid">
                                   <p class="name" id="name">Nguyen Thanh Minh</p>
                              </div>
                              </div>

                              <div class="flex-row">
                              <div class="flex-column end">
                                   <div class="flex-column right">
                                   <div>
                                        <p class="field">Username</p>
                                        <p class="value" id="username">nguyenminh</p>
                                   </div>

                                   <div>
                                        <p class="field">Address</p>
                                        <p class="value" id="address">Thanh Xuan, Ha Noi</p>
                                   </div>
                                   </div>
                              </div>
                              <div class="flex-column end">
                                   <div class="flex-column right">
                                   <div>
                                        <p class="field">Email</p>
                                        <p class="value" id="email">ntminh@gmail.com</p>
                                   </div>

                                   <div>
                                        <p class="field">PhoneNumber</p>
                                        <p class="value" id="phoneNumber">0989571305</p>
                                   </div>
                                   </div>
                              </div>
                              </div>

                              <div class="center">
                              <div class="attendance">
                                   <a class="btn-white edit-user" id="submit" href="#">Edit</a>
                              </div>
                              </div>
                         </div>
                         </div>
                         </section>
                        <div id="iframe-container-create" >
                            <iframe id="user-form-iframe" style="display: block;" src="./createForm.html"></iframe>
                            <button id="close-iframe-btn">Đóng</button>
                        </div>`
          );
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
               LoadContent(data);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load info page
$('#profile').click(function () {
     category = $(this).text().trim().split(' ')[0];
     $(this).siblings().not($('.category-header')).css('background-color', '#fff');
     $(this).css('background-color', 'lightgrey');
     $('.breadcrumb').text('');
     $('.breadcrumb').text(`Dashboard > ${category}`);

     LoadPage();
})

