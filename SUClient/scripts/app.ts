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


                    const postTags = document.createElement('p');
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

    fetch(`${baseURL}/Post/Questions` + '?postId=' + postId, {
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

            const postTags = document.createElement('p');
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
                contentBody.setAttribute("id", "contentBody");

                const commentId = document.createElement('a');
                commentId.setAttribute("id", "commentId");
                commentId.textContent = item.commentId;
                commentId.style.visibility = 'hidden';

                const commentContext = document.createElement('p');
                commentContext.textContent = item.commentContent;
                commentContext.setAttribute("id", "commentContext");

                const userCard = document.createElement('div');
                userCard.classList.add('userCard');

                const userHref = document.createElement('a');
                userHref.href = `/Home/GoToUserProfile?username=${encodeURIComponent(item.commenterName.trim())}`;
                userHref.textContent = item.commenterName;
                userHref.setAttribute("id", "userHref");

                const commentDate = document.createElement('div');
                commentDate.textContent = item.commentDate;

                const showcommenterbutton = document.createElement("button");
                showcommenterbutton.setAttribute("id", "showcommenterbutton");
                showcommenterbutton.textContent = "show2";

                const createEditButton = (): HTMLButtonElement => {
                    const editButton = document.createElement("button");

                    editButton.textContent = "Edit";
                    editButton.classList.add("edit-button");

                    // Assuming contentBody is accessible within this context
                    const useremail = localStorage.getItem('userEmail');
                    const commenterNameElement = contentBody.querySelector('#userHref') as HTMLAnchorElement;
                    const commenterNames = localStorage.getItem('userEmail').replace(/\\|"/g, '');

                    if (contentBody) {
                        const commenterName = commenterNameElement.textContent.trim();
                        if (commenterName === commenterNames) {

                            editButton.addEventListener("click", () => {
                                editButton.style.visibility = 'hidden';
                                var varComment;
                                var newComment;
                                const commentIdElement = contentBody.querySelector('#commentId'); // Use '#' for ID

                                const commentElement = contentBody.querySelector('#commentContext'); // Use '#' for ID
                                varComment = commentElement.textContent.trim();
                                //get comment id
                                const varId = commentIdElement.textContent?.trim();
                                //get the comment
                                varComment = commentElement.textContent?.trim();

                                //input to new edited text when clicked on edit
                                const newEditCommentElement = document.createElement("input");
                                newEditCommentElement.setAttribute("id", "newEditCommentElement");

                                //to save the edited comment we append a button
                                const saveEditedComment = document.createElement("button");
                                saveEditedComment.textContent = "Save";

                                //replace the commentElement with newEditCommentElement
                                newEditCommentElement.value = commentElement.textContent.trim();
                                commentElement.parentNode.replaceChild(newEditCommentElement, commentElement);

                                contentBody.appendChild(newEditCommentElement);
                                contentBody.appendChild(saveEditedComment);
                                console.log(`${varId} chosen`);
                                console.log(`${varComment} chosen`);
                                console.log(`${commenterName}'s comment chosen'`);

                                const cancelEdit = document.createElement("button");
                                cancelEdit.textContent = "Cancel";
                                contentBody.appendChild(cancelEdit);

                                if (saveEditedComment) {
                                    if (cancelEdit) {
                                    cancelEdit.addEventListener("click", () => {
                                        newEditCommentElement.parentNode.replaceChild(commentElement, newEditCommentElement);
                                        contentBody.appendChild(editButton);
                                        editButton.style.visibility ='visible';
                                        saveEditedComment.remove();
                                        cancelEdit.remove();
                                    });
                                    }
                                    saveEditedComment.addEventListener('click', () => {
                                        // Get the value of the input when the "Save" button is clicked
                                        const newestelement = contentBody.querySelector("#newEditCommentElement") as HTMLInputElement;
                                        const newCommentValue = newestelement.value.trim();

                                        const editedComment = {
                                            postId: varId,
                                            commenterName: commenterName,
                                            commentContent: newCommentValue, // Use the updated value here
                                        };

                                        fetch(`${baseURL}/Comment/EditComment`, {
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
                                                    let postContent = document.getElementById("post-content");
                                                    postContent.innerHTML = '';
                                                    commentContent.innerHTML = '';
                                                    GetQuestionPostAndComments();

                                                } else {
                                                    throw new Error(response.statusText);
                                                }
                                                console.log(`${newCommentValue} saved`);
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
                const editButton = createEditButton();
                contentBody.appendChild(editButton);
                commentContent.appendChild(contentBody);

            });
        })
        .catch(function (error) {
            console.error('Error occurred while fetching comments:', error);
        });
}
function isNullOrEmpty(input: string | null): boolean {
    return input === null || input === '';
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
    if (!isNullOrEmpty(commentreq.commentContent) || !isNullOrEmpty(commentreq.commentContent)) {
    fetch(`${baseURL}/Comment/AddComment`, requestOptions)
        .then(response => {
            if (response.ok) {
                PostSpecificComments();
                window.location.reload();
                console.log('succesfull');
            }
            else {
                showNonBlockingPopup("Posting was not successfull!", 2000);
            }
        })
    }
    else {
        showNonBlockingPopup("Posting was not successfull!", 2000);
    }
}
function doboth() {
    GetQuestionPostAndComments();
}
const commentInput = document.getElementById("answer-input") as HTMLInputElement;
const postAnswerButton = document.getElementById("postAnswerButton") as HTMLButtonElement;

if (commentInput) {
    // Check the input value on page load
    if (isNullOrEmpty(commentInput.value)) {
        postAnswerButton.disabled = true;
    }

    // Add an input event listener to handle changes
    commentInput.addEventListener("input", () => {
        if (isNullOrEmpty(commentInput.value)) {
            postAnswerButton.disabled = true;
        } else {
            postAnswerButton.disabled = false;
        }
    });
}

