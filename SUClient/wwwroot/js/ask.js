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
heading.addEventListener("click", function () { return appendText(headingText); });
bold.addEventListener("click", function () { return appendText(boldText); });
italic.addEventListener("click", function () { return appendText(italicText); });
codealt.addEventListener("click", function () { return appendText(codeAltText); });
link.addEventListener("click", function () { return appendText(linkText); });
//# sourceMappingURL=ask.js.map