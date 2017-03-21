let initialState = {
    isGettingDirs: false,
    directionsObj: null,
    directionsError: null
}

export function SidebarReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DIRECTIONS':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        isGettingDirs: action.isGettingDirs,
                        payload: action.payload
                    }
                )
            )

        case 'SET_DIRECTIONS':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        directionsObj: action.directionsObj,
                        isGettingDirs: action.isGettingDirs,
                        directionsError: null
                    }
                )
            );

        case 'DIRECTIONS_LOADED':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        isGettingDirs: action.isGettingDirs,
                        directionsError: null
                    }
                )
            );
        case 'DIRECTIONS_ERROR':
            return(
                Object.assign(
                    {},
                    state,
                    {
                        isGettingDirs: action.isGettingDirs,
                        directionsError: action.error,
                        directionsObj: null
                    }
                )
            );

        default:
            return state;
    }
}