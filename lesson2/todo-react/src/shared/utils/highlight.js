const escapeHTML = (unsafeString) => {
    return unsafeString
        .replaceAll(/&/g, "&amp;")
        .replaceAll(/</g, "&lt;")
        .replaceAll(/>/g, "&gt;")
        .replaceAll(/"/g, "&quot;")
        .replaceAll(/'/g, "&#039;");
} //экранирует потенциально опасные символы в строке, чтобы предотвратить XSS-атаки
const escapeRegExp = (unsavedString) => {
    return unsavedString.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
} // будет экранировать специальные символы в строке, чтобы при их вводе в поисковую строку функция подсветки
//  не путала симыволы с паттерном регулярки

export const highLightCaseInsensitive = (text, searchQuery) => {
    const safeText = escapeHTML(text)
    const queryFormatted = searchQuery.trim()

    if (queryFormatted.length === 0) {
        return safeText // если поисковый запрос пустой, возвращаем исходный текст без изменений
    }

    const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig')

    return safeText.replace(pattern, `<mark>$&</mark>`)
} // text - оригинальный текст, 
// searchQuery - поисковый запрос. Функция возвращает текст с подсвеченными совпадениями поискового запроса, игнорируя регистр букв.