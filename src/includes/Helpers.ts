import { 
    AUDIENCE_ANY,
    EMOJI_REGEX,
    EMOJI_COUNT,
    SPECIAL_CHARS_REGEX,
    SPECIAL_CHAR_COUNT,
    ZERO_WIDTH_JOINER,
    MAX_STRING_LENGTH
} from '../includes/Constants';

export const getRandomGradient = () => {

    const gradients = [
        'linear-gradient(135deg, #f24973 0%, #3948e6 100%)',
        'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
        'linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)',
        'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
        'linear-gradient(-20deg, #6e45e2 0%, #88d3ce 100%)',
        'linear-gradient(to top, #5f72bd 0%, #9b23ea 100%)',
        'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)',
        'linear-gradient(45deg, #874da2 0%, #c43a30 100%)',
        'linear-gradient(to top, #cc208e 0%, #6713d2 100%)',
        'linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%)',
        'linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)'

    ];

    return gradients[Math.floor(Math.random() * gradients.length)];
}

const isEmoji = char => char.match(EMOJI_REGEX);
const isZWJ = char => char.codePointAt(0).toString(16) === ZERO_WIDTH_JOINER;
const isSpecialChar = char => char.match(SPECIAL_CHARS_REGEX);

/**
 * Подсчет длины строки так, как ее раздекодит VK при сохраненеии виджета
 * @param string 
 */
export const countStringLength = (string: String): Number => {
    
    const chars = Array.from(string);
    let decodeStringLength = 0;

    chars.forEach(char => {
        if (isZWJ(char)) {
            decodeStringLength += 5;
        } else if (isSpecialChar(char)) {
            decodeStringLength += SPECIAL_CHAR_COUNT;
        } else if (isEmoji(char)) {
            decodeStringLength += EMOJI_COUNT;
        } else {
            decodeStringLength += char.length;
        }
    });

    return decodeStringLength;
}

/**
 * Обрезать строку для VK в соответствии с тем, 
 * как строки воспринимаются на его стороне
 * @param string 
 */
export const cropStringForVk = (string: String, maxLength: number = MAX_STRING_LENGTH): String => {

    const decodedStringLength = countStringLength(string);

    if (decodedStringLength <= maxLength) {
        return string;
    }

    let newString = string;

    while(
        countStringLength(newString) > (maxLength - 4) ||
        isEmoji(newString[newString.length - 1]) ||
        isZWJ(newString[newString.length - 1])
    ) {
        newString = newString.slice(0, -1);
    }

    return `${newString}...`;
} 

export const scopeReplace = (scope: string, newScope: string = "") => {
    let arr = decodeURIComponent(scope).split(',');
    if(!!newScope)
        arr.push(newScope);
    if(arr.indexOf("notify") >= 0)
        arr.splice(arr.indexOf("notify"), 1);
    return arr.join(',');
}

/**
 * Получить токен группы из LocalStorage
 * @param group_id 
 */
export const getPublicToken = (group_id: number): string => {
    return localStorage.getItem(`public_token_${group_id}`);
}

/**
 * Сохранить токен группы в LocalStorage
 * @param public_token
 * @param group_id
 */
export const setPublicToken = (public_token: string, group_id: number): boolean => {
    localStorage.setItem(`public_token_${group_id}`, public_token);
    return true;
}

/**
 * Удалить токен группы
 * @param group_id
 */
export const removePubliToken = (group_id: number): any => {
    return localStorage.removeItem(`public_token_${group_id}`);
}

/**
 * Глубокая заморозка объекта
 * @param obj 
 */
export const deepFreeze = obj => {

    // Получаем имена свойств из объекта obj
    var propNames = Object.getOwnPropertyNames(obj);
  
    // Замораживаем свойства для заморозки самого объекта
    propNames.forEach(function(name) {
      var prop = obj[name];
  
      // Заморозка свойства prop, если оно объект
      if (typeof prop == 'object' && prop !== null)
        deepFreeze(prop);
    });
  
    // Заморозить сам объект obj (ничего не произойдёт, если он уже заморожен)
    return Object.freeze(obj);
}

/**
 * Проверка - является ли строка string корректным именем screen_name
 * @param string 
 */
export const isScreenName = (string: string): boolean => {
    // Allow only latin characters with lodash
    return /^[a-z]+[a-z\_]+/gmi.test(string.toLowerCase()) && string.length >= 5;
}