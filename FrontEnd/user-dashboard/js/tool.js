// tool

// <------------ Check IP Address --------------->

// load message 
function LoadMessageTool(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Result')

     // add content to iframe create
     createForm.html(`${message}`);

     // add event close form
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     });
}

function checkIP(ipAddress) {
     $.ajax({
          url: `http://localhost:3000/device/checkIP`,
          type: "GET",
          dataType: "json",
          data: {
               ip_address: ipAddress,
          },
          success: function (data) {
               let message;
               if (data) {
                    message = `<h3>Ip address: ${ipAddress} not avaiable !</h3>`;
               }
               else {
                    message = `<h3>Ip address: ${ipAddress} ready !</h3>`;
               }
               LoadMessageTool(message);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}

function LoadFormCheckIP() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Check Ip Address')

     // add content to iframe 
     createForm.html(`
                    <div class="flex-column">
                         <h3>Ip Address</h3>
                         <input type="text" name="ipAddress" id="ipAddress" value="" placeholder="Enter ip address..." />
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)

     // add event checkIP
     $(iframe).find('#submit').click(function () {
          const ipAddress = $(iframe).find('#ipAddress').val();
          checkIP(ipAddress);

          LoadMessageTool()
     })
}

// <------------ Caculate Subnet --------------->

function CaculateSubnet(ipNetwork, numSubnets) {
     $.ajax({
          url: `http://localhost:3000/subnet/caculate/${numSubnets}`,
          type: "POST",
          dataType: "json",
          data: {
               network_address: ipNetwork,
          },
          success: function (data) {
               let message = ``;
               data.forEach((subnet, ind) => {
                    if (ind < numSubnets) {
                         message += `<h3><strong>Subnet ${ind + 1}:</strong> ${subnet.subnet_address}</h3>`
                    }
               })
               LoadMessageTool(message);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}

function LoadFormCaculateSubnet() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Caculate subnet')

     // add content to iframe 
     createForm.html(`
                    <div class="flex-column">
                         <h3>Ip Network</h3>
                         <input type="text" name="ipNetwork" id="ipNetwork" value="" placeholder="Enter ip network..." />
                    </div>
                    <div class="flex-column">
                         <h3>Number subnet</h3>
                         <input type="text" name="number" id="number" value="" placeholder="Enter the number of subnets you want..." />
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)

     // add event checkIP
     $(iframe).find('#submit').click(function () {
          const ipNetwork = $(iframe).find('#ipNetwork').val();
          const numSubnets = $(iframe).find('#number').val();

          CaculateSubnet(ipNetwork, numSubnets);
          LoadMessageTool()
     })
}

// <------------ Registry Subnet --------------->

function RegistrySubnet(departmentId, departmentName, subnetId) {
     $.ajax({
          url: `http://localhost:3000/subnet/${subnetId}`,
          type: "PATCH",
          dataType: "json",
          data: {
               department_id: departmentId,
          },
          success: function (data) {
               let message = `<h3>Subnet ${data.subnet_address} used by ${departmentName}</h3>`;
               LoadMessageTool(message);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}

function LoadFormRegistrySubnet(departments) {
     let subnetAvailable = [];
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Registry use subnet')

     // add content to iframe 
     createForm.html(`
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
     departments.forEach((department, ind) => {
          $(iframe).find('select#department').append(` <option value="department ${ind + 1}" selected>${department.name}</option>`)
     })
     $(iframe).find('select#department').prop('selectedIndex', -1);

     $.ajax({
          url: `http://localhost:3000/subnet/available`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               subnetAvailable = data;
               data.forEach((subnet, ind) => {
                    $(iframe).find('select#subnet').append(` <option value="subnet ${ind + 1}" selected>${subnet.subnet_address}</option>`)
               })
               $(iframe).find('select#subnet').prop('selectedIndex', -1);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });

     // add event checkIP
     $(iframe).find('#submit').click(function () {
          const departmentName = $(iframe).find('#department').find(':selected').text();
          const subnetAddress = $(iframe).find('#subnet').find(':selected').text();
          const department = departments.find((department) => { return department.name == departmentName });
          const subnet = subnetAvailable.find((subnet) => { return subnet.subnet_address == subnetAddress });

          RegistrySubnet(department.id, departmentName, subnet.id);
          LoadMessageTool()
     })
}


// <------------ Get random Ip addresss --------------->

function GetIpAddress(subnetId) {
     $.ajax({
          url: `http://localhost:3000/subnet/${subnetId}/ip`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               let message = `<h2>Ip address:  ${data.ip}</h2>`;
               LoadMessageTool(message);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}

// load form get random ip address
function LoadFormGetIpAddress(departments) {
     let subnets;
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Get Ip Address')

     // add content to iframe 
     createForm.html(`
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
     departments.forEach((department, ind) => {
          $(iframe).find('select#department').append(` <option value="department ${ind + 1}" selected>${department.name}</option>`)
     })
     $(iframe).find('select#department').prop('selectedIndex', -1);

     $(iframe).find('select#department').change(function () {
          const departmentName = $(this).find(':selected').text();
          const department = departments.find((department) => { return department.name == departmentName });

          $.ajax({
               url: `http://localhost:3000/subnet/department/${department.id}`,
               type: "GET",
               dataType: "json",
               success: function (data) {
                    subnets = data;
                    $(iframe).find('select#subnet').empty();
                    data.forEach((subnet, ind) => {
                         $(iframe).find('select#subnet').append(` <option value="subnet ${ind + 1}" selected>${subnet.subnet_address}</option>`)
                    })
               },
               error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
               }
          });
     })

     // add event checkIP
     $(iframe).find('#submit').click(function () {
          // const departmentName = $(iframe).find('#department').find(':selected').text();
          const subnetAddress = $(iframe).find('#subnet').find(':selected').text();
          // const department = departments.find((department) => { return department.name == departmentName });
          const subnet = subnets.find((subnet) => { return subnet.subnet_address == subnetAddress });

          GetIpAddress(subnet.id);
          LoadMessageTool()
     })
}