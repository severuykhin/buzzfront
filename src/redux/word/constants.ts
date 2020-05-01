export const MODULE_NAME = 'word';

export const SET_DATA = `${MODULE_NAME}/SET_DATA`;
export const SET_OUT_OF_DATA = `${MODULE_NAME}/SET_OUT_OF_DATA`;
export const GET_DATA = `${MODULE_NAME}/GET_DATA`;
export const SET_IS_PENDING = `${MODULE_NAME}/SET_IS_PENDING`;
export const MAKE_ATTEMPT = `${MODULE_NAME}/MAKE_ATTEMPT`;
export const SET_STATUS = `${MODULE_NAME}/SET_STATUS`;

export interface WordInterFace {
    id: number,
    text: string
}