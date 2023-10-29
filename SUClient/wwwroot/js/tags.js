var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function GetTags() {
    return __awaiter(this, void 0, void 0, function () {
        var tagbody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tagbody = document.getElementById('tagbody');
                    return [4 /*yield*/, fetch("".concat(baseURL, "/Tags/GetTags"), {
                            method: 'GET'
                        })
                            .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                        })
                            .then(function (data) {
                            data.forEach(function (tag) {
                                var contentBody = document.createElement('div');
                                contentBody.setAttribute("id", "contentBody");
                                contentBody.classList.add('content-body');
                                var tagName = document.createElement("a");
                                tagName.setAttribute("id", "tagName");
                                tagName.classList.add('tagName');
                                tagName.textContent = tag.tagName.replace(/%23/g, '#');
                                //tagName.href = `/Home/Tagged?tagName=${encodeURIComponent(tag.tagName)}`;
                                //tagName.href = `/Home/Tagged?tagName=${encodeURIComponent(tag.tagName.trim().replace(/ /g, '%20'))}`;
                                tagName.href = "/Home/Tagged?tagName=".concat(encodeURIComponent(tag.tagName.trim()));
                                var tagAmount = document.createElement("label");
                                tagAmount.setAttribute("id", "tagAmount");
                                tagAmount.classList.add('tagAmount');
                                tagAmount.textContent = "".concat(tag.tagAmount, " posts");
                                contentBody.append(tagName);
                                contentBody.append(tagAmount);
                                tagbody.appendChild(contentBody);
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//get the name from url
function Tagged() {
    return __awaiter(this, void 0, void 0, function () {
        var urlParams, tagName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urlParams = new URLSearchParams(window.location.search);
                    tagName = urlParams.get('tagName');
                    /*   GoToThatPage('Tagged');*/
                    return [4 /*yield*/, fetch("".concat(baseURL, "/Tags/GetTagged") + '?tagName=' + tagName, {
                            method: 'GET',
                        })
                            .then(function (response) {
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
                                    questions_1.appendChild(questionSummary);
                                });
                            }
                        })
                            .catch(function (error) {
                            console.error('Error:', error);
                        })];
                case 1:
                    /*   GoToThatPage('Tagged');*/
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=tags.js.map