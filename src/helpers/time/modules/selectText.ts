/**
 * `Выделение текста в соответствии с заданным типом.`
 * @param text Текст для выделения.
 * @param type Тип выбраного выделения текста.
 * @returns Выделенный текст.
 */
export const selectText = (text: string, type: string) => `\x1b[${type}m${text}\x1b[0m`;