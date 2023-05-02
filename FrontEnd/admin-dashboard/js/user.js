// user
var users = [];
var category;


// load message 
function LoadMessage(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add user')

     // add content to iframe create
     createForm.html(`${message}`);
}

// create user 
function createUser(name, username, password, address, email, phoneNumber) {

     $.ajax({
          url: `http://localhost:3000/user`,
          type: "POST",
          dataType: "json",
          data: {
               name: name,
               username: username,
               password: password,
               role: 'USER',
               address: address,
               email: email,
               phone_number: phoneNumber,
          },
          success: function (data) {
               users.push(data);
               const message = `<p>Created user: ${data.name}</p>`;
               LoadMessage(message);
               LoadContent(users);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
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
               users.forEach((val, ind) => {
                    if (val["id"] == id)
                         users[ind] = data;
               })

               const message = `<p>Updated user: ${data.name}</p>`;
               LoadMessage(message);
               LoadContent(users);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// delete user 
function deleteuser(userContext, userId) {
     $.ajax({
          url: `http://localhost:3000/user/${userId}`,
          type: "DELETE",
          dataType: "json",
          success: function (data) {
               window.alert(`Deleted: ${data.name}`);
               userContext.remove();
               users.forEach((val, ind) => {
                    if (val.id == userId) {
                         users.splice(ind, 1);
                    }
               })
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load form create users
function loadFormCreate() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add user')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" placeholder="Enter user name" />
                    </div>
                    <div class="flex-column">
                         <h3>Username</h3>
                         <input type="text" name="username" id="username" placeholder="Enter username" />
                    </div>
                    <div class="flex-column">
                         <h3>Password</h3>
                         <input type="text" name="password" id="password" placeholder="Enter password" />
                    </div>
                    <div class="flex-column">
                         <h3>Address</h3>
                         <input type="text" name="address" id="address" placeholder="Enter address" />
                    </div>
                    <div class="flex-column">
                         <h3>Email</h3>
                         <input type="text" name="email" id="email" placeholder="Enter email" />
                    </div>
                    <div class="flex-column">
                         <h3>Phone Number</h3>
                         <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phoneNumber" />
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

          createUser(name, username, password, address, email, phoneNumber);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load form update user
function loadFormUpdate(id, name, username, address, email, phoneNumber) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Edit user')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" value="${name}" placeholder="Enter user name" />
                    </div>
                    <div class="flex-column">
                         <h3>Username</h3>
                         <input type="text" name="username" id="username" value="${username}" placeholder="Enter username"/>
                    </div>
                    <div class="flex-column">
                         <h3>Password</h3>
                         <input type="password" name="password" id="password" value="" placeholder="Enter new password"/>
                    </div>
                    <div class="flex-column">
                         <h3>Address</h3>
                         <input type="text" name="address" id="address" value="${address}" placeholder="Enter address"/>
                    </div>
                    <div class="flex-column">
                         <h3>Email</h3>
                         <input type="text" name="email" id="email" value="${email}" placeholder="Enter email"/>
                    </div>
                     <div class="flex-column">
                         <h3>Phone Number</h3>
                         <input type="text" name="phoneNumber" id="phoneNumber" value="${phoneNumber}" placeholder="Enter phoneNumber"/>
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

          const user = users.find((user) => { return user.username == username })
          updateUser(user.id, name, username, password, address, email, phoneNumber);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load user content 
function LoadContent(data) {
     $(`.pages-table-${category} tbody`).empty();
     data.forEach(user => {
          $(`.pages-table-${category} tbody`).append(`
                                   <tr>
                                        <td>${user.name}</td>
                                        <td>${user.username}</td>
                                        <td>${user.address}</td>
                                        <td>${user.created_at}</td>
                                        <td><a class="btn-white edit-user" id="" href="#">Edit</a> <a class="btn-red del-user" id="" href="#">Delete</a></td>
                                    </tr>
                              `)
     });

     // add event edit 
     $('.edit-user').click(function () {
          let userName = $(this).parent().siblings().eq(1).text();
          const user = users.find((user) => { return user.username == userName })

          loadFormUpdate(user.id, user.name, user.username, user.address, user.email, user.phone_number);

          $('#iframe-container-create').fadeIn();
          $('#iframe-container-detail #close-iframe-btn').click(function () {
               $('#iframe-container-create').fadeOut();
          })
     })

     // add event delete 
     $('.del-user').click(function () {
          const userName = $(this).parent().siblings().eq(1).text();
          const user = users.find((user) => { return user.username == userName })
          if (window.confirm(`Delete user ${user.name} ?`)) {
               deleteuser($(this).parent().parent(), user.id);
          }
     })
}


// search user
function search() {
     // search 
     $('#search').keypress(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);

          if (keycode == '13') {
               const keysearch = $('#search').val();
               $.ajax({
                    url: `http://localhost:3000/user/search/?keysearch=${keysearch}`,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                         LoadContent(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                         console.log(textStatus + ": " + errorThrown);
                    }
               });
          }
     })
}


function LoadPage() {
     $('.col-9').empty();
     $('.col-9')
          .html(`<div class="latest">
                            <div style="color:white;" class="latest-top red">${category}s</div>
                            <div class="filter">
                                <form action="">
                                    <input type="search" id="search" placeholder="Filter ${category}...">
                                </form>
                            </div>
                            <div class="latest-bottom">
                                <table class="pages-table-${category}">
                                      <thead>
                                       <tr>
                                        <th>Name</th>
                                        <th>User Name</th>
                                        <th>Address</th>
                                        <th>Join Date</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="iframe-container-create" >
                            <iframe id="user-form-iframe" style="display: block;" src="./createForm.html"></iframe>
                            <button id="close-iframe-btn">Đóng</button>
                        </div>`
          );
     $.ajax({
          url: "http://localhost:3000/user",
          type: "GET",
          dataType: "json",
          success: function (data) {
               users = data;

               // load content
               LoadContent(data);

               // add event search
               $('#search').click(function () {
                    search();
               })
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });

     // add event create on button
     $('#create-new-btn').click(function () {
          loadFormCreate();
     });
}


// load info page
$('#user').click(function () {
     category = $(this).text().trim().split(' ')[0];
     $(this).siblings().not($('.category-header')).css('background-color', '#fff');
     $(this).css('background-color', 'lightgrey');
     $('.breadcrumb').text('');
     $('.breadcrumb').text(`Dashboard > ${category}`);

     $('#create-new-btn').text(`Create ${category}`);
     LoadPage();
})

