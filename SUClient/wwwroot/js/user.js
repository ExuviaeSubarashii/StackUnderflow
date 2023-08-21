var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var user = new User();
function AuthUserAutomatically() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var userEmail = localStorage.getItem('userEmail');
    var user = {
        userEmail: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
        password: localStorage.getItem('userPassword').replace(/\\|"/g, '')
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
        if (!response.ok) {
            window.location.href = '/Home/LoginPage';
        }
        else {
            console.log('succesfull');
        }
    });
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
            localStorage.setItem('userEmail', JSON.stringify(user.userEmail));
            localStorage.setItem('userPassword', JSON.stringify(user.password));
            localStorage.setItem('isLoggedIn', "true");
            window.location.href = '';
            return response.json();
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (data) {
        localStorage.setItem('userName', JSON.stringify(data.Username));
    })
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
        console.log(userEmail);
        console.log(userName);
        console.log(userPassword);
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
    //var userEmail = localStorage.getItem('userEmail');
    //var userName = localStorage.getItem('userName');
    //var userPassword = localStorage.getItem('userPassword');
    //var isLoggedIn = localStorage.getItem('isLoggedIn');
    //console.log(userEmail);
    //console.log(userName);
    //console.log(userPassword);
    //console.log(isLoggedIn);
}
function amogus() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var userEmail = localStorage.getItem('userEmail');
    var userPassword = localStorage.getItem('password');
    SetCookie("amogus", userEmail);
}
function amogus2() {
    var amogusta = getCookie("amogus");
    console.log(amogusta);
}
function SetCookie(cookiename, value) {
    var cookieValue = "".concat(cookiename, "=").concat(value, "; path=/");
    document.cookie = cookieValue;
}
function getCookie(name) {
    var cookies = document.cookie.split('; ');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var _a = cookie.split('='), cookieName = _a[0], cookieValue = _a[1];
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
function deleteCookie(name) {
    document.cookie = "".concat(name, "=; path=/;");
}
//# sourceMappingURL=user.js.map