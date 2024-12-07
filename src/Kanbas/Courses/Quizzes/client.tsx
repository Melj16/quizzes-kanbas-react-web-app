import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSE_API = `${REMOTE_SERVER}/api/courses`;
export const updateQuiz = async (quizId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}`, quiz);
    return data;
};
export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
    return response.data;
};
export const getQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}`);
    return data;
};
export const createQuiz = async (courseId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.post(`${COURSE_API}/${courseId}/quizzes`, quiz);
    return data;
}
export const getQuizzes = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSE_API}/${courseId}/quizzes`);
    return data;
}
export const getQuestions = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/questions`);
    return data;
}

export const newAttempt = async (quizId: string, userId: string) => {
    const { data } = await axiosWithCredentials.post(`${QUIZ_API}/${quizId}/user/${userId}/answers`);
    return data;
}

export const submitQuiz = async (quizId: string, userId: string) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}/user/${userId}/answers/finished`);
    return data;
}

export const addAnswerToMap = async (quizId: string, userId: string, answer: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}/user/${userId}/answer`, answer);
    return data;
}

export const getAnswers = async (quizId: string, userId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/user/${userId}/answers`);
    return data;
}

export const getAnswersForQuiz = async (quizId: string, userId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/user/${userId}/answers`);
    return data;
}

export const updateAnswer = async (quizId: string, userId: string, updateAnswer: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}/user/${userId}/answers/update`, updateAnswer);
    return data;
}