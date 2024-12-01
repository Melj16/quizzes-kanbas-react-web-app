import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Dashboard/reducer";
import quizReducer from "./Courses/Quizzes/reducer";

const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentReducer,
        enrollmentReducer,
        quizReducer,
    },
});
export default store;