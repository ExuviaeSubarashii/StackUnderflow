let header = document.getElementById("header") as HTMLInputElement;
let tags = document.getElementById("tags") as HTMLInputElement;
let dopost = document.getElementById("dopost") as HTMLButtonElement;

const heading = document.getElementById("button-heading") as HTMLButtonElement;
const bold = document.getElementById("button-bold") as HTMLButtonElement;
const italic = document.getElementById("button-italic") as HTMLButtonElement;
const codealt = document.getElementById("button-codealt") as HTMLButtonElement;
const link = document.getElementById("button-link") as HTMLButtonElement;

let textBody = document.getElementById("body") as HTMLInputElement;

let headingText = "#";
let boldText = "****";
let italicText = "**";
let codeAltText = "``";
let linkText = "[text](link)";

function appendText(format: string) {
    textBody.value += format;
}
function PostQuestion() {
    const newPost = {
        Header: header.value || null || "",
        MainContent: textBody.value,
        PosterName: localStorage.getItem('userEmail').replace(/\\|"/g, ''),
        tags: tags.value || "" || null
    };
    if (!isNullOrEmpty(newPost.MainContent) && !isNullOrEmpty(newPost.Header)) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/Post/NewPost`, requestOptions)
            .then(response => {
                if (response.ok) {
                    window.location.href = "/Home/Questions"
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
function showNonBlockingPopup(message: string, duration: number) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = message;
    popup.style.display = "block";
    document.body.appendChild(popup);

    setTimeout(function () {
        popup.style.display = "none";
        document.body.removeChild(popup);
    }, duration);
}

const Tags = ['python', 'java', 'c++', 'javascript', 'ruby', 'php', 'swift', 'go', 'rust', 'c#'];
const tagInputElement = document.getElementById('tags') as HTMLInputElement;
const suggestions = document.getElementById("suggestions");
const tagSuggestions = document.createElement('div');
tagSuggestions.id = 'tag-suggestions';

function createTagSuggestion(tagName) {
    const jsTagSuggestion = document.createElement('div');
    const langTitle = document.createElement('p');
    langTitle.textContent = tagName;
    jsTagSuggestion.appendChild(langTitle);
    tagSuggestions.appendChild(jsTagSuggestion);
    suggestions.appendChild(tagSuggestions);
}

function displayTagSuggestions() {
    const langName = tagInputElement.value.toLowerCase();

    // Clear existing tag suggestions
    tagSuggestions.innerHTML = '';

    Tags.forEach(tag => {
        if (tag.toLowerCase().startsWith(langName) == true) {
            createTagSuggestion(tag);
        }
        if (tag == "") {
            createTagSuggestion("");
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const tagInputElement = document.getElementById('tags');
    if (tagInputElement) {
        tagInputElement.addEventListener('input', displayTagSuggestions, false);
        heading.addEventListener("click", () => appendText(headingText), false);
        bold.addEventListener("click", () => appendText(boldText), false);
        italic.addEventListener("click", () => appendText(italicText), false);
        codealt.addEventListener("click", () => appendText(codeAltText), false);
        link.addEventListener("click", () => appendText(linkText), false);
    }
});



