var baseURL = 'http://localhost:5226/api';
var urlParams = new URLSearchParams(window.location.search);
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
                posthref.href = "/Home/Questions?postId=".concat(encodeURIComponent(item.id));
                posthref.textContent = "Link to Question";
                var userCard = document.createElement('div');
                userCard.classList.add('userCard');
                var userHref = document.createElement('a');
                userHref.href = "/Home/GoToUserProfile?username=".concat(encodeURIComponent(item.posterName.trim()));
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
function GetQuestionPostAndComments() {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get('postId');
    var postContent = document.getElementById("post-content");
    var commentContent = document.getElementById("comment-content");
    fetch("".concat(baseURL, "/Post/questions") + '?postId=' + postId, {
        method: 'GET',
    })
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (item) {
        //console.log('Received question post:', item);
        //console.log('Received data:', item); // Debugging line
        var questionSummary = document.createElement('div');
        questionSummary.setAttribute('id', 'question-summary-' + item.id);
        var contentTitle = document.createElement('h3');
        contentTitle.textContent = item.header;
        var contentBody = document.createElement('div');
        contentBody.textContent = item.mainContent;
        var userCard = document.createElement('div');
        userCard.classList.add('userCard');
        var userHref = document.createElement('a');
        userHref.href = "/Home/GoToUserProfile?username=".concat(encodeURIComponent(item.posterName.trim()));
        userHref.textContent = item.posterName;
        var postDate = document.createElement('p');
        postDate.textContent = item.postDate;
        questionSummary.classList.add('questionSummary');
        contentTitle.classList.add('contentTitle');
        contentBody.classList.add('contentBody');
        userCard.classList.add('userCard');
        userHref.classList.add('userHref');
        postDate.classList.add('postDate');
        questionSummary.appendChild(contentTitle);
        questionSummary.appendChild(contentBody);
        questionSummary.appendChild(userCard);
        userCard.appendChild(userHref);
        questionSummary.appendChild(postDate);
        postContent.appendChild(questionSummary);
        PostSpecificComments();
    })
        .catch(function (error) {
        console.error('Error occurred while fetching question post:', error);
    });
}
function PostSpecificComments() {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get('postId');
    var commentContent = document.getElementById("comment-content");
    fetch("".concat(baseURL, "/Comment/PostSpecificComments") + '?postId=' + postId, {
        method: 'GET',
    })
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (data) {
        data.forEach(function (item) {
            /*console.log('Received comment:', item);*/
            var contentBody = document.createElement('div');
            contentBody.textContent = item.commentContent;
            var userCard = document.createElement('div');
            userCard.classList.add('userCard');
            var userHref = document.createElement('a');
            userHref.href = "/Home/GoToUserProfile?username=".concat(encodeURIComponent(item.commenterName.trim()));
            userHref.textContent = item.commenterName;
            var commentDate = document.createElement('div');
            commentDate.textContent = item.commentDate;
            userCard.appendChild(userHref);
            commentContent.appendChild(contentBody);
            commentContent.appendChild(userCard);
            commentContent.appendChild(commentDate);
        });
    })
        .catch(function (error) {
        console.error('Error occurred while fetching comments:', error);
    });
}
function PostComment() {
    var postId = urlParams.get('postId');
    var commentInput = document.getElementById("answer-input");
    var commenterName = localStorage.getItem('userEmail').replace(/\\|"/g, '');
    var commentreq = {
        postId: postId,
        commenterName: commenterName,
        commentContent: commentInput.value
    };
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(commentreq),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch("".concat(baseURL, "/Comment/AddComment"), requestOptions)
        .then(function (response) {
        if (response.ok) {
            /*PostSpecificComments();*/
            window.location.reload();
            console.log('succesfull');
        }
        else {
            showNonBlockingPopup("Posting was not successfull!", 2000);
        }
    });
}
function doboth() {
    GetQuestionPostAndComments();
}
//# sourceMappingURL=app.js.map