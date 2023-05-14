$(function () {
     // index
     var departments = [];
     var subnetDevices = [];

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

     // set cookie  
     function setAccessTokenCookie(name, value) {
          const date = new Date();
          date.setTime(date.getTime() + (60 * 60 * 1000));
          const expires = "expires=" + date.toUTCString();
          document.cookie = `${name}=` + value + ";" + expires + ";path=/";
     }

     // logout 
     $('#logout').click(function () {
          setAccessTokenCookie('access_token', '');
          window.location.href = 'http://127.0.0.1:5500/FrontEnd/common/html/login.html';
     })

     // event click tool
     $('.tool').click(function () {
          LoadTool();
     })

     // get all departments
     $.ajax({
          url: "http://localhost:3000/department/user/",
          type: "GET",
          headers: {
               'Authorization': `Bearer ${getCookieValue('access_token')}`,
               'Content-Type': 'application/json'
          },
          dataType: "json",
          success: function (data) {
               departments = data;
               LoadContent();
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
               if (jqXHR.status == 401) {
                    window.location.href = 'http://127.0.0.1:5500/FrontEnd/common/html/login.html';
               }
          }
     });

     // load tool 
     function LoadTool() {
          location.reload();
     }

     // load content 
     function LoadContent() {
          $('.nav-sidebar').empty();
          departments.forEach((department, ind) => {
               const index = ind;
               $('#departments').append(`
               <li>
                    <ul class="department department${ind}">
                         <a class="category" href="#">${department.name}</a>
                    </ul>
               </li>
          `);

               department.subnets.forEach((subnet, ind) => {
                    $(`.department${index}`).append(`
                         <li><a class="subnet" href="#">${subnet.subnet_address}</a></li>
                    `);
               });
          });

          //
          departments.forEach((department, ind) => {
               $('.table-striped tbody').append(`
                    <tr>
                         <td>${department.name}</td>
                         <td>${department.location}</td>
                         <td>${department.subnets?.length || ''}</td>
                         <td>${department?.devices?.length || ''}</td>
                    </tr>
               `)
          })

          // 
          $('.category').click(function () {
               $('.category').css('color', '#474747');
               $(this).css('color', '#337ab7');
               $(this).siblings().css('color', '#337ab7');

               const departmentName = $(this).text();
               const department = departments.find((department) => { return department.name == departmentName });
               let deviceSubnet = 0;
               department.subnets.forEach((subnet) => {
                    deviceSubnet += subnet.devices.length;
               })

               $('.main').empty();
               $('.main').append(`
                    <h1 class="page-header">Detail</h1>
                    <div class="detail">
                         <p><strong>Name :</strong>${department?.name || ''}</p>
                         <p><strong>Location :</strong>${department?.location || ''}</p>
                         <p><strong>Subnets :</strong>${department.subnets.length}</p>
                         <p><strong>Devices :</strong>${department.devices.length}</p>
                    </div>
               `);
               LoadSubnetTable(department);
          })

          // event load subnet 
          $('.department a.subnet').click(function () {
               const subnetAddress = $(this).text();
               const departmentName = $(this).parent().siblings().eq(0).text();
               const department = departments.find((department) => { return department.name == departmentName });
               const subnet = department.subnets.find((subnet) => { return subnet.subnet_address == subnetAddress });
               const network = subnet.network;

               LoadSubnet(subnet);
          })
     }

     function LoadSubnetTable(department) {
          const subnets = department.subnets;
          $('.main').append(`
               <h1 class="sub-header space">Subnets</h1>
                <hr>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subnet Address</th>
                                <th>Subnet Mask</th>
                                <th>Network</th>
                                <th>VLAN</th>
                                <th>Permission</th>
                                <th>Decription</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
          `);
          subnets.forEach((subnet, ind) => {
               $('.table-striped tbody').append(`
                    <tr>
                         <td>${subnet.name}</td>
                         <td><a class="subnet" href="#">${subnet.subnet_address}</a></td>
                         <td>${subnet.subnet_mask}</td>
                         <td><a class="network" href="#">${subnet?.network?.network_address || ''}</a></td>
                         <td><a class="vlan" href="#">${subnet?.vlan?.name || ''}</a></td>
                         <td>${subnet.permission}</td>
                         <td>${subnet.decription}</td>
                    </tr>
               `)
          })

          // event load subnet 
          $('td a.subnet').click(function () {
               const subnetAddress = $(this).text();
               const subnet = department.subnets.find((subnet) => { return subnet.subnet_address == subnetAddress })

               LoadSubnet(subnet);
          })

          // event load network
          $('td a.network').click(function () {
               const subnetAddress = $(this).parent().siblings().eq(1).text();
               const subnet = department.subnets.find((subnet) => { return subnet.subnet_address == subnetAddress })
               const network = subnet.network;

               let subnetManage = [];
               departments.forEach((department) => {
                    department.subnets.forEach((subnet) => {
                         subnetManage.push(subnet);
                    })
               })
               LoadNetwork(network, subnetManage);
          });

          // event load vlan
          $('td a.vlan').click(function () {
               const subnetAddress = $(this).parent().siblings().eq(1).text();
               const subnet = department.subnets.find((subnet) => { return subnet.subnet_address == subnetAddress })
               const vlan = subnet.vlan;

               let subnetManage = [];
               departments.forEach((department) => {
                    department.subnets.forEach((subnet) => {
                         subnetManage.push(subnet);
                    })
               })
               LoadVlan(vlan, subnetManage);
          });
     }

     // add form tool
     $('.main').append(`
          <div id="iframe-container-create" >
                    <iframe id="user-form-iframe" style="display: block;" src="../html/form.html"></iframe>
                    <button id="close-iframe-btn">Đóng</button>
          </div>
     `);

     // add event click button tool
     $('.button').click(function () {
          const toolName = $(this).attr('id');

          // check ip address variable
          if (toolName == 'checkIP') {
               LoadFormCheckIP(departments);
               $('#iframe-container-create').fadeIn();

               // add event close form
               $('#iframe-container-create #close-iframe-btn').click(function () {
                    $('#iframe-container-create').fadeOut();
               });
          }

          // caculate subnet 
          if (toolName == 'caculateSubnet') {
               LoadFormCaculateSubnet();
               $('#iframe-container-create').fadeIn();

               // add event close form
               $('#iframe-container-create #close-iframe-btn').click(function () {
                    $('#iframe-container-create').fadeOut();
               });
          }

          // use subnet 
          if (toolName == 'useSubnet') {
               LoadFormRegistrySubnet(departments);
               $('#iframe-container-create').fadeIn();

               // add event close form
               $('#iframe-container-create #close-iframe-btn').click(function () {
                    $('#iframe-container-create').fadeOut();
               });
          }

          // use subnet 
          if (toolName == 'getIpAddress') {
               LoadFormGetIpAddress(departments);
               $('#iframe-container-create').fadeIn();

               // add event close form
               $('#iframe-container-create #close-iframe-btn').click(function () {
                    $('#iframe-container-create').fadeOut();
               });
          }


     })
})