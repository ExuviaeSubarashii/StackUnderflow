function AuthUserAutomatically() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var userToken = localStorage.getItem('usertoken') || undefined;
    if (userToken !== undefined) {
        var user = {
            userEmail: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
            password: localStorage.getItem('userPassword').replace(/\\|"/g, ''),
            Token: userToken
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
                return response.json();
            }
        })
            .then(function (data) {
            localStorage.setItem('usertoken', data.token);
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
    GoToThatPage("");
}
function ShowLocalStorage() {
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
function Register() {
    var userEmail = document.getElementById('userEmail');
    var userName = document.getElementById('userName');
    var password = document.getElementById('password');
    var passwordAgain = document.getElementById('passwordAgain');
    var registeration = {
        userEmail: userEmail.value,
        userName: userName.value,
        password: password.value,
        passwordAgain: passwordAgain.value
    };
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(registeration),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (registeration.password === registeration.passwordAgain) {
        fetch("".concat(baseURL, "/User/Register"), requestOptions)
            .then(function (response) {
            if (response.ok) {
                GoToThatPage("LoginPage");
            }
            else {
                throw new Error(response.statusText);
            }
        });
    }
    console.log(JSON.stringify(registeration));
}
//# sourceMappingURL=user.js.map