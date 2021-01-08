import { configureStore } from '@reduxjs/toolkit'
import modulesReducer from './modulesSlice'
import allModulesReducer from './allModulesSlice'

export default configureStore({
    reducer: {
        modules: modulesReducer,
        allModules: allModulesReducer
    }
})