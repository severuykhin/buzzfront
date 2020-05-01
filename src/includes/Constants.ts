export const WIDGET_STATUS_ACTIVE: number = 1;
export const WIDGET_STATUS_INACTIVE: number = 0;
export const PUBLISH_TIMEOUT: number = 10000; // Для публикации виджета не чаще, чем 1 раз в 10 секунд
export const AUDIENCE_ANY: string = 'any'; 

export const VK_API_PUBLISH_TIMEOUT_ERROR = 9; // Код ошибки Flud control на стопроне вк при публикации виджета

export const GROUP_NOT_FOUND_MESSAGE = 'Group not found';

export const MODAL_NULL = {id: null, args: {}};

/**
 * Работа со строками
 */
export const EMOJI_REGEX = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\ud83d|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
export const SPECIAL_CHARS_REGEX = /(\"|\&|\<|\>|\:|\#|\$|\^|\{|\}|\₽|\!)/g;
export const EMOJI_COUNT = 11;
export const SPECIAL_CHAR_COUNT = 9;
export const ZERO_WIDTH_JOINER = '200d';
export const MAX_STRING_LENGTH = 100;
export const MAX_MESSAGE_DESCRIPTION_LENGTH = 200;
export const MAX_BUTTON_STRING_LENGTH = 50;
export const MAX_CONTINUED_STRING_LENGTH = 96;

export interface HistoryItem {
    id: number
    text: string,
    description: string,
    score: number,
    background: string,
    wached: number,
    themeName?: string,
    themeDescription?: string
}

export interface HistoryProps {
    data: HistoryItem[],
    isPending: boolean,
    totalCount: number,
    handleSearch: Function,
    getData: Function
}

export interface AchivmentInterface {
    id: number
    active: boolean
    name: string
    desc: string
    type: string
    watched: number
    count?: number
    score?: number
}

export interface AllowActionsInterface {
    isAllowSuggestWord: boolean
}