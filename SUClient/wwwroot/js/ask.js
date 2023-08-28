var header = document.getElementById("header");
var tags = document.getElementById("tags");
var dopost = document.getElementById("dopost");
var heading = document.getElementById("button-heading");
var bold = document.getElementById("button-bold");
var italic = document.getElementById("button-italic");
var codealt = document.getElementById("button-codealt");
var link = document.getElementById("button-link");
var textBody = document.getElementById("body");
var headingText = "#";
var boldText = "****";
var italicText = "**";
var codeAltText = "``";
var linkText = "[text](link)";
function appendText(format) {
    textBody.value += format;
}
function PostQuestion() {
    var newPost = {
        Header: header.value || null || "",
        MainContent: textBody.value,
        PosterName: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
        tags: tags.value || "" || null
    };
    if (!isNullOrEmpty(newPost.MainContent) && !isNullOrEmpty(newPost.Header)) {
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("".concat(baseURL, "/Post/NewPost"), requestOptions)
            .then(function (response) {
            if (response.ok) {
                window.location.href = "/Home/Questions";
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
function showNonBlockingPopup(message, duration) {
    var popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = message;
    popup.style.display = "block";
    document.body.appendChild(popup);
    setTimeout(function () {
        popup.style.display = "none";
        document.body.removeChild(popup);
    }, duration);
}
var Tags = ['python', 'java', 'c++', 'javascript', 'ruby', 'php', 'swift', 'go', 'rust', 'c#'];
var tagInputElement = document.getElementById('tags');
var suggestions = document.getElementById("suggestions");
var tagSuggestions = document.createElement('div');
tagSuggestions.id = 'tag-suggestions';
function createTagSuggestion(tagName) {
    var jsTagSuggestion = document.createElement('div');
    var langTitle = document.createElement('p');
    langTitle.textContent = tagName;
    jsTagSuggestion.appendChild(langTitle);
    tagSuggestions.appendChild(jsTagSuggestion);
    suggestions.appendChild(tagSuggestions);
}
function displayTagSuggestions() {
    var langName = tagInputElement.value.toLowerCase();
    // Clear existing tag suggestions
    tagSuggestions.innerHTML = '';
    Tags.forEach(function (tag) {
        if (tag.toLowerCase().startsWith(langName) == true) {
            createTagSuggestion(tag);
        }
        if (tag == "") {
            createTagSuggestion("");
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    var tagInputElement = document.getElementById('tags');
    if (tagInputElement) {
        tagInputElement.addEventListener('input', displayTagSuggestions, false);
        heading.addEventListener("click", function () { return appendText(headingText); }, false);
        bold.addEventListener("click", function () { return appendText(boldText); }, false);
        italic.addEventListener("click", function () { return appendText(italicText); }, false);
        codealt.addEventListener("click", function () { return appendText(codeAltText); }, false);
        link.addEventListener("click", function () { return appendText(linkText); }, false);
    }
});
//# sourceMappingURL=ask.js.map