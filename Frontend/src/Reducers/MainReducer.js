// Main reducer that combines all other reducers into one

import { combineReducers } from 'redux';
import { TokenReducer } from './TokenReducer';
import { UserinfoReducer } from './UserinfoReducer';
import { SidebarReducer } from './SidebarReducer';

// Give each reducer a name of a slice of state they reduce
export default combineReducers({
    Token: TokenReducer,
    User: UserinfoReducer,
    Sidebar: SidebarReducer
});