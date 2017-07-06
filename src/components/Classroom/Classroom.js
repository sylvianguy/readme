import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Classroom extends React.Component {
    componentDidMount() {
        const { getCourse } = this.props.actions;
        const { classroom_id } = this.props.match.params;

        getCourse(classroom_id);
    }
    render() {
        return (
            <div className="container full">
                <Link to="/dashboard" className="linkBtn">Go Back To Dashboard</Link>
            </div>
        );
    }
}

Classroom.propTypes = {
    actions: PropTypes.shape({
        getCourse: PropTypes.func.isRequired,
    }).isRequired,
    // classroom: PropTypes.shape({
    //     _id: PropTypes.string.isRequired,
    //     title: PropTypes.string.isRequired,
    //     template: PropTypes.bool.isRequired,
    //     term: PropTypes.string.isRequired,
    //     start_date: PropTypes.number.isRequired,
    //     end_date: PropTypes.number.isRequired,
    //     instructor: PropTypes.string.isRequired,
    //     description: PropTypes.string.isRequired,
    //     created_at: PropTypes.number.isRequired,
    //     updated_at: PropTypes.number.isRequired,
    // }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            classroom_id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default Classroom;
