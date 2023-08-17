var heading = document.getElementById("button-heading") as HTMLButtonElement;
var bold = document.getElementById("button-bold") as HTMLButtonElement;
var italic = document.getElementById("button-italic") as HTMLButtonElement;
var codealt = document.getElementById("button-codealt") as HTMLButtonElement;
var link = document.getElementById("button-link") as HTMLButtonElement;

var textBody = document.getElementById("body") as HTMLInputElement;

var headingText = "#";
var boldText = "****";
var italicText = "**";
var codeAltText = "``";
var linkText = "[text](link)";

function appendText(format: string) {
    textBody.value += format;
}

heading.addEventListener("click", () => appendText(headingText));
bold.addEventListener("click", () => appendText(boldText));
italic.addEventListener("click", () => appendText(italicText));
codealt.addEventListener("click", () => appendText(codeAltText));
link.addEventListener("click", () => appendText(linkText));

