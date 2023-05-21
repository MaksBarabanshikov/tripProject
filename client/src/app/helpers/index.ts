export function handlingErrorMessage(error: any) {
    if (error?.response?.data?.message) {
        console.log(error.response?.data?.message)
        return error?.response?.data?.message
    }
    return "Неизвестная ошибка попробуйте обновить страницу";
}

export function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}