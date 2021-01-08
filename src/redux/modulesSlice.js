import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    modules: [],
    status: 'idle',
    error: null
}

export const fetchModule = createAsyncThunk('modules/fetchModule', async (moduleCode) => {
    const result = await axios.get(`https://api.nusmods.com/v2/2020-2021/modules/${moduleCode}.json`)
    console.log(result)
    return result.data
})




const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers:{
        deleteModule(state, action) {
            console.log(action)
            const moduleName = action.payload
            const existingModuleIndex = state.modules.modules.findIndex(module => module.moduleCode === moduleName)
            state.modules.module.splice(existingModuleIndex, 1)
        }

    },
    extraReducers: {
        [fetchModule.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchModule.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            if (!state.modules.some(module => module.moduleCode === action.payload.moduleCode))
                state.modules = state.modules.concat(action.payload)
        },
        [fetchModule.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})



export const { deleteModule } = modulesSlice.actions 

export default modulesSlice.reducer

export const selectAllModules = (state) => state.modules.modules

export const selectModuleById = (state, moduleName) => state.modules.find((module) => module.moduleCode === moduleName)