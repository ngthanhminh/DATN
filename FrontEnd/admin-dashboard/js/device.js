// device
var devices = [];
var category;
var departments = [];
var subnets = [];
var subnetsInDepartment = []


// get all departments
$.ajax({
     url: "http://localhost:3000/department/",
     type: "GET",
     dataType: "json",
     success: function (data) {
          departments = data;
     },
     error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus + ": " + errorThrown);
     }
});


// get all subnet
$.ajax({
     url: "http://localhost:3000/subnet/",
     type: "GET",
     dataType: "json",
     success: function (data) {
          subnets = data;
     },
     error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus + ": " + errorThrown);
     }
});


// load subnet in department 
async function LoadSubnetInDepartment(departmentId) {
     return await $.ajax({
          url: `http://localhost:3000/subnet/department/${departmentId}`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               subnetsInDepartment = data;
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}


// load message 
function LoadMessage(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add device')

     // add content to iframe create
     createForm.html(`${message}`);
}

// create device 
function createdevice(name, ipAddress, macAddress, decription, deviceType, departmentId, subnetId) {
     $.ajax({
          url: `http://localhost:3000/device`,
          type: "POST",
          dataType: "json",
          data: {
               name: name,
               ip_address: ipAddress,
               mac_address: macAddress,
               device_type: deviceType,
               decription: decription,
               department_id: departmentId,
               subnet_id: subnetId,
          },
          success: function (data) {
               devices.push(data);
               const message = `<p>Created device: ${data.name}</p>`;
               LoadMessage(message)
               LoadContent(devices);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// update device 
function updatedevice(deviceId, name, ipAddress, macAddress, decription, deviceType, departmentId, subnetId) {
     $.ajax({
          url: `http://localhost:3000/device/${deviceId}`,
          type: "PATCH",
          dataType: "json",
          data: {
               name: name,
               ip_address: ipAddress,
               mac_address: macAddress,
               device_type: deviceType,
               decription: decription,
               department_id: departmentId,
               subnet_id: subnetId,
          },
          success: function (data) {
               devices.forEach((val, ind) => {
                    if (val.id == deviceId) {
                         devices[ind] = data;
                    }
               })

               const message = `<p>Updated device: ${data.name}</p>`;
               LoadMessage(message)
               LoadContent(devices);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// delete device 
function deletedevice(deviceContext, deviceId) {
     $.ajax({
          url: `http://localhost:3000/device/${deviceId}`,
          type: "DELETE",
          dataType: "json",
          success: function (data) {
               window.alert(`Deleted: ${data.name}`);
               deviceContext.remove();
               devices.forEach((val, ind) => {
                    if (val.id == deviceId) {
                         devices.splice(ind, 1);
                    }
               });
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load form create devices
function loadFormCreate() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add Device')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name device</h3>
                         <input type="text" name="name" id="name" placeholder="Enter device name" />
                    </div>
                    <div class="flex-column">
                         <h3>IP Address</h3>
                         <input type="text" name="ipAddress" id="ipAddress" placeholder="Enter ip address" />
                    </div>
                    <div class="flex-column">
                         <h3>MAC Address</h3>
                         <input type="text" name="macAddress" id="macAddress" placeholder="Enter mac address" />
                    </div>
                    <div class="flex-column">
                         <h3>Decription</h3>
                         <input type="text" name="decription" id="decription" placeholder="Enter decription" />
                    </div>
                    <div class="flex-column">
                         <h3>Device Type</h3>
                         <select id="deviceType">
                              <option value="LAPTOP">LAPTOP</option>
                              <option value="COMPUTER">COMPUTER</option>
                              <option value="ROUTER">ROUTER</option>
                              <option value="SWITCH">SWITCH</option>
                              <option value="ORTHER">ORTHER</option>
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Department</h3>
                         <select id="department">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Subnet</h3>
                         <select id="subnet">
                         </select>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)

     departments.forEach((department, index) => {
          $(iframe).find('select#department').append(`<option value="${department.id}">${department.name}</option>`);
     })
     $(iframe).find('select#department').prop("selectedIndex", -1);

     $(iframe).find('select#department').change(async function () {
          const departmentId = $(this).find(':selected').val();
          await LoadSubnetInDepartment(departmentId);

          $(iframe).find('select#subnet').empty()
          subnetsInDepartment.forEach((subnet, index) => {
               $(iframe).find('select#subnet').append(`<option value="${subnet.id}">${subnet.subnet_address}</option>`)
          })
     })

     // add event update device
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const ipAddress = $(iframe).find('#ipAddress').val();
          const macAddress = $(iframe).find('#macAddress').val();
          const decription = $(iframe).find('#decription').val();
          const deviceType = $(iframe).find('#deviceType').find(':selected').text();
          const departmentId = $(iframe).find('#department').find(':selected').val();
          const subnetId = $(iframe).find('#subnet').find(':selected').val();

          const device = devices.find((device) => { return device.ip_address == ipAddress })
          createdevice(name, ipAddress, macAddress, decription, deviceType, departmentId, subnetId);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load form update device
async function loadFormUpdate(id, name, ipAddress, macAddress, deviceType, decription, departmentName, subnetName) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Edit Device')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name device</h3>
                         <input type="text" name="name" id="name" value="${name}" placeholder="Enter device name" />
                    </div>
                    <div class="flex-column">
                         <h3>IP Address</h3>
                         <input type="text" name="ipAddress" id="ipAddress" value="${ipAddress}" placeholder="Enter ip address" />
                    </div>
                    <div class="flex-column">
                         <h3>MAC Address</h3>
                         <input type="text" name="macAddress" id="macAddress" value="${macAddress}" placeholder="Enter mac address" />
                    </div>
                    <div class="flex-column">
                         <h3>Device Type</h3>
                         <select id="deviceType">
                              <option value="LAPTOP">LAPTOP</option>
                              <option value="COMPUTER">COMPUTER</option>
                              <option value="ROUTER">ROUTER</option>
                              <option value="SWITCH">SWITCH</option>
                              <option value="ORTHER">ORTHER</option>
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Decription</h3>
                         <input type="text" name="decription" id="decription" value="${decription}" placeholder="Enter decription" />
                    </div>
                    <div class="flex-column">
                         <h3>Department</h3>
                         <select id="department">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Subnet</h3>
                         <select id="subnet">
                         </select>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                            Submit
                        </button>
                    </div>
               `)
     console.log(deviceType)
     $(iframe).find('#deviceType').find('option').filter(function () {
          return $(this).text() == deviceType;
     }).prop('selected', true);

     // load department 
     departments.forEach((department, index) => {
          if (department.name === departmentName) {
               $(iframe).find('select#department').append(` <option value="${department.id}" selected>${department.name}</option>`);
          }
          else {
               $(iframe).find('select#department').append(` <option value="${department.id}">${department.name}</option>`)
          }
     })

     // load subnets in department
     const departmentId = $(iframe).find('#department').find(':selected').val();
     await LoadSubnetInDepartment(departmentId);

     // add subnet in department to form
     $(iframe).find('select#subnet').empty()
     subnetsInDepartment.forEach((subnet, index) => {
          $(iframe).find('select#subnet').append(`<option value="${subnet.id}">${subnet.subnet_address}</option>`)
     })

     $(iframe).find('select#subnet').find('option').filter(function () {
          return $(this).text() == subnetName;
     }).prop('selected', true);

     $(iframe).find('select#department').change(async function () {
          const departmentId = $(this).find(':selected').val();
          await LoadSubnetInDepartment(departmentId);

          $(iframe).find('select#subnet').empty()
          subnetsInDepartment.forEach((subnet, index) => {
               $(iframe).find('select#subnet').append(`<option value="${subnet.id}">${subnet.subnet_address}</option>`)
          })
     })

     // add event update device
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const ipAddress = $(iframe).find('#ipAddress').val();
          const macAddress = $(iframe).find('#macAddress').val();
          const decription = $(iframe).find('#decription').val();
          const deviceType = $(iframe).find('#deviceType').find(':selected').text();
          const departmentId = $(iframe).find('#department').find(':selected').val();
          const subnetId = $(iframe).find('#subnet').find(':selected').val();

          const device = devices.find((device) => { return device.mac_address == macAddress })

          updatedevice(device.id, name, ipAddress, macAddress, decription, deviceType, departmentId, subnetId);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load device content 
function LoadContent(data) {
     $(`.pages-table-${category} tbody`).empty();
     data.forEach(device => {
          $(`.pages-table-${category} tbody`).append(`
                                   <tr>
                                        <td>${device.name}</td>
                                        <td><span class="fas fa-check-circle"></span>${device.ip_address}</td>
                                        <td>${device.mac_address}</td>
                                        <td>${device.device_type}</td>
                                        <td><a class="btn-white edit-device" id="" href="#">Edit</a> <a class="btn-red del-device" id="" href="#">Delete</a></td>
                                    </tr>
                              `)
     });

     // add event edit 
     $('.edit-device').click(async function () {
          let ipAddress = $(this).parent().siblings().eq(1).text();
          const device = devices.find((device) => { return device.ip_address == ipAddress })
          const departmentName = device.department?.name ?? '';
          const subnetName = device.subnet?.subnet_address ?? '';

          await loadFormUpdate(device.id, device.name, device.ip_address, device.mac_address, device.device_type, device.decription, departmentName, subnetName);

          $('#iframe-container-create').fadeIn();
          $('#iframe-container-detail #close-iframe-btn').click(function () {
               $('#iframe-container-create').fadeOut();
          })
     })

     // add event delete 
     $('.del-device').click(function () {
          const deviceName = $(this).parent().siblings().eq(0).text();
          const device = devices.find((device) => { return device.name == deviceName })
          if (window.confirm(`Delete device ${deviceName} ?`)) {
               deletedevice($(this).parent().parent(), device.id);
          }
     })
}


// search device
function search() {
     // search 
     $('#search').keypress(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);

          if (keycode == '13') {
               const keysearch = $('#search').val();
               $.ajax({
                    url: `http://localhost:3000/device/search/?keysearch=${keysearch}`,
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
                                        <th>IP Address</th>
                                        <th>MAC Address</th>
                                        <th>Type</th>
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
          url: "http://localhost:3000/device/",
          type: "GET",
          dataType: "json",
          success: function (data) {
               devices = data;

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
$('#device').click(function () {
     category = $(this).text().trim().split(' ')[0];
     $(this).siblings().not($('.category-header')).css('background-color', '#fff');
     $(this).css('background-color', 'lightgrey');
     $('.breadcrumb').text('');
     $('.breadcrumb').text(`Dashboard > ${category}`);

     $('#create-new-btn').text(`Create ${category}`);
     LoadPage();
})

