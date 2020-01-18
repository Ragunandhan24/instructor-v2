export const getCourseData = () => {
  return new Promise((resolve, reject) => {
    let courseData = JSON.parse(localStorage.getItem("courseData"));
    if (courseData && courseData.length > 0) {
      resolve(courseData);
    } else {
      reject("no data");
    }
  });
};

export const getDefaultState = state => {
  let defaultState = new Promise((resolve, reject) => {
    if (state) {
      resolve({
        courseName: state.value.courseName,
        duration: state.value.duration,
        maxAttendees: state.value.maxAttendees,
        currentIndex: state.index
      });
    } else {
      reject({
        courseName: "",
        duration: "",
        maxAttendees: "",
        currentIndex: ""
      });
    }
  });
  return defaultState;
};
