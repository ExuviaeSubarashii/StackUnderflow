// Function for user login
function Login() {
    // Get user input fields
    var userEmailInput = document.getElementById('userEmail');
    var userPasswordInput = document.getElementById('password');
    // Create user object with trimmed input values
    var user = {
        userEmail: userEmailInput.value.trim(),
        password: userPasswordInput.value.trim()
    };
    // Set up fetch request options
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Send login request
    fetch("".concat(baseURL, "/User/Login2"), requestOptions)
        .then(function (response) {
        if (response.ok) {
            return response.text(); // Parse response as text
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (sessionToken) {
        document.cookie = "sessionToken=".concat(sessionToken, "; path=/; HttpOnly; Secure");
        console.log('Session token:', sessionToken);
        localStorage.setItem('usertoken', sessionToken);
        window.location.href = '/';
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
function GetSessionToken() {
    var token = localStorage.getItem('usertoken');
    console.log(token);
    return token;
}
//# sourceMappingURL=user2.js.map