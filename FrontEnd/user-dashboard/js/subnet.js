
// subnet

// get devices in subnet 
function getSubnetById(subnetId) {
     $.ajax({
          url: `http://localhost:3000/subnet/${subnetId}`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               LoadSubnet(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}

// get devices in department 
function getDevicesInDepartment(departmentId, subnetId) {
     $.ajax({
          url: `http://localhost:3000/department/${departmentId}/device`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               // console.log(subnetId, data[0].devices)
               subnetDevices = data[0].devices;
               getIpsInSubnet(subnetId, data[0].devices);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}

// get ips in subnet 
function getIpsInSubnet(subnetId, devices) {
     $.ajax({
          url: `http://localhost:3000/subnet/${subnetId}/ips`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               // console.log('ips: ', data)
               LoadIpAddressTable(data, devices, subnetId);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}

// load subnet 
function LoadSubnet(subnet) {
     $('.main').empty();
     $('.main').append(`
          <h1 class="page-header">Detail</h1>
          <div class="detail">
          </div>
     `);

     $('.detail').append(`
          <p><strong>Name: </strong>${subnet.name}</ >
          <p><strong>Subnet address: </strong>${subnet.subnet_address}</p>
          <p><strong>Subnet mask: </strong>${subnet.subnet_mask}</p>
          <p><strong>Devices: </strong>${subnet.devices.length}</p>    
          <p><strong>Decription: </strong>${subnet.decription}</p>
     `)

     getDevicesInDepartment(subnet.department_id, subnet.id);
}

function LoadIpAddressTable(listIpAddress, listDevices, subnetId) {
     $('.main').append(`
          <h1 class= "sub-header space" > Ips in subnet</h1>
          <hr>
          <div class="table-responsive">
               <table class="table table-striped">
                    <tbody>
                    <tr class="ips"></tr>
                    </tbody>
               </table>
          </div>
          <div id="iframe-container-create" >
                    <iframe id="user-form-iframe" style="display: block;" src="../html/form.html"></iframe>
                    <button id="close-iframe-btn">Đóng</button>
          </div>
     `);
     listIpAddress.forEach((ip, ind) => {
          const host = ip.split('.');
          const ipShort = `.${host[host.length - 1]}`
          let title = ip;
          let assgin = false;

          listDevices.forEach((device, ind) => {
               if (device.ip_address == ip) {
                    title += ` - ${device.name}`;
                    assgin = true;
               }
          })

          if (assgin) {
               $('.table-striped tbody tr.ips').append(`
                    <td title="${title}" class="assigned">${ipShort}</td>
               `)
          }
          else {
               $('.table-striped tbody tr.ips').append(`
                    <td title="${title}">${ipShort}</td>
               `)
          }

     });

     // add event assign ip
     $('tr.ips td').click(function () {
          const td = $(this).attr('title').split('-');
          const ipAddress = td[0].trim();
          const deviceName = td[1] ? td[1].trim() : '';

          $('#iframe-container-create').fadeIn();
          loadFormCreate(ipAddress, deviceName, subnetId);
     });

     // add event close form
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     });
}

// load message 
function LoadMessage(message, subnetId) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Assigned Device')

     // add content to iframe create
     createForm.html(`${message}`);

     // add event close form
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     });
}

function assignIpAddress(deviceId, ipAddress, subnetId) {
     $.ajax({
          url: `http://localhost:3000/device/${deviceId}`,
          type: "PATCH",
          dataType: "json",
          data: {
               ip_address: ipAddress,
               subnet_id: subnetId,
          },
          success: function (data) {
               const message = `<p>Assigned ip address: ${data.ip_address} for device: ${data.name}</p>`;
               LoadMessage(message, subnetId);
               setTimeout(function () {
                    getSubnetById(subnetId);
               }, 3000);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}

// load form assign 
function loadFormCreate(ipAddress, deviceName, subnetId) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Assign Ip Address')

     // add content to iframe 
     createForm.html(`
                    <div class="flex-column">
                         <h3>Ip Address</h3>
                         <input type="text" name="ipAddress" id="ipAddress" value="${ipAddress}" placeholder="" disabled />
                    </div>
                    <div class="flex-column">
                         <h3>Device</h3>
                         <select id="devices">
                         </select>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)

     subnetDevices.forEach((device, ind) => {
          if (deviceName && device.name == deviceName) {
               $(iframe).find('select#devices').append(` <option value="devices${ind + 1}" selected>${device.name}</option>`);
          }
          else {
               $(iframe).find('select#devices').append(` <option value="devices${ind + 1}">${device.name}</option>`)
          }
     })

     // add event assign id address for device 
     $(iframe).find('#submit').click(function () {
          const deviceName = $(iframe).find('#devices').find(':selected').text();
          const device = subnetDevices.find((device) => { return device.name == deviceName })
          assignIpAddress(device.id, ipAddress, subnetId);
     })
}