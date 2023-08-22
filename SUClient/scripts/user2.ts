// Function for user login
function Login() {
    // Get user input fields
    const userEmailInput = document.getElementById('userEmail') as HTMLInputElement;
    const userPasswordInput = document.getElementById('password') as HTMLInputElement;

    // Create user object with trimmed input values
    const user = {
        userEmail: userEmailInput.value.trim(),
        password: userPasswordInput.value.trim()
    };

    // Set up fetch request options
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Send login request
    fetch(`${baseURL}/User/Login2`, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.text(); // Parse response as text
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(sessionToken => {
            document.cookie = `sessionToken=${sessionToken}; path=/; HttpOnly; Secure`;
            console.log('Session token:', sessionToken);
            localStorage.setItem('usertoken', sessionToken);
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error occurred while sending the request:', error);
        });
}
function GetSessionToken() {
    const token = localStorage.getItem('usertoken');
    console.log(token)
    return token;
}

