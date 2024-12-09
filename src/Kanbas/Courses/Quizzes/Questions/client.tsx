import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/questions`);
    return response.data;
};
export const createQuestion = async (quizId: string, question: any) => {
    const { data } = await axiosWithCredentials.post(`${QUIZ_API}/${quizId}/questions`, question);
    return data;
};
export const updateQuestion = async (questionId: string, question: any) => {
    const { data } = await axiosWithCredentials.put(`${QUESTIONS_API}/${questionId}`, question);
    return data;
};
export const deleteQuestion = async (questionId: string) => {
    const { data } = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
    return data;
};