import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        createQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: new Date().getTime().toString(),
                questions: [],
                ...quiz,
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        createQuestion: (state, { payload: quizId }) => {
            const quiz = state.quizzes.find((q: any) => q._id === quizId) as any;
            if (quiz) {
                const newQuestion: any = {
                    _id: new Date().getTime().toString(),
                    name: "",
                    type: "multiple-choice",
                    instructions: "",
                    answers: [{ id: 1, text: "" }],
                };
                quiz.questions = [...quiz.questions, newQuestion];
            }
        },
    },
});
export const { setQuizzes, createQuiz, createQuestion } = quizzesSlice.actions;
export default quizzesSlice.reducer;