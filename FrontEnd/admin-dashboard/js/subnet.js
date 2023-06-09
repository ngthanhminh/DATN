// subnet
var subnets = [];
var departments = [];
var networks = [];
var vlans = [];
var category;

// get list prefix are valid 
function getValidSubnetMasks(networkAddress, subnetMask) {
     const ipAddress = networkAddress.split('.').map(Number);
     const subnet = subnetMask.split('.').map(Number);

     let numOnes = 0;
     for (let i = 0; i < subnet.length; i++) {
          const binarySubnetOctet = subnet[i].toString(2);
          numOnes += binarySubnetOctet.replace(/0/g, '').length;
     }

     const maxPrefixLength = 32;
     const minPrefixLength = numOnes;

     const prefixList = [];
     for (let i = maxPrefixLength; i >= minPrefixLength; i--) {
          prefixList.push(`${calculateSubnetMask(i)}/${i}`);
     }

     return prefixList;
}

// get subnet mask from prefix 
function calculateSubnetMask(prefix) {
     let subnetMask = "";
     for (let i = 0; i < 32; i++) {
          if (i < prefix) {
               subnetMask += "1";
          } else {
               subnetMask += "0";
          }
     }
     const octets = [];
     for (let i = 0; i < 4; i++) {
          octets.push(parseInt(subnetMask.slice(i * 8, (i + 1) * 8), 2));
     }
     return octets.join(".");
}

// get all departments
$.ajax({
     url: "http://localhost:3000/department/",
     type: "GET",
     dataType: "json",
     success: function (data) {
          departments = data;
     },
     error: function (xhr, textStatus, errorThrown) {
          var errorMessage = `${xhr.responseJSON.message}`;
          alert(`Error Message: ${errorMessage}`);
     }
});


// get all networks
$.ajax({
     url: "http://localhost:3000/network/",
     type: "GET",
     dataType: "json",
     success: function (data) {
          networks = data;
     },
     error: function (xhr, textStatus, errorThrown) {
          var errorMessage = `${xhr.responseJSON.message}`;
          alert(`Error Message: ${errorMessage}`);
     }
});


// get all vlans
$.ajax({
     url: "http://localhost:3000/VLAN/",
     type: "GET",
     dataType: "json",
     success: function (data) {
          vlans = data;
     },
     error: function (xhr, textStatus, errorThrown) {
          var errorMessage = `${xhr.responseJSON.message}`;
          alert(`Error Message: ${errorMessage}`);
     }
});


function CaculateSubnet(ipNetwork, subnet_mask) {
     $.ajax({
          url: `http://localhost:3000/subnet/caculate/?subnet_mask=${subnet_mask}&network_address=${ipNetwork}`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0);
               $(iframe).find('#subnetAddress').empty();
               data.forEach((val, ind) => {
                    const option = $(`<option value="${ind}">${val.subnet_address}</option>`);
                    $(iframe).find('#subnetAddress').append(option);
               })
               $(iframe).find('select#subnetAddress').prop('selectedIndex', -1);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}

// load message 
function LoadMessage(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0);
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add subnet')

     // add content to iframe create
     createForm.html(`${message}`);
}

// create subnet 
function createSubnet(name, subnetAddress, subnetMask, decription, permission, deparmentId, networkId, vlanId) {
     $.ajax({
          url: `http://localhost:3000/subnet`,
          type: "POST",
          dataType: "json",
          data: {
               name: name,
               subnet_address: subnetAddress,
               subnet_mask: subnetMask,
               permission: permission,
               decription: decription,
               department_id: deparmentId,
               network_id: networkId,
               vlan_id: vlanId,
          },
          success: function (data) {
               subnets.push(data);
               const message = `<p>Created subnet: ${data.name}</p>`;
               LoadMessage(message);
               LoadContent(subnets);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// update subnet 
function updateSubnet(id, name, subnetAddress, subnetMask, decription, permission, deparmentId, networkId, vlanId) {
     $.ajax({
          url: `http://localhost:3000/subnet/${id}`,
          type: "PATCH",
          dataType: "json",
          data: {
               name: name,
               subnet_address: subnetAddress,
               subnet_mask: subnetMask,
               permission: permission,
               decription: decription,
               department_id: deparmentId,
               network_id: networkId,
               vlan_id: vlanId,
          },
          success: function (data) {
               subnets.forEach((val, ind) => {
                    if (val["id"] == id)
                         subnets[ind] = data;
               })

               const message = `<p>Updated subnet: ${data.name}</p>`;
               LoadMessage(message)
               LoadContent(subnets);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// delete subnet 
function deletesubnet(subnetContext, subnetId) {
     $.ajax({
          url: `http://localhost:3000/subnet/${subnetId}`,
          type: "DELETE",
          dataType: "json",
          success: function (data) {
               window.alert(`Deleted: ${data.name}`);
               subnetContext.remove();
               subnets.forEach((val, ind) => {
                    if (val.id == subnetId) {
                         subnets.splice(ind, 1);
                    }
               })
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load form create subnets
function loadFormCreate() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add subnet')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" placeholder="Enter subnet name" />
                    </div>
                    <div class="flex-column">
                         <h3>Department</h3>
                         <select id="department">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>VLAN</h3>
                         <select id="vlan">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Network</h3>
                         <select id="network">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Subnet Mask</h3>
                         <select id="subnetMask">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Subnet Address</h3>
                         <select id="subnetAddress">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>Permission</h3>
                         <select id="permission">
                              <option value="ACCESS">ACCESS</option>
                              <option value="BLOCK">BLOCK</option>
                         </select>
                    </div>
                     <div class="flex-column">
                         <h3>Decription</h3>
                         <input type="text" name="decription" id="decription" placeholder="Enter decription" />
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)
     departments.forEach((department, index) => {
          $(iframe).find('select#department').append(`<option value="${department.id}">${department.name}</option>`)
     })
     $(iframe).find('select#department').prop('selectedIndex', -1);

     networks.forEach((network, index) => {
          $(iframe).find('select#network').append(`<option value="${network.id}">${network.network_address}</option>`)
     })
     $(iframe).find('select#network').prop('selectedIndex', -1);

     vlans.forEach((vlan, index) => {
          $(iframe).find('select#vlan').append(`<option value="${vlan.id}">${vlan.name}</option>`)
     })
     $(iframe).find('select#vlan').prop('selectedIndex', -1);

     $(iframe).find('#network').change(function () {
          const networkAddress = $(this).find(':selected').text();
          const network = networks.find((network) => { return network.network_address == networkAddress });

          const subnets = getValidSubnetMasks(network.network_address, network.subnet_mask);
          $(iframe).find('select#subnetMask').empty();
          subnets.forEach((subnetMask, index) => {
               $(iframe).find('select#subnetMask').append(`<option value="${index}">${subnetMask}</option>`)
          })

          $.ajax({
               url: `http://localhost:3000/network/${network.id}/caculate`,
               type: "GET",
               dataType: "json",
               success: function (data) {
                    if (data.subnets) {
                         $(iframe).find('#subnetMask').find('option').filter(function () {
                              return $(this).text().split('/')[0] === data.subnet_mask;
                         }).prop('selected', true);

                         $(iframe).find('#subnetMask').prop('disabled', true);
                         CaculateSubnet(network.network_address, data.subnet_mask);
                    }
                    else {
                         $(iframe).find('#subnetMask').prop('disabled', false);

                         $(iframe).find('#subnetMask').change(function () {
                              $(iframe).find('#subnetAddress').empty();
                              const subnetMask = $(iframe).find('#subnetMask').find(':selected').text().split('/')[0];
                              CaculateSubnet(network.network_address, subnetMask);
                         })
                    }
               },
               error: function (xhr, textStatus, errorThrown) {
                    var errorMessage = `${xhr.responseJSON.message}`;
                    alert(`Error Message: ${errorMessage}`);
               }
          });
          // const listSubnets = getValidPrefixes(network.network_address, network.subnet_mask);


     });
     // add event create subnet
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const subnetAddress = $(iframe).find('#subnetAddress').find(':selected').text();
          const subnetMask = $(iframe).find('#subnetMask').find(':selected').text().split('/')[0];
          const decription = $(iframe).find('#decription').val();
          const permission = $(iframe).find('#permission').find(':selected').text();
          const deparmentId = $(iframe).find('#department').find(':selected').val();
          const networkId = $(iframe).find('#network').find(':selected').val();
          const vlanId = $(iframe).find('#vlan').find(':selected').val();

          createSubnet(name, subnetAddress, subnetMask, decription, permission, deparmentId, networkId, vlanId);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load form update subnet
function loadFormUpdate(name, subnetAddress, subnetMask, permission, decription, departmentName, networkName, vlanName) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Edit subnet')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" value="${name}" placeholder="Enter subnet name" />
                    </div>
                    <div class="flex-column">
                         <h3>Subnet Address</h3>
                         <input type="text" name="subnetAddress" id="subnetAddress" value="${subnetAddress}" placeholder="Enter subnet address" />
                    </div>
                    <div class="flex-column">
                         <h3>Subnet Mask</h3>
                         <input type="text" name="subnetMask" id="subnetMask" value="${subnetMask}" placeholder="Enter subnet mask" />
                    </div>
                    <div class="flex-column">
                         <h3>Permission</h3>
                         <select id="permission">
                              <option value="ACCESS">ACCESS</option>
                              <option value="BLOCK">BLOCK</option>
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
                         <h3>Network</h3>
                         <select id="network">
                         </select>
                    </div>
                    <div class="flex-column">
                         <h3>VLAN</h3>
                         <select id="vlan">
                         </select>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)

     $(iframe).find('#permission').find('option').filter(function () {
          return $(this).text() === permission;
     }).prop('selected', true);

     departments.forEach((department, index) => {
          if (department.name === departmentName) {
               $(iframe).find('select#department').append(`<option value="${department.id}" selected>${department.name}</option>`);
          }
          else {
               $(iframe).find('select#department').append(`<option value="${department.id}">${department.name}</option>`)
          }
     })

     networks.forEach((network, index) => {
          if (network.name === networkName) {
               $(iframe).find('select#network').append(`<option value="${network.id}" selected>${network.name}</option>`)
          }
          else {
               $(iframe).find('select#network').append(`<option value="${network.id}">${network.name}</option>`)
          }
     })

     vlans.forEach((vlan, index) => {
          if (vlan.name === vlanName) {
               $(iframe).find('select#vlan').append(`<option value="${vlan.id}" selected>${vlan.name}</option>`);
          }
          else {
               $(iframe).find('select#vlan').append(`<option value="${vlan.id}">${vlan.name}</option>`);
          }
     })

     // add event update subnet
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const subnetAddress = $(iframe).find('#subnetAddress').val();
          const subnetMask = $(iframe).find('#subnetMask').val();
          const decription = $(iframe).find('#decription').val();
          const permission = $(iframe).find('#permission').find(':selected').text();
          const deparmentId = $(iframe).find('#department').find(':selected').val();
          const networkId = $(iframe).find('#network').find(':selected').val();
          const vlanId = $(iframe).find('#vlan').find(':selected').val();
          const subnet = subnets.find((subnet) => { return subnet.subnet_address == subnetAddress })

          updateSubnet(subnet.id, name, subnetAddress, subnetMask, decription, permission, deparmentId, networkId, vlanId);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load subnet content 
function LoadContent(data) {
     $(`.pages-table-${category} tbody`).empty();
     data.forEach(subnet => {
          $(`.pages-table-${category} tbody`).append(`
                                   <tr>
                                        <td>${subnet.subnet_address}</td>
                                        <td>${subnet.subnet_mask}</td>
                                        <td>${subnet.department?.name ?? ''}</td>
                                        <td>${subnet.network?.name ?? ''}</td>
                                        <td>${subnet.vlan?.name ?? ''}</td>
                                        <td>${subnet.permission}</td>
                                        <td><a class="btn-white edit-subnet" id="" href="#">Edit</a> <a class="btn-red del-subnet" id="" href="#">Delete</a></td>
                                    </tr>
                              `)
     });

     // add event edit 
     $('.edit-subnet').click(function () {
          let subnetAddress = $(this).parent().siblings().eq(0).text();
          const subnet = subnets.find((subnet) => { return subnet.subnet_address == subnetAddress })

          loadFormUpdate(subnet.name, subnet.subnet_address, subnet.subnet_mask, subnet.permission, subnet.decription, subnet?.department?.name || '', subnet.network.name, subnet?.vlan?.name || '');

          $('#iframe-container-create').fadeIn();
          $('#iframe-container-detail #close-iframe-btn').click(function () {
               $('#iframe-container-create').fadeOut();
          })
     })

     // add event delete 
     $('.del-subnet').click(function () {
          const subnetAddress = $(this).parent().siblings().eq(0).text();
          const subnet = subnets.find((subnet) => { return subnet.subnet_address == subnetAddress })
          if (window.confirm(`Delete subnet ${subnet.name} ?`)) {
               deletesubnet($(this).parent().parent(), subnet.id);
          }
     })
}


// search subnet
function search() {
     // search 
     $('#search').keypress(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);

          if (keycode == '13') {
               const keysearch = $('#search').val();
               $.ajax({
                    url: `http://localhost:3000/subnet/search/?keysearch=${keysearch}`,
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
                                        <th>Subnet Address</th>
                                        <th>Subnet Mask</th>
                                        <th>Department</th>
                                        <th>Network</th>
                                        <th>VLAN</th>
                                        <th>Permission</th>
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
          url: "http://localhost:3000/subnet",
          type: "GET",
          dataType: "json",
          success: function (data) {
               subnets = data;

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
$('#subnet').click(function () {
     category = $(this).text().trim().split(' ')[0];
     $(this).siblings().not($('.category-header')).css('background-color', '#fff');
     $(this).css('background-color', 'lightgrey');
     $('.breadcrumb').text('');
     $('.breadcrumb').text(`Dashboard > ${category}`);

     $('#create-new-btn').text(`Create ${category}`);
     LoadPage();
})

