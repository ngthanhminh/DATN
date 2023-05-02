
// subnet

// get subnet in network 
function getSubnetInVlan(vlanId, subnetsManage) {
     $.ajax({
          url: `http://localhost:3000/subnet/all/vlan/${vlanId}`,
          type: "GET",
          dataType: "json",
          success: function (data) {
               LoadSubnetsTableOfVlan(data, subnetsManage);
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log(textStatus + ": " + errorThrown);
          }
     });
}


// load subnet 
function LoadVlan(vlan, subnetsManage) {
     $('.main').empty();
     $('.main').append(`
          <h1 class="page-header">Detail</h1>
          <div class="detail">
          </div>
     `);

     $('.detail').append(`
          <p><strong>Name: </strong>${vlan.name}</ >
          <p><strong>Tag: </strong>${vlan.tag}</p>
          <p><strong>Decription: </strong>${vlan.decription}</p>
     `)

     getSubnetInVlan(vlan.id, subnetsManage);
}

function LoadSubnetsTableOfVlan(subnets, subnetsManage) {
     $('.main').append(`
          <h1 class= "sub-header space" > Subnet in VLAN</h1>
          <hr>
          <div class="table-responsive">
               <table class="table table-striped">
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

