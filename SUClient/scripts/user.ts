//class User {
//    email: string;
//    password: string;
//}

//let user: User = new User();
function AuthUserAutomatically() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userToken = localStorage.getItem('usertoken')|| undefined;
    if (userToken !== undefined) {
        const user = {
            userEmail: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
            password: localStorage.getItem('userPassword').replace(/\\|"/g, ''),
            Token: userToken
        };
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(`${baseURL}/User/AuthUser`, requestOptions)
            .then(response => {
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
            .then(data => {
                localStorage.setItem('usertoken', data.token);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else {
        // If user is not logged in, redirect to login page
        window.location.href = '/Home/LoginPage';
    }
}
function AuthUserKindaAutomatically() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn == "true") {
        document.getElementById('loginpagebutton').style.display = 'none';
        document.getElementById('registerpagebutton').style.display = 'none';
    }
}
function login() {
    const userEmailInput = document.getElementById('userEmail') as HTMLInputElement;
    const userPasswordInput = document.getElementById('password') as HTMLInputElement;

    const user = {
        userEmail: userEmailInput.value.trim(),
        password: userPasswordInput.value.trim()
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //instead of just storing it raw i'll sha256 it and store it like that, then decrypt it in api
    fetch(`${baseURL}/User/Login`, requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            localStorage.setItem('usertoken', data.token);
            localStorage.setItem('userEmail', data.encEmail);
            localStorage.setItem('userPassword', data.encPassword);
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('isLoggedIn', "true");
            window.location.href = '/';
        })
        .catch(error => {
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
    const isLoggedIn = localStorage.getItem('isLoggedIn');
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

    const localUser = {
        userEmail: localStorage.getItem('userEmail'),
        userName: localStorage.getItem('userName'),
        userPassword: localStorage.getItem('userPassword'),
        isLoggedIn: localStorage.getItem('isLoggedIn'),
        token: localStorage.getItem('usertoken')
    }
    console.log(JSON.stringify(localUser));
}
function GoToThatPage(pageName: string) {
    window.location.href = `/Home/${pageName}`;
}
function Register() {
    const userEmail = document.getElementById('userEmail') as HTMLInputElement;
    const userName = document.getElementById('userName') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const passwordAgain = document.getElementById('passwordAgain') as HTMLInputElement;

    const registeration = {
        userEmail: userEmail.value,
        userName: userName.value,
        password: password.value,
        passwordAgain: passwordAgain.value
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(registeration),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (registeration.password === registeration.passwordAgain) {
        fetch(`${baseURL}/User/Register`, requestOptions)
            .then(response => {
                if (response.ok) {
                    GoToThatPage("LoginPage");
                }
                else {
                    throw new Error(response.statusText);
                }
            })
    }
    console.log(JSON.stringify(registeration));
}


