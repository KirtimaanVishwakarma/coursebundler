import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [], lectures: [] },
  {
    // get all course
    allCourseRequest: state => {
      state.loading = true;
    },
    allCourseSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get  course
    getCourseRequest: state => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add to playlist course
    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
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
