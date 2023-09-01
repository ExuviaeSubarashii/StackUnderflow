//class User {
//    email: string;
//    password: string;
//}
//let user: User = new User();
function AuthUserAutomatically() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var userToken = localStorage.getItem('usertoken');
    if (userToken !== null) {
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
    }
    else {
        // If user is not logged in, redirect to login page
        window.location.href = '/Home/LoginPage';
    }
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
    //instead of just storing it raw i'll sha256 it and store it like that, then decrypt it in api
    fetch("".concat(baseURL, "/User/Login"), requestOptions)
        .then(function (response) {
        if (response.ok) {
            window.location.href = '/';
            return response.json();
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (data) {
        localStorage.setItem('usertoken', data.token);
        localStorage.setItem('userEmail', data.encEmail);
        localStorage.setItem('userPassword', data.encPassword);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('isLoggedIn', "true");
        window.location.href = '/';
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
function GoToAskPage() {
    GoToThatPage("Ask");
}
function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    localStorage.removeItem('userPassword');
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userName');
}
function GoToLoginPage() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === "false") {
        GoToThatPage("LoginPage");
    }
    else {
        window.location.href = '';
    }
}
function ShowLocalStorage() {
    //const userEmail = localStorage.getItem('userEmail');
    //const userName = localStorage.getItem('userName');
    //const userPassword = localStorage.getItem('userPassword');
    //const isLoggedIn = localStorage.getItem('isLoggedIn');
    //console.log("userEmail   " + userEmail)
    //console.log("userName    " + userName)
    //console.log("userPassword " + userPassword)
    //console.log("isLoggedIn  " + isLoggedIn)
    var localUser = {
        userEmail: localStorage.getItem('userEmail'),
        userName: localStorage.getItem('userName'),
        userPassword: localStorage.getItem('userPassword'),
        isLoggedIn: localStorage.getItem('isLoggedIn'),
        token: localStorage.getItem('usertoken')
    };
    console.log(JSON.stringify(localUser));
}
function GoToThatPage(pageName) {
    window.location.href = "/Home/".concat(pageName);
}
//# sourceMappingURL=user.js.map