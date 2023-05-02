// network
var networks = [];
var category;


// load message 
function LoadMessage(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add network')

     // add content to iframe create
     createForm.html(`${message}`);
}

// create network 
function createNetwork(name, networkAddress, subnetMask, gateway, decription) {
     $.ajax({
          url: `http://localhost:3000/network`,
          type: "POST",
          dataType: "json",
          data: {
               name: name,
               network_address: networkAddress,
               subnet_mask: subnetMask,
               gateway: gateway,
               decription: decription,
          },
          success: function (data) {
               networks.push(data);
               const message = `<p>Created network: ${data.name}</p>`;
               LoadMessage(message);
               LoadContent(networks);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// update network 
function updateNetwork(id, name, networkAddress, subnetMask, gateway, decription) {
     $.ajax({
          url: `http://localhost:3000/network/${id}`,
          type: "PATCH",
          dataType: "json",
          data: {
               name: name,
               network_address: networkAddress,
               subnet_mask: subnetMask,
               gateway: gateway,
               decription: decription,
          },
          success: function (data) {
               networks.forEach((val, ind) => {
                    if (val["id"] == id)
                         networks[ind] = data;
               })

               const message = `<p>Updated network: ${data.name}</p>`;
               LoadMessage(message)
               LoadContent(networks);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// delete network 
function deleteNetwork(networkContext, networkId) {
     $.ajax({
          url: `http://localhost:3000/network/${networkId}`,
          type: "DELETE",
          dataType: "json",
          success: function (data) {
               window.alert(`Deleted: ${data.name}`);
               networkContext.remove();
               networks.forEach((val, ind) => {
                    if (val.id == networkId) {
                         networks.splice(ind, 1);
                    }
               })
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load form create networks
function loadFormCreate() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add network')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" placeholder="Enter network name" />
                    </div>
                    <div class="flex-column">
                         <h3>Network Address</h3>
                         <input type="text" name="networkAddress" id="networkAddress" placeholder="Enter network address" />
                    </div>
                    <div class="flex-column">
                         <h3>Subnet Mask</h3>
                         <input type="text" name="subnetMask" id="subnetMask" placeholder="Enter subnet mask" />
                    </div>
                     <div class="flex-column">
                         <h3>Gateway</h3>
                         <input type="text" name="gateway" id="gateway" placeholder="Enter gateway" />
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

     // add event update network
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const networkAddress = $(iframe).find('#networkAddress').val();
          const subnetMask = $(iframe).find('#subnetMask').val();
          const gateway = $(iframe).find('#gateway').val();
          const decription = $(iframe).find('#decription').val();

          createNetwork(name, networkAddress, subnetMask, gateway, decription);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load form update network
function loadFormUpdate(name, networkAddress, subnetMask, gateway, decription) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Edit network')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" value="${name}" placeholder="Enter network name" />
                    </div>
                    <div class="flex-column">
                         <h3>Network Address</h3>
                         <input type="text" name="networkAddress" id="networkAddress" value="${networkAddress}" placeholder="Enter location" disabled/>
                    </div>
                    <div class="flex-column">
                         <h3>Subnet Mask</h3>
                         <input type="text" name="subnetMask" id="subnetMask" value="${subnetMask}" placeholder="Enter location" />
                    </div>
                    <div class="flex-column">
                         <h3>Gateway</h3>
                         <input type="text" name="gateway" id="gateway" value="${gateway}" placeholder="Enter location" />
                    </div>
                    <div class="flex-column">
                         <h3>Decription</h3>
                         <input type="text" name="decription" id="decription" value="${decription}"placeholder="Enter location" />
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                            Submit
                        </button>
                    </div>
               `)

     // add event update network
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const networkAddress = $(iframe).find('#networkAddress').val();
          const subnetMask = $(iframe).find('#subnetMask').val();
          const gateway = $(iframe).find('#gateway').val();
          const decription = $(iframe).find('#decription').val();


          const network = networks.find((network) => { return network.network_address == networkAddress })
          updateNetwork(network.id, name, networkAddress, subnetMask, gateway, decription);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load network content 
function LoadContent(data) {
     $(`.pages-table-${category} tbody`).empty();
     data.forEach(network => {
          $(`.pages-table-${category} tbody`).append(`
                                   <tr>
                                        <td>${network.name}</td>
                                        <td>${network.network_address}</td>
                                        <td>${network.subnet_mask}</td>
                                        <td>${network.gateway}</td>
                                        <td><a class="btn-white edit-network" id="" href="#">Edit</a> <a class="btn-red del-network" id="" href="#">Delete</a></td>
                                    </tr>
                              `)
     });

     // add event edit 
     $('.edit-network').click(function () {
          let networkAddress = $(this).parent().siblings().eq(1).text();
          const network = networks.find((network) => { return network.network_address == networkAddress })

          loadFormUpdate(network.name, network.network_address, network.subnet_mask, network.gateway, network.decription);

          $('#iframe-container-create').fadeIn();
          $('#iframe-container-detail #close-iframe-btn').click(function () {
               $('#iframe-container-create').fadeOut();
          })
     })

     // add event delete 
     $('.del-network').click(function () {
          const networkAddress = $(this).parent().siblings().eq(1).text();
          const network = networks.find((network) => { return network.network_address == networkAddress })
          if (window.confirm(`Delete network ${network.name} ?`)) {
               deleteNetwork($(this).parent().parent(), network.id);
          }
     })
}


// search network
function search() {
     // search 
     $('#search').keypress(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);

          if (keycode == '13') {
               const keysearch = $('#search').val();
               $.ajax({
                    url: `http://localhost:3000/network/search/?keysearch=${keysearch}`,
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
                                        <th>Network Address</th>
                                        <th>Subnet Mask</th>
                                        <th>Gateway</th>
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
          url: "http://localhost:3000/network",
          type: "GET",
          dataType: "json",
          success: function (data) {
               networks = data;

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
$('#network').click(function () {
     category = $(this).text().trim().split(' ')[0];
     $(this).siblings().not($('.category-header')).css('background-color', '#fff');
     $(this).css('background-color', 'lightgrey');
     $('.breadcrumb').text('');
     $('.breadcrumb').text(`Dashboard > ${category}`);

     $('#create-new-btn').text(`Create ${category}`);
     LoadPage();
})

