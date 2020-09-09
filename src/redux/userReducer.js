const initialState = {
    user_id: null,
    username: '',
    email: ''
}

const USER_INFO_TO_REDUX = 'USER_INFO_TO_REDUX';

export function userInfoToRedux( user_id, username,  email ) {
    return {
        type: "USER_INFO_TO_REDUX",
        payload: { user_id, username, email }
    }
}

export default function userReducer(state=initialState, action){
    switch(action.type) {
        case USER_INFO_TO_REDUX:
            return {...state, ...action.payload}
        default:
            return state;
    }
}