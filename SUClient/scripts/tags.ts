async function GetTags() {
    var tagbody=document.getElementById('tagbody');
    await fetch(`${baseURL}/Tags/GetTags`,{
        method:'GET'
    })
    .then(response=>{
        if(response.ok){
            return response.json();
        }
    })
    .then(data=>{
        data.forEach(tag=>{
            const contentBody=document.createElement('div');
            contentBody.setAttribute("id", "contentBody");
            contentBody.classList.add('content-body');

            const tagName=document.createElement("a");
            tagName.setAttribute("id", "tagName");
            tagName.classList.add('tagName');
            tagName.textContent = tag.tagName.replace(/%23/g, '#');
            //tagName.href = `/Home/Tagged?tagName=${encodeURIComponent(tag.tagName)}`;
            //tagName.href = `/Home/Tagged?tagName=${encodeURIComponent(tag.tagName.trim().replace(/ /g, '%20'))}`;
            tagName.href = `/Home/Tagged?tagName=${encodeURIComponent(tag.tagName.trim())}`;

            

            const tagAmount=document.createElement("label");
            tagAmount.setAttribute("id", "tagAmount");
            tagAmount.classList.add('tagAmount');
            tagAmount.textContent=tag.tagAmount;

            contentBody.append(tagName);
            contentBody.append(tagAmount);
            tagbody.appendChild(contentBody);
        })
    })
}
//get the name from url
async function Tagged() {
    const urlParams = new URLSearchParams(window.location.search);
    const tagName = urlParams.get('tagName');
/*   GoToThatPage('Tagged');*/
   await fetch(`${baseURL}/Tags/GetTagged` + '?tagName=' + tagName, {
       method:'GET',
   })
       .then(function (response) {
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
                   postTags.textContent = item.tags.replace(/%23/g, '#');

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
