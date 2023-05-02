import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer(
  {},
  {
    // contact form
    contactRequest: state => {
      state.loading = true;
    },
    contactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    contactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // course request
    courseRequest: state => {
      state.loading = true;
    },
    courseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    courseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // clear reducer( error , message )
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
