import { configureStore } from '@reduxjs/toolkit';

import userDetail from './userDetail'

export default configureStore({
    reducer: {
        userReducer: userDetail,
    },
});
