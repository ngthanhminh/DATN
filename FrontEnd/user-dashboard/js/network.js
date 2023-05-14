
// subnet

// get subnet in network 
function getSubnetInNetwork(networkId, subnetsManage) {
     $.ajax({
          url: `http://localhost:3000/subnet/all/network/${networkId}`,
          type: "GET",
          dataType: "json",
          headers: {
               'Authorization': `Bearer ${getCookieValue('access_token')}`,
               'Content-Type': 'application/json'
          },
          success: function (data) {
               LoadSubnetsTableOfNetwork(data, subnetsManage);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               var errorMessage = `${xhr.responseJSON.message}`;
               alert(`Error Message: ${errorMessage}`);
          }
     });
}


// load subnet 
function LoadNetwork(network, subnetsManage) {
     $('.main').empty();
     $('.main').append(`
          <h1 class="page-header">Detail</h1>
          <div class="detail">
          </div>
     `);

     $('.detail').append(`
          <p><strong>Name: </strong>${network.name}</ >
          <p><strong>Network address: </strong>${network.network_address}</p>
          <p><strong>Subnet mask: </strong>${network.subnet_mask}</p>
          <p><strong>Gateway: </strong>${network.gateway}</p>    
          <p><strong>Decription: </strong>${network.decription}</p>
     `)

     getSubnetInNetwork(network.id, subnetsManage);
}

function LoadSubnetsTableOfNetwork(subnets, subnetsManage) {
     $('.main').append(`
          <h1 class= "sub-header space" >Subnets in network</h1>
          <hr>
          <div class="table-responsive">
               <table class="table table-striped">
                    <thead>
                         <tr>
                              <th>Name</th>
                              <th>Subnet</th>
                              <th>Subnet Mask</th>
                              <th>Permission</th>
                              <th>Decription</th>
                         </tr>
                    </thead>
                    <tbody>
                    <tr class="networks"></tr>
                    </tbody>
               </table>
          </div>
          <div id="iframe-container-create" >
                    <iframe id="user-form-iframe" style="display: block;" src="../html/form.html"></iframe>
                    <button id="close-iframe-btn">Đóng</button>
          </div>
     `);
     subnets.forEach((subnet, ind) => {
          let manage = false;
          subnetsManage.forEach((sub, ind) => {
               if (sub.subnet_address == subnet.subnet_address) {
                    manage = true;
               }
          })

          if (manage) {
               $('.table-striped tbody').append(`
                    <tr>
                         <td>${subnet.name}</td>
                         <td><a class="subnet" href="#">${subnet.subnet_address}</a></td>
                         <td>${subnet.subnet_mask}</td>
                         <td>${subnet.permission}</td>
                         <td>${subnet.decription}</td>
                    </tr>
               `)
          }
          else {
               $('.table-striped tbody').append(`
                    <tr>
                         <td>${subnet.name}</td>
                         <td>${subnet.subnet_address}</td>
                         <td>${subnet.subnet_mask}</td>
                         <td>${subnet.permission}</td>
                         <td>${subnet.decription}</td>
                    </tr>
               `)
          }
     });

     // add event subnet 
     $('td a.subnet').click(function () {
          const subnetAddress = $(this).text();
          const subnet = subnets.find((subnet) => { return subnet.subnet_address == subnetAddress })

          LoadSubnet(subnet);
     })

}

