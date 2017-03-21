let initialState = {
    gettingUserInfo: false,
    userInfo: null,
    userInfoError: null
}

export function UserinfoReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_USERINFO_STARTED':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        gettingUserInfo: action.gettingUserInfo
                    }
                )
            );

        case 'GET_USERINFO_SUCCESS':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        gettingUserInfo: action.gettingUserInfo,
                        userInfo: action.userInfo,
                        userInfoError: null
                    }
                )
            );

        case 'GET_USERINFO_ERROR':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        gettingUserInfo: action.gettingUserInfo,
                        userInfoError: action.userInfoError
                    }
                )
            );

        default:
            return state;
    }
}