// Department
var departments = [];
var category;
var users = [];


// get all users
$.ajax({
     url: "http://localhost:3000/user/",
     type: "GET",
     dataType: "json",
     success: function (data) {
          users = data;
     },
     error: function (xhr, textStatus, errorThrown) {
          var errorMessage = `${xhr.responseJSON.message}`;
          alert(`Error Message: ${errorMessage}`);
     }
});


// load message 
function LoadMessage(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add Department')

     // add content to iframe create
     createForm.html(`${message}`);
}

// create department 
function createDepartment(name, location, userId) {
     $.ajax({
          url: `http://localhost:3000/department`,
          type: "POST",
          dataType: "json",
          data: {
               name: name,
               location: location,
               user_id: userId,
          },
          success: function (data) {
               departments.push(data);
               const message = `<p>Created department: ${data.name}</p>`;
               LoadMessage(message)
               LoadContent(departments);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// update department 
function updateDepartment(departmentId, name, location, userId) {
     $.ajax({
          url: `http://localhost:3000/department/${departmentId}`,
          type: "PATCH",
          dataType: "json",
          data: {
               name: name,
               location: location,
               user_id: userId,
          },
          success: function (data) {
               departments.forEach((val, ind) => {
                    if (val.id == departmentId) {
                         departments[ind] = data;
                    }
               })

               console.log(departments)
               const message = `<p>Updated department: ${data.name}</p>`;
               LoadMessage(message)
               LoadContent(departments);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// delete department 
function deleteDepartment(departmentContext, departmentId) {
     $.ajax({
          url: `http://localhost:3000/department/${departmentId}`,
          type: "DELETE",
          dataType: "json",
          success: function (data) {
               window.alert(`Deleted: ${data.name}`);
               departmentContext.remove();
               departments.forEach((val, ind) => {
                    if (val.id == departmentId) {
                         departments.splice(ind, 1);
                    }
               });
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load form create departments
function loadFormCreate() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add Department')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name Department</h3>
                         <input type="text" name="departmentName" id="departmentName" placeholder="Enter department name" />
                    </div>
                    <div class="flex-column">
                         <h3>Location</h3>
                         <input type="text" name="location" id="location" placeholder="Enter location" />
                    </div>
                    <div class="flex-column">
                         <h3>Manage By</h3>
                         <select id="user">
                         </select>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)
     users.forEach((user, index) => {
          $(iframe).find('select#user').append(`<option value="user${index + 1}">${user.name}</option>`)
     })

     // add event update department
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#departmentName').val();
          const location = $(iframe).find('#location').val();
          const userName = $(iframe).find('#user').find(':selected').text();

          const user = users.find((user) => { return user.name == userName })
          createDepartment(name, location, user.id);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load form update department
function loadFormUpdate(id, name, location, userName) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Edit Department')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name Department</h3>
                         <input type="text" name="departmentName" id="departmentName" value="${name}" placeholder="Enter department name" />
                    </div>
                    <div class="flex-column">
                         <h3>Location</h3>
                         <input type="text" name="location" id="location" value="${location}" placeholder="Enter location" />
                    </div>
                    <div class="flex-column">
                         <h3>Manage By</h3>
                         <select id="user">
                         </select>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                            Submit
                        </button>
                    </div>
               `)
     users.forEach((user, index) => {
          if (user.name === userName) {
               $(iframe).find('select#user').append(` <option value="user${index + 1}" selected>${user.name}</option>`);
          }
          else {
               $(iframe).find('select#user').append(` <option value="user${index + 1}">${user.name}</option>`)
          }
     })

     // add event update department
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#departmentName').val();
          const location = $(iframe).find('#location').val();
          const userName = $(iframe).find('#user').find(':selected').text();

          const user = users.find((user) => { return user.name == userName })
          updateDepartment(id, name, location, user.id);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load department content 
function LoadContent(data) {
     $(`.pages-table-${category} tbody`).empty();
     data.forEach(department => {
          $(`.pages-table-${category} tbody`).append(`
                                   <tr>
                                        <td>${department.name}</td>
                                        <td><span class="fas fa-check-circle"></span>${department.location}</td>
                                        <td>${department?.user?.name || ''}</td>
                                        <td>${department.devices.length}</td>
                                        <td><a class="btn-white edit-department" id="" href="#">Edit</a> <a class="btn-red del-department" id="" href="#">Delete</a></td>
                                    </tr>
                              `)
     });

     // add event edit 
     $('.edit-department').click(function () {
          let name = $(this).parent().siblings().eq(0).text();
          const department = departments.find((department) => { return department.name == name })

          loadFormUpdate(department.id, department.name, department.location, department?.user?.name || '');

          $('#iframe-container-create').fadeIn();
          $('#iframe-container-detail #close-iframe-btn').click(function () {
               $('#iframe-container-create').fadeOut();
          })
     })

     // add event delete 
     $('.del-department').click(function () {
          const departmentName = $(this).parent().siblings().eq(0).text();
          const department = departments.find((department) => { return department.name == departmentName })
          if (window.confirm(`Delete department ${departmentName} ?`)) {
               deleteDepartment($(this).parent().parent(), department.id);
          }
     })
}


// search department
function search() {
     // search 
     $('#search').keypress(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);

          if (keycode == '13') {
               const keysearch = $('#search').val();
               $.ajax({
                    url: `http://localhost:3000/department/search/?keysearch=${keysearch}`,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                         LoadContent(data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                         var errorMessage = `${xhr.responseJSON.message}`;
                         alert(`Error Message: ${errorMessage}`);
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
                                        <th>Location</th>
                                        <th>Manage By</th>
                                        <th>Device</th>
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
          url: "http://localhost:3000/department/all",
          type: "GET",
          dataType: "json",
          success: function (data) {
               departments = data;

               // load content
               LoadContent(data);

               // add event search
               $('#search').click(function () {
                    search();
               })
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });

     // add event create on button
     $('#create-new-btn').click(function () {
          loadFormCreate();
     });
}


// load info page
$('#department').click(function () {
     category = $(this).text().trim().split(' ')[0];
     $(this).siblings().not($('.category-header')).css('background-color', '#fff');
     $(this).css('background-color', 'lightgrey');
     $('.breadcrumb').text('');
     $('.breadcrumb').text(`Dashboard > ${category}`);

     $('#create-new-btn').text(`Create ${category}`);
     LoadPage();
})

