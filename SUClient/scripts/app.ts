const baseURL = 'http://localhost:5226/api';

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
                    questionSummary.classList.add('questionSummary');
                    questionSummary.setAttribute('id', 'question-summary-' + item.id);

                    const contentTitle = document.createElement('h3');
                    contentTitle.classList.add('contentTitle');
                    contentTitle.textContent = item.header;

                    const contentBody = document.createElement('div');
                    contentBody.classList.add('contentBody');
                    contentBody.textContent = item.mainContent;

                    const posthref = document.createElement('a');
                    posthref.href = `${baseURL}/questions/${item.id}`;
                    posthref.textContent = "Link to Question";

                    const userCard = document.createElement('div');
                    userCard.classList.add('userCard');

                    const userHref = document.createElement('a');
                    userHref.classList.add('userHref');
                    userHref.href = `${baseURL}/users/${item.posterName}`;
                    userHref.textContent = item.posterName;

                    const postDate = document.createElement('p');
                    postDate.classList.add('postDate');
                    postDate.textContent = item.postDate;

                    questionSummary.appendChild(contentTitle);
                    questionSummary.appendChild(contentBody);
                    questionSummary.appendChild(posthref);
                    questionSummary.appendChild(userCard); // Remove this line if userCard remains empty
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
