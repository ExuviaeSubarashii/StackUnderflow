function SetCookie(cookiename, value) {
    var cookieValue = "".concat(cookiename, "=").concat(value, "; path=/");
    document.cookie = cookieValue;
}
function getCookie(name) {
    var cookies = document.cookie.split('; ');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var _a = cookie.split('='), cookieName = _a[0], cookieValue = _a[1];
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
function deleteCookie(name) {
    document.cookie = "".concat(name, "=; path=/;");
}
//# sourceMappingURL=cookies.js.map