export function getStudents(page, studentName) {
  return {
    type: '@student/GET_STUDENTS',
    payload: { page, name: studentName },
  };
}

export function getStudentsSuccess(data) {
  return {
    type: '@student/GET_STUDENTS_SUCCESS',
    payload: { hasMoreItems: data.hasMoreItems, students: data.content },
  };
}

export function getStudentsError() {
  return {
    type: '@student/GET_STUDENTS_ERROR',
  };
}

export function createStudent(name, email, age, weight, height) {
  return {
    type: '@student/CREATE_STUDENT',
    payload: { name, email, age, weight, height },
  };
}

export function updateStudent(student_id, name, email, age, weight, height) {
  return {
    type: '@student/UPDATE_STUDENT',
    payload: { student_id, name, email, age, weight, height },
  };
}

export function deleteStudent(id) {
  return {
    type: '@student/DELETE_STUDENT',
    payload: { id },
  };
}
