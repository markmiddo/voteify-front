import { asyncAction, syncAction } from 'libs/actions';

export const signUpAction = asyncAction('ENV/SIGN_UP');
export const signInAction = asyncAction('ENV/SIGN_IN');
export const omniauthAction = asyncAction('ENV/OMNI_AUTH');
export const omniauthUpdateAction = asyncAction('ENV/OMNI_AUTH_UPDATE');

export const forgotPasswordAction = asyncAction('ENV/FORGOT_PASSWORD', data => ({ data }));
export const resetPasswordAction = asyncAction('ENV/RESET_PASSWORD');

export const updateProfileAction = asyncAction('ENV/UPDATE_PROFILE', payload => payload);

export const setStatisticAction = asyncAction('ENV/SET_STATISTIC');

export const getProfileContentAction = asyncAction('ENV/GET_PROFILE_CONTENT');
export const changeProfileContentOrderAction = syncAction('ENV/CHANGE_PROFILE_CONTENT_FILTER');

export const contactUsAction = asyncAction('ENV/CONTACT_US');
export const createAnswerAction = asyncAction('ENV/ANSWER');
export const getPatronQuestionsAction = asyncAction('ENV/PATRON_QUESTIONS');

export const logOutAction = asyncAction('ENV/LOG_OUT');
