var baseURL = 'http://localhost:5226/api';
function GetAllQuestions() {
    fetch("".concat(baseURL, "/Post/GetAllPosts"), {
        method: 'GET'
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(function (data) {
        if (data !== null) {
            var questions_1 = document.getElementById('questions');
            data.forEach(function (item) {
                var questionSummary = document.createElement('div');
                questionSummary.setAttribute('id', 'question-summary-' + item.id);
                var contentTitle = document.createElement('h3');
                contentTitle.textContent = item.header;
                var contentBody = document.createElement('div');
                contentBody.textContent = item.mainContent;
                var posthref = document.createElement('a');
                posthref.href = "".concat(baseURL, "/questions/").concat(item.id);
                posthref.textContent = "Link to Question";
                var userCard = document.createElement('div');
                userCard.classList.add('userCard');
                var userHref = document.createElement('a');
                userHref.href = "/Home/GoToUserProfile?username=".concat(encodeURIComponent(item.posterName));
                userHref.textContent = item.posterName;
                var postDate = document.createElement('p');
                postDate.textContent = item.postDate;
                questionSummary.classList.add('questionSummary');
                contentTitle.classList.add('contentTitle');
                contentBody.classList.add('contentBody');
                posthref.classList.add('posthref');
                userCard.classList.add('userCard');
                userHref.classList.add('userHref');
                postDate.classList.add('postDate');
                questionSummary.appendChild(contentTitle);
                questionSummary.appendChild(contentBody);
                questionSummary.appendChild(posthref);
                questionSummary.appendChild(userCard);
                userCard.appendChild(userHref);
                questionSummary.appendChild(postDate);
                questions_1.appendChild(questionSummary);
            });
        }
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
}
function GetUserDetails() {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    var userContent = document.getElementById("user-content");
    fetch("".concat(baseURL, "/User/GoToUserProfile") + '?username=' + username, {
        method: 'GET',
    })
        .then(function (response) {
        if (response.ok) {
            // Request was successful
            return response.json(); // Parse the response as JSON
        }
        else {
            // Request failed
            throw new Error(response.statusText);
        }
    })
        .then(function (data) {
        console.log('Received data:', data); // Debugging line
        var userName = document.createElement("div");
        userName.textContent = data.userName;
        var joinDate = document.createElement("div");
        joinDate.textContent = data.registerDate;
        userContent.appendChild(userName);
        userContent.appendChild(joinDate);
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
//# sourceMappingURL=app.js.map