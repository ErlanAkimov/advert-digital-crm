import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './reducers/catalogReducer'
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        user: userReducer,
    }
})

export default store;