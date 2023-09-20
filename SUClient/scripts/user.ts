function AuthUserAutomatically() {
    const userToken = localStorage.getItem('usertoken') || undefined;
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
    showLoadingScreen();
    const username = urlParams.get('username');
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
                contentBody.classList.add('content-body'); // Add a class to contentBody

                const commentId = document.createElement('a');
                commentId.classList.add('comment-id'); // Add a class to commentId
                commentId.style.visibility = 'hidden';
                commentId.setAttribute('id', 'commentId');
                commentId.textContent = item.commentId;

                const postHref = document.createElement('a');
                postHref.classList.add('post-href'); // Add a class to postHref
                postHref.href = `/Home/Questions?postId=${encodeURIComponent(item.postId)}`;
                postHref.textContent = "View Post";

                

                const commenterName = document.createElement('p');
                commenterName.classList.add('commenter-name'); // Add a class to commenterName
                commenterName.textContent = item.commenterName;

                const commentDate = document.createElement('p');
                commentDate.classList.add('comment-date'); // Add a class to commentDate
                commentDate.textContent = item.commentDate;

                const commentHeader = document.createElement('header');
                commentHeader.classList.add('comment-header'); // Add a class to commentHeader
                commentHeader.textContent = item.header;

                const mainContentItem = document.createElement('h2');
                mainContentItem.classList.add('main-content'); // Add a class to mainContentItem
                mainContentItem.textContent = item.mainContent;

                const posterName = document.createElement("p");
                posterName.classList.add('poster-name'); // Add a class to posterName
                posterName.textContent = item.posterName;

                const tags = document.createElement("p");
                tags.classList.add('tags'); // Add a class to tags
                tags.textContent = `Tags: ` + item.tags;

                const deletecommentButton = document.createElement('button');
                deletecommentButton.setAttribute('id', 'deletecommentbutton');
                deletecommentButton.classList.add('deletecomment-button');
                deletecommentButton.textContent = "Delete Comment";

                contentBody.appendChild(commentId);
                contentBody.appendChild(postHref);
                contentBody.appendChild(commenterName);
                contentBody.appendChild(commentDate);
                contentBody.appendChild(commentHeader);
                contentBody.appendChild(mainContentItem); // Use the new variable here
                contentBody.appendChild(posterName);
                contentBody.appendChild(tags);
                contentBody.appendChild(deletecommentButton);

                mainContent.appendChild(contentBody); // Append contentBody to mainContent
                hideLoadingScreen();
            })

        })
    
}

function DeleteComment(commentId: number) {
    var userToken = localStorage.getItem("usertoken");
    if (!userToken) {
        console.error("User token not found in localStorage");
        return;
    }
    if (isNaN(commentId)) {
        console.error("Invalid commentId:", commentId);
        return;
    }

    console.log(commentId + userToken);
}
document.addEventListener("DOMContentLoaded", function () {
    const deletecommentbutton = document.getElementById('deletecommentbutton');
    if (deletecommentbutton) {
        const contentBody = document.getElementById("contentBody");
        const commentIdElement = contentBody?.querySelector('#commentId') as HTMLParagraphElement;

        if (commentIdElement) {
            var commentId = parseInt(commentIdElement.textContent || '0', 10);
            deletecommentbutton.addEventListener("click", () => {
                DeleteComment(commentId);
            });
        } else {
            console.error("Comment ID element not found");
        }
    } else {
        console.error("Delete comment button not found");
    }
});
