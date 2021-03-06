import clone from 'clone';

import types from '../actionTypes';
import { requestCourses, requestTemplates, createTemplate, getCourseById, createSection, removeSection } from '../../services/courseService';
import { broadcast } from '../broadcastActions/broadcastActions';
import { loading, loadingSuccess } from '../loaderActions/loaderActions';

export function updateCourses(courses, settings = { includeTemplates: true }) {
    let newCourses = clone(courses);
    if (settings.includeTemplates === false) {
        newCourses = courses.filter(course => course.template !== true);
    }
    return {
        type: types.UPDATE_COURSES,
        courses: newCourses,
    };
}

export function updateTemplates(templates) {
    return {
        type: types.UPDATE_TEMPLATES,
        templates,
    };
}

export function getTemplates() {
    return (dispatch) => {
        return requestTemplates()
            .then(response => response.json())
            .then(({ course }) => {
                dispatch(updateTemplates(course));
            })
            .catch((error) => {
                throw (error);
            });
    };
}
export function getCourses() {
    return (dispatch) => {
        return requestCourses()
            .then(response => response.json())
            .then(({ course }) => {
                dispatch(updateCourses(course, { includeTemplates: false }));
            })
            .catch((error) => {
                throw (error);
            });
    };
}

export function createTemplateThunk(template) {
    return (dispatch) => {
        dispatch(loading());
        return createTemplate(template)
            .then(response => response.json())
            .then(() => {
                dispatch(loadingSuccess());
                dispatch(getTemplates());
                dispatch(broadcast('Template successfully created.', 'success'));
            });
    };
}

export function getCourse(id) {
    return (dispatch) => {
        return getCourseById(id)
            .then(response => response.json())
            .then((data) => {
                dispatch(updateCourses(data.course));
            });
    };
}

export function createNewSection(section, id) {
    return (dispatch) => {
        return createSection(section, id)
            .then(response => response.json())
            .then((data) => {
                dispatch(updateCourses(data.course));
                dispatch(loadingSuccess());
                dispatch(broadcast('User successfully created.', 'success'));
            });
    };
}

export function deleteSection(courseId, sectionId) {
    return (dispatch) => {
        dispatch(loading());
        return removeSection(courseId, sectionId)
            .then(response => response.json())
            .then(() => {
                dispatch(loadingSuccess());
                dispatch(broadcast('User successfully deleted.', 'success'));
            });
    };
}
