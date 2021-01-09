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

// color palette
const colorPalette = ['#fa7a7a', '#fabc7a', '#d6fa7a', '#94e87d', '#7de8aa', '#7ddae8', '#7da1e8', '#bf7de8', '#e87dc3']

const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers:{
        deleteModule(state, action) {
            const modName = action.payload
            console.log(modName)
            const existingModuleIndex = state.modules.findIndex(module => module.moduleCode === modName)
            state.modules.splice(existingModuleIndex, 1)
        },
        deleteAllModules(state, action) {
            state.modules = []
        }
    },
    extraReducers: {
        [fetchModule.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            if (!state.modules.some(module => module.moduleCode === action.payload.moduleCode)){
                const toAdd = action.payload
                toAdd["color"] = colorPalette[state.modules.length]
                state.modules = state.modules.concat(toAdd)
            }
        }, 
    }
})



export const { deleteModule, deleteAllModules } = modulesSlice.actions 

export default modulesSlice.reducer

export const selectAllModules = (state) => state.modules.modules

export const selectModuleById = (state, moduleName) => state.modules.find((module) => module.moduleCode === moduleName)