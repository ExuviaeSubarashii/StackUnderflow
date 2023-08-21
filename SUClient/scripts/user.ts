class User {
    email: string;
    password: string;
}

let user: User = new User();
function AuthUserAutomatically() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var userloginname = document.querySelector('.userloginname');
    const loginpagebutton = document.getElementById('.loginpagebutton') as HTMLButtonElement;
    var userEmail = localStorage.getItem('userEmail');
    loginpagebutton.disabled = true;

    const user = {
        userEmail: localStorage.getItem('userEmail'),
        password: localStorage.getItem('userPassword')
    };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`${baseURL}/User/Login`, requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.href = '/Home/Ask';
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(function (response) {
            if (response.ok) {
                window.location.href = '/Home/Questions';
            }
            else {
                window.location.href = '/Home/LoginPage';

                throw new Error(response.statusText);
            }
        })

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

    fetch(`${baseURL}/User/Login`, requestOptions)
        .then(response => {
            if (response.ok) {
                localStorage.setItem('userEmail', JSON.stringify(user.userEmail));
                localStorage.setItem('userPassword', JSON.stringify(user.password));
                localStorage.setItem('isLoggedIn', "true");
                window.location.href = '';
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {

            localStorage.setItem('userName', JSON.stringify(data.Username));
        })
        .catch(error => {
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
    //localStorage.removeItem('userEmail');
    //localStorage.removeItem('userName');
    //localStorage.removeItem('userPassword');
    //localStorage.setItem('isLoggedIn', "false");
    var userEmail = localStorage.getItem('userEmail');
    var userName = localStorage.getItem('userName');
    var userPassword = localStorage.getItem('userPassword');
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(userEmail);
    console.log(userName);
    console.log(userPassword);
    console.log(isLoggedIn);
}