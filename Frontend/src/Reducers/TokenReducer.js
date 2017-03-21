let initialState = {
    isLogging: false,
    token: null,
    error: null
}

export function TokenReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_TOKEN_STARTED':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        isLogging: action.isLogging
                    }
                )
            )

        case 'GET_TOKEN_SUCCESS':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        isLogging: action.isLogging,
                        token: action.token,
                        error: null
                    }
                )
            );

        case 'GET_TOKEN_ERROR':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        isLogging: action.isLogging,
                        error: action.error
                    }
                )
            );

        default:
            return state;
    }
}