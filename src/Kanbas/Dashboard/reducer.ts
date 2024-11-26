import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
const initialState = {
    enrollments: [],
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        enrollCourse: (state, { payload }) => {
            const { courseId, userId } = payload;
            const newEnrollment = {
                "_id": new Date().getTime().toString(),
                "user": userId,
                "course": courseId,
            };

            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        unenrollCourse: (state, { payload }) => {
            const { courseId, userId } = payload;
            state.enrollments = state.enrollments.filter(
                (e: any) =>
                    !(e.course === courseId && e.user === userId)
            );
        },
    },
});

export const { enrollCourse, unenrollCourse, setEnrollments } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;