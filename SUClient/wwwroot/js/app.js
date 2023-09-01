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
                var postTags = document.createElement('p');
                postTags.textContent = item.tags;
                questionSummary.classList.add('questionSummary');
                contentTitle.classList.add('contentTitle');
                contentBody.classList.add('contentBody');
                posthref.classList.add('posthref');
                userCard.classList.add('userCard');
                userHref.classList.add('userHref');
                postDate.classList.add('postDate');
                postTags.classList.add('postTags');
                questionSummary.appendChild(contentTitle);
                questionSummary.appendChild(contentBody);
                questionSummary.appendChild(posthref);
                questionSummary.appendChild(userCard);
                userCard.appendChild(userHref);
                questionSummary.appendChild(postDate);
                questionSummary.appendChild(postTags);
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
    fetch("".concat(baseURL, "/Post/Questions") + '?postId=' + postId, {
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
        var postTags = document.createElement('p');
        postTags.textContent = item.tags;
        questionSummary.classList.add('questionSummary');
        contentTitle.classList.add('contentTitle');
        contentBody.classList.add('contentBody');
        userCard.classList.add('userCard');
        userHref.classList.add('userHref');
        postDate.classList.add('postDate');
        postTags.classList.add('postTags');
        questionSummary.appendChild(contentTitle);
        questionSummary.appendChild(contentBody);
        questionSummary.appendChild(userCard);
        userCard.appendChild(userHref);
        questionSummary.appendChild(postDate);
        questionSummary.appendChild(postTags);
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
            contentBody.setAttribute("id", "contentBody");
            var commentId = document.createElement('a');
            commentId.setAttribute("id", "commentId");
            commentId.textContent = item.commentId;
            commentId.style.visibility = 'hidden';
            var commentContext = document.createElement('p');
            commentContext.textContent = item.commentContent;
            commentContext.setAttribute("id", "commentContext");
            var userCard = document.createElement('div');
            userCard.classList.add('userCard');
            var userHref = document.createElement('a');
            userHref.href = "/Home/GoToUserProfile?username=".concat(encodeURIComponent(item.commenterName.trim()));
            userHref.textContent = item.commenterName;
            userHref.setAttribute("id", "userHref");
            var commentDate = document.createElement('div');
            commentDate.textContent = item.commentDate;
            var showcommenterbutton = document.createElement("button");
            showcommenterbutton.setAttribute("id", "showcommenterbutton");
            showcommenterbutton.textContent = "show2";
            var createEditButton = function () {
                var editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.classList.add("edit-button");
                // Assuming contentBody is accessible within this context
                var useremail = localStorage.getItem('userEmail');
                var commenterNameElement = contentBody.querySelector('#userHref');
                var commenterNames = localStorage.getItem('userEmail').replace(/\\|"/g, '');
                if (contentBody) {
                    var commenterName_1 = commenterNameElement.textContent.trim();
                    if (commenterName_1 === commenterNames) {
                        editButton.addEventListener("click", function () {
                            var _a, _b;
                            editButton.style.visibility = 'hidden';
                            var varComment;
                            var newComment;
                            var commentIdElement = contentBody.querySelector('#commentId'); // Use '#' for ID
                            var commentElement = contentBody.querySelector('#commentContext'); // Use '#' for ID
                            varComment = commentElement.textContent.trim();
                            //get comment id
                            var varId = (_a = commentIdElement.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                            //get the comment
                            varComment = (_b = commentElement.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                            //input to new edited text when clicked on edit
                            var newEditCommentElement = document.createElement("input");
                            newEditCommentElement.setAttribute("id", "newEditCommentElement");
                            //to save the edited comment we append a button
                            var saveEditedComment = document.createElement("button");
                            saveEditedComment.textContent = "Save";
                            //replace the commentElement with newEditCommentElement
                            newEditCommentElement.value = commentElement.textContent.trim();
                            commentElement.parentNode.replaceChild(newEditCommentElement, commentElement);
                            contentBody.appendChild(newEditCommentElement);
                            contentBody.appendChild(saveEditedComment);
                            console.log("".concat(varId, " chosen"));
                            console.log("".concat(varComment, " chosen"));
                            console.log("".concat(commenterName_1, "'s comment chosen'"));
                            var cancelEdit = document.createElement("button");
                            cancelEdit.textContent = "Cancel";
                            contentBody.appendChild(cancelEdit);
                            if (saveEditedComment) {
                                if (cancelEdit) {
                                    cancelEdit.addEventListener("click", function () {
                                        newEditCommentElement.parentNode.replaceChild(commentElement, newEditCommentElement);
                                        contentBody.appendChild(editButton);
                                        editButton.style.visibility = 'visible';
                                        saveEditedComment.remove();
                                        cancelEdit.remove();
                                    });
                                }
                                saveEditedComment.addEventListener('click', function () {
                                    // Get the value of the input when the "Save" button is clicked
                                    var newestelement = contentBody.querySelector("#newEditCommentElement");
                                    var newCommentValue = newestelement.value.trim();
                                    var editedComment = {
                                        postId: varId,
                                        commenterName: commenterName_1,
                                        commentContent: newCommentValue, // Use the updated value here
                                    };
                                    fetch("".concat(baseURL, "/Comment/EditComment"), {
                                        method: 'POST',
                                        body: JSON.stringify(editedComment),
                                        headers: {
                                            'Content-Type': 'application/json', // Set the content type to JSON
                                        },
                                    })
                                        .then(function (response) {
                                        if (response.ok) {
                                            newEditCommentElement.parentNode.replaceChild(commentElement, newEditCommentElement);
                                            saveEditedComment.remove();
                                            var postContent = document.getElementById("post-content");
                                            postContent.innerHTML = '';
                                            commentContent.innerHTML = '';
                                            GetQuestionPostAndComments();
                                        }
                                        else {
                                            throw new Error(response.statusText);
                                        }
                                        console.log("".concat(newCommentValue, " saved"));
                                    });
                                });
                            }
                        });
                    }
                }
                return editButton;
            };
            userCard.appendChild(userHref);
            contentBody.appendChild(commentContext);
            contentBody.appendChild(userCard);
            contentBody.appendChild(commentDate);
            contentBody.appendChild(commentId);
            var editButton = createEditButton();
            contentBody.appendChild(editButton);
            commentContent.appendChild(contentBody);
        });
    })
        .catch(function (error) {
        console.error('Error occurred while fetching comments:', error);
    });
}
function isNullOrEmpty(input) {
    return input === null || input === '';
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
    if (!isNullOrEmpty(commentreq.commentContent) || !isNullOrEmpty(commentreq.commentContent)) {
        fetch("".concat(baseURL, "/Comment/AddComment"), requestOptions)
            .then(function (response) {
            if (response.ok) {
                PostSpecificComments();
                window.location.reload();
                console.log('succesfull');
            }
            else {
                showNonBlockingPopup("Posting was not successfull!", 2000);
            }
        });
    }
    else {
        showNonBlockingPopup("Posting was not successfull!", 2000);
    }
}
function doboth() {
    GetQuestionPostAndComments();
}
var commentInput = document.getElementById("answer-input");
var postAnswerButton = document.getElementById("postAnswerButton");
if (commentInput) {
    // Check the input value on page load
    if (isNullOrEmpty(commentInput.value)) {
        postAnswerButton.disabled = true;
    }
    // Add an input event listener to handle changes
    commentInput.addEventListener("input", function () {
        if (isNullOrEmpty(commentInput.value)) {
            postAnswerButton.disabled = true;
        }
        else {
            postAnswerButton.disabled = false;
        }
    });
}
//# sourceMappingURL=app.js.map