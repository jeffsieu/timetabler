import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'


const initialState = {
  customModules: [],
  status: 'idle',
  error: null
}


const customModulesSlice = createSlice({
  name: 'customModules',
  initialState,
  reducers: {
    addCustomModule(state, action) {
      const payload = action.payload
      payload['id'] = nanoid()
      state.customModules.push(payload)
    },
    deleteCustomModule(state, action) {
      const id = action.payload.id
      const index = state.customModules.findIndex(module => module.id === id)
      state.customModules.splice(index, 1)
    },
    deleteAllCustomModules(state, action) {
      state.customModules = []
    },
    updateCustomModules(state, action) {
      const id = action.payload.id
      const index = state.customModules.findIndex(module => module.id === id)
      state.customModules[index] = action.payload
    }
  }
})

export const { deleteCustomModule, deleteAllCustomModules, addCustomModule, updateCustomModules } = customModulesSlice.actions

export default customModulesSlice.reducer

