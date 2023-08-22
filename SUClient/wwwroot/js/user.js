var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var user = new User();
function AuthUserAutomatically() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == "true") {
        var user_1 = {
            userEmail: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
            password: localStorage.getItem('userPassword').replace(/\\|"/g, '')
        };
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(user_1),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("".concat(baseURL, "/User/Login"), requestOptions)
            .then(function (response) {
            if (!response.ok) {
                window.location.href = '/Home/LoginPage';
            }
            else {
                console.log('succesfull');
            }
        });
    }
    else {
        window.location.href = '/Home/LoginPage';
    }
}
function login() {
    var userEmailInput = document.getElementById('userEmail');
    var userPasswordInput = document.getElementById('password');
    var user = {
        userEmail: userEmailInput.value.trim(),
        password: userPasswordInput.value.trim()
    };
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch("".concat(baseURL, "/User/Login"), requestOptions)
        .then(function (response) {
        if (response.ok) {
            window.location.href = '/';
            localStorage.setItem('userEmail', JSON.stringify(user.userEmail));
            localStorage.setItem('userPassword', JSON.stringify(user.password));
            localStorage.setItem('isLoggedIn', "true");
            /*return response.json();*/
        }
        else {
            throw new Error(response.statusText);
        }
    })
        //.then(data => {
        //    localStorage.setItem('username', JSON.stringify(data.Username));
        //})
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
function GoToAskPage() {
    var userEmail = localStorage.getItem('userEmail');
    var userName = localStorage.getItem('userName');
    var userPassword = localStorage.getItem('userPassword');
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == "true") {
        window.location.href = '/Home/Ask';
    }
    else {
        window.location.href = '/Home/LoginPage';
    }
}
function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPassword');
    localStorage.setItem('isLoggedIn', "false");
}
function GoToLoginPage() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === "false") {
        window.location.href = '/Home/LoginPage';
    }
    else {
        window.location.href = '';
    }
}
function ShowLocalStorage() {
    var userEmail = localStorage.getItem('userEmail');
    var userName = localStorage.getItem('userName');
    var userPassword = localStorage.getItem('userPassword');
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log("userEmail   " + userEmail);
    console.log("userName    " + userName);
    console.log("userPassword " + userPassword);
    console.log("isLoggedIn  " + isLoggedIn);
}
//# sourceMappingURL=user.js.map