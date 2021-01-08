import { configureStore } from '@reduxjs/toolkit'
import modulesReducer from './modulesSlice'
import allModulesReducer from './allModulesSlice'
import customModulesReducer from './customModules'

export default configureStore({
    reducer: {
        modules: modulesReducer,
        allModules: allModulesReducer,
        customModules: customModulesReducer
    }
})