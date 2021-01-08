import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    modules: [],
    status: 'idle',
    error: null
}

export default fetchModules = () => async (moduleCode) => {
    const result = await axios.get(`https://api.nusmods.com/v2/2018-2019/modules/${moduleCode}.json`)
    return result
}


const modulesSlice = createSLice({
    name: 'modules',
    initialState,
    reducers:{

    },
    extraReducers: {
        [fetchModules.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchModules.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.modules = state.modules.concat(action.payload)
        },
        [fetchModules.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})



export const { fetchModules } = modulesSlice.actions

export default modulesSlice.reducer

export const selectAllModules = (state) => state.modules

export const selectModuleById = (state, moduleName) => state.modules.find((module) => module.moduleCode === moduleName)