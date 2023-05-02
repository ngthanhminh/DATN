$(function () {
    // load page 
    let numberDepartments;
    let numberNetworks;
    let numberVLANs;
    let numberSubnets;
    let numberDevices;
    let numberUsers;

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
        window.location.href = 'http://127.0.0.1:5500/FrontEnd/common/login.html';
    })

    const access_token = getCookieValue('access_token');

    $.ajax({
        url: "http://localhost:3000/common/count",
        type: "GET",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        dataType: "json",
        success: function (data) {
            numberDepartments = data.numberDepartments;
            numberDevices = data.numberDevices;
            numberNetworks = data.numberNetworks;
            numberVLANs = data.numberVLANs;
            numberSubnets = data.numberSubnets;
            numberUsers = data.numberUsers;

            $('.badge-department').text(data.numberDepartments);
            $('.badge-network').text(data.numberNetworks);
            $('.badge-device').text(data.numberDevices);
            $('.badge-subnet').text(data.numberSubnets);
            $('.badge-VLAN').text(data.numberVLANs);
            $('.badge-user').text(data.numberUsers);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ": " + errorThrown);
            if (jqXHR.status == 401) {
                window.location.href = 'http://127.0.0.1:5500/FrontEnd/common/login.html';
            }
        }
    });

    $.ajax({
        url: "http://localhost:3000/common/user/lastest",
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        success: function (data) {
            data.forEach(user => {
                $('.latest-bottom table').append(`
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.role}</td>
                        <td>${user.created_at}</td>

                    </tr>
                `)
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ": " + errorThrown);
            if (jqXHR.status == 401) {
                window.location.href = 'http://127.0.0.1:5500/FrontEnd/common/login.html';
            }
        }
    });


    // load script category
    $('.category').click(function () {
        const categoryName = $(this).attr('id');
        $('body script').last().remove();
        // code to run after script is loaded
        $('body').append(`<script src="../js/${categoryName}.js"></script>`)
    })

});
