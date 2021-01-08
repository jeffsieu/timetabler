import { configureStore } from '@reduxjs/toolkit'
import modulesReducer from './modulesSlice'

export default configureStore({
    reducer: {
        modules: modulesReducer
    }
})