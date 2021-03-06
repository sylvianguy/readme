import clone from 'clone';
import types from '../../actions/actionTypes';
import initialState from '../initialState';

export default function (state = initialState.user, action) {
    switch (action.type) {
    case types.UPDATE_USER: {
        const oldState = clone(state);
        const newState = Object.assign({}, oldState, action.user);
        return newState;
    }
    case types.UPDATE_INSTRUCTORS: {
        const newState = clone(state);
        newState.instructors = action.instructors;
        return newState;
    }
    default:
        return state;
    }
}
