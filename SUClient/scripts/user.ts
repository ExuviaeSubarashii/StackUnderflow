class User {
    email: string;
    password: string;
}

let user: User = new User();
function AuthUserAutomatically() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn == "true") {
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
                    // If login is not successful, redirect to login page
                    window.location.href = '/Home/LoginPage';
                }
                else {
                    // If login is successful, hide the buttons

                    document.getElementById('loginpagebutton').style.display = 'none';
                    document.getElementById('registerpagebutton').style.display = 'none';
                    console.log('Successful login');
                }
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

    fetch(`${baseURL}/User/Login`, requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
                localStorage.setItem('userEmail', JSON.stringify(user.userEmail));
                localStorage.setItem('userPassword', JSON.stringify(user.password));
                localStorage.setItem('isLoggedIn', "true");
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            localStorage.setItem('username', JSON.stringify(data.Username));
        })
        .catch(error => {
            console.error('Error occurred while sending the request:', error);
        });

}
function GoToAskPage() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
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
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === "false") {
        window.location.href = '/Home/LoginPage';
    }
    else{
        window.location.href = '';
    }
}
function ShowLocalStorage() {
    const userEmail     = localStorage.getItem('userEmail');
    const userName      = localStorage.getItem('userName');
    const userPassword  = localStorage.getItem('userPassword');
    const isLoggedIn    = localStorage.getItem('isLoggedIn');


    console.log("userEmail   "+userEmail)
    console.log("userName    "+userName)
    console.log("userPassword "+userPassword)
    console.log("isLoggedIn  "+isLoggedIn)

}


