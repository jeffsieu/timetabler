import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    modules: [],
    status: 'idle',
    error: null
}

export const fetchModule = createAsyncThunk('modules/fetchModule', async (moduleCode) => {
    const result = await axios.get(`https://api.nusmods.com/v2/2020-2021/modules/${moduleCode}.json`)
    return result.data
})



const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers:{
        deleteModule(state, action) {
            console.log(action.payload)
            const { modName } = action.payload
            const existingModuleIndex = state.modules.findIndex(module => module.moduleCode === modName)
            state.modules.splice(existingModuleIndex, 1)
        }
    },
    extraReducers: {
        [fetchModule.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            if (!state.modules.some(module => module.moduleCode === action.payload.moduleCode))
                state.modules = state.modules.concat(action.payload)
        },
    }
})



export const { deleteModule } = modulesSlice.actions 

export default modulesSlice.reducer

export const selectAllModules = (state) => state.modules.modules

export const selectModuleById = (state, moduleName) => state.modules.find((module) => module.moduleCode === moduleName)