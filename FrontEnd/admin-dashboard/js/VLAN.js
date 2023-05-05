// VLAN
var VLANs = [];
var category;


// load message 
function LoadMessage(message) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add VLAN')

     // add content to iframe create
     createForm.html(`${message}`);
}

// create VLAN 
function createVLAN(name, tag, decription) {
     $.ajax({
          url: `http://localhost:3000/VLAN`,
          type: "POST",
          dataType: "json",
          data: {
               name: name,
               tag: tag,
               decription: decription,
          },
          success: function (data) {
               VLANs.push(data);
               const message = `<p>Created VLAN: ${data.name}</p>`;
               LoadMessage(message);
               LoadContent(VLANs);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// update VLAN 
function updateVLAN(id, name, tag, decription) {
     $.ajax({
          url: `http://localhost:3000/VLAN/${id}`,
          type: "PATCH",
          dataType: "json",
          data: {
               name: name,
               tag: tag,
               decription: decription
          },
          success: function (data) {
               VLANs.forEach((val, ind) => {
                    if (val["id"] == id)
                         VLANs[ind] = data;
               })

               const message = `<p>Updated VLAN: ${data.name}</p>`;
               LoadMessage(message);
               LoadContent(VLANs);
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// delete VLAN 
function deleteVLAN(VLANContext, VLANId) {
     $.ajax({
          url: `http://localhost:3000/VLAN/${VLANId}`,
          type: "DELETE",
          dataType: "json",
          success: function (data) {
               window.alert(`Deleted: ${data.name}`);
               VLANContext.remove();
               VLANs.forEach((val, ind) => {
                    if (val.id == VLANId) {
                         VLANs.splice(ind, 1);
                    }
               })
          },
          error: function (xhr, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.statusCode} - ${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load form create VLANs
function loadFormCreate() {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Add VLAN')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" placeholder="Enter VLAN name" />
                    </div>
                    <div class="flex-column">
                         <h3>Tag</h3>
                         <input type="text" name="tag" id="tag" placeholder="Enter tag" />
                    </div>
                    <div class="flex-column">
                         <h3>Decription</h3>
                         <input type="text" name="decription" id="decription" placeholder="Enter tag" />
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                              Submit
                         </button>
                    </div>
               `)

     // add event update VLAN
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const tag = $(iframe).find('#tag').val();
          const decription = $(iframe).find('#decription').val();

          createVLAN(name, tag, decription);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load form update VLAN
function loadFormUpdate(id, name, tag, decription) {
     let iframe = $("#iframe-container-create > #user-form-iframe").contents().get(0)
     let createForm = $(iframe).find('form#create-form')

     // add header content
     $(iframe).find('.heading').text('Edit VLAN')

     // add content to iframe create
     createForm.html(`
                    <div class="flex-column">
                         <h3>Name</h3>
                         <input type="text" name="name" id="name" value="${name}" placeholder="Enter VLAN name" />
                    </div>
                    <div class="flex-column">
                         <h3>Tag</h3>
                         <input type="text" name="tag" id="tag" value="${tag}" placeholder="Enter tag"/>
                    </div>
                    <div class="flex-column">
                         <h3>Tag</h3>
                         <input type="text" name="decription" id="decription" value="${decription}" placeholder="Enter tag"/>
                    </div>
                    <div class="flex" id="btn">
                         <button class="primary" name="submit" id="submit">
                            Submit
                        </button>
                    </div>
               `)

     // add event update VLAN
     $(iframe).find('#submit').click(function (event) {
          event.preventDefault();
          const name = $(iframe).find('#name').val();
          const tag = $(iframe).find('#tag').val();
          const decription = $(iframe).find('#decription').val();

          const VLAN = VLANs.find((VLAN) => { return VLAN.tag == tag })
          updateVLAN(VLAN.id, name, tag, decription);
     });

     // add event close form
     $('#iframe-container-create').fadeIn();
     $('#iframe-container-create #close-iframe-btn').click(function () {
          $('#iframe-container-create').fadeOut();
     })
}


// load VLAN content 
function LoadContent(data) {
     $(`.pages-table-${category} tbody`).empty();
     data.forEach(VLAN => {
          $(`.pages-table-${category} tbody`).append(`
                                   <tr>
                                        <td>${VLAN.name}</td>
                                        <td>${VLAN.tag}</td>
                                        <td>${VLAN.decription}</td>
                                        <td>${VLAN.subnets.length}</td>
                                        <td><a class="btn-white edit-VLAN" id="" href="#">Edit</a> <a class="btn-red del-VLAN" id="" href="#">Delete</a></td>
                                    </tr>
                              `)
     });

     // add event edit 
     $('.edit-VLAN').click(function () {
          let VLANTag = $(this).parent().siblings().eq(1).text();
          const VLAN = VLANs.find((VLAN) => { return VLAN.tag == VLANTag })

          loadFormUpdate(VLAN.id, VLAN.name, VLAN.tag, VLAN.decription);

          $('#iframe-container-create').fadeIn();
          $('#iframe-container-detail #close-iframe-btn').click(function () {
               $('#iframe-container-create').fadeOut();
          })
     })

     // add event delete 
     $('.del-VLAN').click(function () {
          const VLANTag = $(this).parent().siblings().eq(1).text();
          const VLAN = VLANs.find((VLAN) => { return VLAN.tag == VLANTag })
          if (window.confirm(`Delete VLAN ${VLAN.name} ?`)) {
               deleteVLAN($(this).parent().parent(), VLAN.id);
          }
     })
}


// search VLAN
function search() {
     // search 
     $('#search').keypress(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);

          if (keycode == '13') {
               const keysearch = $('#search').val();
               $.ajax({
                    url: `http://localhost:3000/VLAN/search/?keysearch=${keysearch}`,
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
                                        <th>Tag</th>
                                        <th>Decription</th>
                                        <th>Subnets</th>
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
          url: "http://localhost:3000/VLAN",
          type: "GET",
          dataType: "json",
          success: function (data) {
               VLANs = data;

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
$('#VLAN').click(function () {
     category = $(this).text().trim().split(' ')[0];
     $(this).siblings().not($('.category-header')).css('background-color', '#fff');
     $(this).css('background-color', 'lightgrey');
     $('.breadcrumb').text('');
     $('.breadcrumb').text(`Dashboard > ${category}`);

     $('#create-new-btn').text(`Create ${category}`);
     LoadPage();
})

