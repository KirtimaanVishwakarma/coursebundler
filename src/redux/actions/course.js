import { server } from '../store';
import axios from 'axios';

// Get All Courses action
export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCourseRequest' });

      const { data } = await axios.get(
        `${server}/courses?category=${category}&keyword=${keyword}`
      );

      dispatch({ type: 'allCourseSuccess', payload: data.courses });
    } catch (error) {
      dispatch({ type: 'allCourseFail', payload: error.response.data.message });
    }
  };

// Get Course action
export const getCourseLecture = id => async dispatch => {
  try {
    dispatch({ type: 'getCourseRequest' });

    const { data } = await axios.get(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'getCourseSuccess', payload: data.letcures });
  } catch (error) {
    dispatch({ type: 'getCourseFail', payload: error.response.data.message });
  }
};
