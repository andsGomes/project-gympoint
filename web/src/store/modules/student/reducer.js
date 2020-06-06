import produce from 'immer';

const INITIAL_STATE = {
  students: [],
  loading: false,
  hasMoreItems: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/GET_STUDENT': {
        draft.loading = true;
        break;
      }
      case '@student/GET_STUDENTS_SUCCESS': {
        draft.students = action.payload.students;
        draft.hasMoreItems = action.payload.hasMoreItems;
        draft.loading = false;
        break;
      }
      case '@student/GET_STUDENTS_ERROR': {
        draft.loading = false;
        break;
      }
      case '@student/CREATE_STUDENT': {
        draft.student = action.payload;
        break;
      }
      case '@student/UPDATE_STUDENT': {
        draft.student = action.payload;
        break;
      }
      case '@student/DELETE_STUDENT': {
        break;
      }
      default:
    }
  });
}
