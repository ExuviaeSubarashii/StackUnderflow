function AuthUserAutomatically() {
    const userToken = localStorage.getItem('usertoken')|| undefined;
    if (userToken !== undefined) {
        const user = {
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
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userName');
    GoToThatPage("");
}
function ShowLocalStorage() {
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
function ChangePassword() {
    //const userEmail = document.getElementById('userEmail') as HTMLInputElement;
    const userToken = localStorage.getItem('usertoken');
    const password = document.getElementById('password') as HTMLInputElement;
    const passwordAgain = document.getElementById('passwordAgain') as HTMLInputElement;

    const registeration = {
        Token: userToken,
        /*userEmail: userEmail.value,*/
        newPassword: password.value,
        passwordAgain: passwordAgain.value
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(registeration),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (registeration.newPassword === registeration.passwordAgain) {
        fetch(`${baseURL}/User/ChangePassword`, requestOptions)
            .then(response => {
                if (response.ok) {
                    logout();
                    GoToThatPage('LoginPage');
                    return response.json();
                }
                else {
                    throw new Error(response.statusText);
                }
            })
            //.then(data => {
            //    localStorage.setItem('usertoken', data.token);
            //})
            //.catch(error => {
            //    console.error('Error occurred while sending the request:', error);
            //});
    }

}
function GoToMyProfile() {
    GoToThatPage('GoToUserProfile?username=' + localStorage.getItem('userName'));
}
function GetUserComments() {
    const username = urlParams.get('username');
    console.log(username.trim());
    const mainContent = document.getElementById('main-content');
    fetch(`${baseURL}/User/GetUserComments` + '?username=' + username, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            data.forEach(item => {
                const contentBody = document.createElement('div');
                contentBody.setAttribute("id", "contentBody");

                const commentId = document.createElement('a');
                commentId.setAttribute("id", "commentId");
                commentId.textContent = item.commentId;
                commentId.style.visibility = 'hidden';

                const commentContext = document.createElement('p');
                commentContext.textContent = item.commentContent;
                commentContext.setAttribute("id", "commentContext");

                const postHref = document.createElement('a');
                postHref.href = `/Home/Questions?postId=${encodeURIComponent(item.postId.trim())}`;
                postHref.setAttribute("id", "postHref");

                const gotopostButton = document.createElement('button');
                gotopostButton.setAttribute('id', "gotopostButton");



                const commentDate = document.createElement('div');
                commentDate.textContent = item.commentDate;
            })
        })
}
