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
                questionSummary.classList.add('questionSummary');
                questionSummary.setAttribute('id', 'question-summary-' + item.id);
                var contentTitle = document.createElement('h3');
                contentTitle.classList.add('contentTitle');
                contentTitle.textContent = item.header;
                var contentBody = document.createElement('div');
                contentBody.classList.add('contentBody');
                contentBody.textContent = item.mainContent;
                var posthref = document.createElement('a');
                posthref.href = "".concat(baseURL, "/questions/").concat(item.id);
                posthref.textContent = "Link to Question";
                var userCard = document.createElement('div');
                userCard.classList.add('userCard');
                var userHref = document.createElement('a');
                userHref.classList.add('userHref');
                userHref.href = "".concat(baseURL, "/users/").concat(item.posterName);
                userHref.textContent = item.posterName;
                var postDate = document.createElement('p');
                postDate.classList.add('postDate');
                postDate.textContent = item.postDate;
                questionSummary.appendChild(contentTitle);
                questionSummary.appendChild(contentBody);
                questionSummary.appendChild(posthref);
                questionSummary.appendChild(userCard); // Remove this line if userCard remains empty
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
//# sourceMappingURL=app.js.map