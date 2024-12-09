import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    questions: [],
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, { payload: question }) => {
            const newQuestion: any = {
                _id: new Date().getTime().toString(),
                ...question,
            };
            state.questions = [...state.questions, newQuestion] as any;
        },
        deleteQuestion: (state, { payload: questionId }) => {
            const questionIndex = state.questions.findIndex((q: any) => q._id === questionId);
            if (questionIndex > -1) {
                state.questions.splice(questionIndex, 1);
            }
        },
        updateQuestion: (state, { payload: question }) => {
            state.questions = state.questions.map((q: any) =>
                q._id === question._id ? question : q
            ) as any;
        }
    },
});
export const { setQuestions, addQuestion, deleteQuestion, updateQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;