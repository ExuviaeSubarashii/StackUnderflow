const baseURL = 'http://localhost:5226/api';
const urlParams = new URLSearchParams(window.location.search);

function GetAllQuestions() {
    fetch(`${baseURL}/Post/GetAllPosts`, {
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
                const questions = document.getElementById('questions') as HTMLDivElement;

                data.forEach(item => {
                    const questionSummary = document.createElement('div');

                    questionSummary.setAttribute('id', 'question-summary-' + item.id);

                    const contentTitle = document.createElement('h3');
                    contentTitle.textContent = item.header;

                    const contentBody = document.createElement('div');
                    contentBody.textContent = item.mainContent;

                    const posthref = document.createElement('a');
                    posthref.href = `/Home/Questions?postId=${encodeURIComponent(item.id)}`;
                    posthref.textContent = "Link to Question";

                    const userCard = document.createElement('div');
                    userCard.classList.add('userCard');

                    const userHref = document.createElement('a');

                    userHref.href = `/Home/GoToUserProfile?username=${encodeURIComponent(item.posterName.trim())}`;
                    userHref.textContent = item.posterName;

                    const postDate = document.createElement('p');

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

                    questions.appendChild(questionSummary);
                });
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}
function GetUserDetails() {

    const username = urlParams.get('username');

    let userContent = document.getElementById("user-content") as HTMLDivElement;
    fetch(`${baseURL}/User/GoToUserProfile` + '?username=' + username, {
        method: 'GET',
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                return response.json(); // Parse the response as JSON
            } else {
                // Request failed
                throw new Error(response.statusText);
            }
        })
        .then(function (data) {
            console.log('Received data:', data); // Debugging line

            let userName = document.createElement("div");
            userName.textContent = data.userName;
            let joinDate = document.createElement("div");
            joinDate.textContent = data.registerDate;

            userContent.appendChild(userName);
            userContent.appendChild(joinDate);
        })
        .catch(function (error) {
            console.error('Error occurred while sending the request:', error);
        });
}
function GetQuestionPostAndComments() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    let postContent = document.getElementById("post-content");
    let commentContent = document.getElementById("comment-content");

    fetch(`${baseURL}/Post/questions` + '?postId=' + postId, {
        method: 'GET',
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(function (item) {
            //console.log('Received question post:', item);

            //console.log('Received data:', item); // Debugging line

            const questionSummary = document.createElement('div');

            questionSummary.setAttribute('id', 'question-summary-' + item.id);

            const contentTitle = document.createElement('h3');
            contentTitle.textContent = item.header;

            const contentBody = document.createElement('div');
            contentBody.textContent = item.mainContent;

            const userCard = document.createElement('div');
            userCard.classList.add('userCard');

            const userHref = document.createElement('a');

            userHref.href = `/Home/GoToUserProfile?username=${encodeURIComponent(item.posterName.trim())}`;
            userHref.textContent = item.posterName;

            const postDate = document.createElement('p');
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
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    let commentContent = document.getElementById("comment-content");

    fetch(`${baseURL}/Comment/PostSpecificComments` + '?postId=' + postId, {
        method: 'GET',
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(function (data) {
            data.forEach(item => {
                /*console.log('Received comment:', item);*/

                const contentBody = document.createElement('div');
                contentBody.textContent = item.commentContent;

                const userCard = document.createElement('div');
                userCard.classList.add('userCard');

                const userHref = document.createElement('a');
                userHref.href = `/Home/GoToUserProfile?username=${encodeURIComponent(item.commenterName.trim())}`;
                userHref.textContent = item.commenterName;

                const commentDate = document.createElement('div');
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
    const postId = urlParams.get('postId');
    const commentInput = document.getElementById("answer-input") as HTMLInputElement;
    const commenterName = localStorage.getItem('userEmail').replace(/\\|"/g, '');
    const commentreq = {
        postId: postId,
        commenterName: commenterName,
        commentContent: commentInput.value
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(commentreq),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(`${baseURL}/Comment/AddComment`, requestOptions)
        .then(response => {
            if (response.ok) {
                /*PostSpecificComments();*/
                window.location.reload();
                console.log('succesfull');
            }
            else {
                showNonBlockingPopup("Posting was not successfull!", 2000);
            }
        })
}
function doboth() {
    GetQuestionPostAndComments();
}

