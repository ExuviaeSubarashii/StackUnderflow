class User {
    email: string;
    password: string;
}

let user: User = new User();
function AuthUserAutomatically() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');

    const user = {
        userEmail: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
        password: localStorage.getItem('userPassword').replace(/\\|"/g, '')
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
            if (!response.ok) {
                window.location.href = '/Home/LoginPage';

            }
            else {
                console.log('succesfull');
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

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('password');

    SetCookie("amogus", userEmail);
}
function amogus2() {
    let amogusta = getCookie("amogus");
    console.log(amogusta);
}
function SetCookie(cookiename: string, value: string) {
    const cookieValue = `${cookiename}=${value}; path=/`;
    document.cookie = cookieValue;
}

function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/;`;
}

