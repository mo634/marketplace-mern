import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLoading: (state,action) => {
    state.loading=action.payload
    },
      signinComplete: (state, action) => {
          state.currentUser = action.payload
          state.loading = false
          state.error=null
      },
    signinFail: (state, action) => {
        state.loading = false
        state.error= action.payload
    },

    // updates orderes 
    updateIsLoadingUpdate: (state,action) => {
      state.loading=action.payload
      },
        updateComplete: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error=null
        },
      UpdateFail: (state, action) => {
          state.loading = false
          state.error= action.payload
      },
  },
})


export const { isLoading, signinComplete, signinFail, updateIsLoadingUpdate
,updateComplete,UpdateFail
} = userSlice.actions

export default userSlice.reducer