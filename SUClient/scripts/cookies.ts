//function SetCookie(cookiename: string, value: string) {
//    const cookieValue = `${cookiename}=${value}; path=/`;
//    document.cookie = cookieValue;
//}

//function getCookie(name: string): string | null {
//    const cookies = document.cookie.split('; ');

//    for (const cookie of cookies) {
//        const [cookieName, cookieValue] = cookie.split('=');
//        if (cookieName === name) {
//            return decodeURIComponent(cookieValue);
//        }
//    }
//    return null;
//}
//function deleteCookie(name: string) {
//    document.cookie = `${name}=; path=/;`;
//}