import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    allModules: [],
    status: 'idle',
    error: null
}


export const fetchAllModules = createAsyncThunk('allModules/fetchAllModules', async () => {
    const result = await axios.get(`https://api.nusmods.com/v2/2020-2021/moduleList.json`)
    return result.data
} )


const allModulesSlice = createSlice({
    name: 'allModules',
    initialState,
    reducers:{
        
    },
    extraReducers: {
        [fetchAllModules.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchAllModules.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [fetchAllModules.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.allModules = state.allModules.concat(action.payload)
        }
    }
})



export default allModulesSlice.reducer

export const selectAllModules = (state) => state.allModules


