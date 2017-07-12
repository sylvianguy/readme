import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './authReducer/authReducer';
import course from './courseReducer/courseReducer';
import classroom from './classroomReducer/classroomReducer';
import user from './userReducer/userReducer';
import lesson from './lessonReducer/lessonReducer';
import loader from './loaderReducer/loaderReducer';

const rootReducer = combineReducers({ auth, course, classroom, user, lesson, loader, router });

export default rootReducer;
