var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var user = new User();
function AuthUserAutomatically() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    /*if (userToken !== null) {*/
    var user = {
        userEmail: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
        password: localStorage.getItem('userPassword').replace(/\\|"/g, ''),
        Token: localStorage.getItem('usertoken').replace(/\\|"/g, '')
    };
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch("".concat(baseURL, "/User/AuthUser"), requestOptions)
        .then(function (response) {
        if (!response.ok) {
            // If login is not successful, redirect to login page
            window.location.href = '/Home/LoginPage';
        }
        else {
            // If login is successful, hide the buttons
            localStorage.setItem('isLoggedIn', "true");
            document.getElementById('loginpagebutton').style.display = 'none';
            document.getElementById('registerpagebutton').style.display = 'none';
            console.log('Successful login');
        }
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
    //}
    //else {
    // If user is not logged in, redirect to login page
    //window.location.href = '/Home/LoginPage';
    //}
}
function AuthUserKindaAutomatically() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == "true") {
        document.getElementById('loginpagebutton').style.display = 'none';
        document.getElementById('registerpagebutton').style.display = 'none';
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
            return response.text();
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (sessionToken) {
        localStorage.setItem('usertoken', sessionToken);
        console.log('Session token:', sessionToken);
        window.location.href = '/';
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
function GoToAskPage() {
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
    localStorage.removeItem('username');
    localStorage.removeItem('userPassword');
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('usertoken');
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