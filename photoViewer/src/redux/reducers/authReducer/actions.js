import {SET_USERNAME} from './actionTypes';

export const updateUserName = (userName) => ({
    type: SET_USERNAME,
    payload: {
        userName
    }
});