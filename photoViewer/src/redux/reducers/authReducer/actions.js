// Internal
import { getData } from 'api/Api';
import {SET_USERNAME, SET_USERS} from './actionTypes';

export const updateUserName = (userName) => ({
    type: SET_USERNAME,
    payload: {
        userName
    }
});

const _setUsers = (users) => ({
    type: SET_USERS,
    payload: {
        users
    }
}) 

// Thunk fetch api the get users for authetication
export const getUsers = () => (dispatch, getState) => {
   return getData("/users")
   .then((users) => {
       dispatch(_setUsers(users))
   }).catch((err) => {
       window.alert(err);
   })
}