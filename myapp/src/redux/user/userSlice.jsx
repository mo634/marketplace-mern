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
      
    // delete orderes 
    deleteIsLoading: (state,action) => {
      state.loading=action.payload
      },
        deleteComplete: (state, action) => {
            state.currentUser = null
            state.loading = false
            state.error=null
        },
      deleteFail: (state, action) => {
          state.loading = false
          state.error= action.payload
      },
    // signout orderes 
    signoutIsLoading: (state,action) => {
      state.loading=action.payload
      },
        signoutComplete: (state, action) => {
            state.currentUser = null
            state.loading = false
            state.error=null
        },
      signoutFail: (state, action) => {
          state.loading = false
          state.error= action.payload
      },
  },
})


export const { isLoading, signinComplete, signinFail, updateIsLoadingUpdate
,updateComplete,UpdateFail,deleteComplete,deleteIsLoading,deleteFail
,signoutComplete,signoutIsLoading,signoutFail
} = userSlice.actions

export default userSlice.reducer