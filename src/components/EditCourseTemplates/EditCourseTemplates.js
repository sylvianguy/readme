import React from 'react';
import PropTypes from 'prop-types';

import SectionCard from '../SectionCard/SectionCard';

class EditCourseTemplates extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
        };
        this.addSection = this.addSection.bind(this);
        this.removeSection = this.removeSection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const { getCourse } = this.props.actions;
        getCourse(this.props.match.params.template_id);
    }
    addSection(e) {
        e.preventDefault();
        const { createNewSection } = this.props.actions;
        const title = this.state.title;
        const id = this.props.course.courses._id;
        createNewSection({ title }, id);
    }
    handleChange(e) {
        const newState = Object.assign({}, this.state, {
            [e.target.name]: e.target.value,
        });
        this.setState(newState);
    }
    removeSection(e, sectionId) {
        const { deleteSection } = this.props.actions;
        const courseId = this.props.course.courses._id;

        deleteSection(courseId, sectionId);
    }
    render() {
        const sections = this.props.course.courses.sections;
        return (
            <div className="container full">
                <button className="primary"><i className="chalk-home" />back to dashboard</button>
                <header className="topContent">
                    <h1>Template</h1>
                    <p className="title">
                        Drag and drop to reorganize lessons
                    (one at a time for now, multiple coming soon!)
                    </p>
                </header>
                <section className="lessonsWrap">
                    <ol className="lessonColumn">
                        <li>
                            <article className="lessonNew">
                                <ul>
                                    <form className="new-lesson" onSubmit={this.addSection}>
                                        <h3>Add new section</h3>
                                        <input
                                            type="text"
                                            placeholder="topic section title"
                                            onChange={this.handleChange}
                                            value={this.state.title}
                                            name="title"
                                        />
                                        <button className="success">Create</button>
                                    </form>
                                </ul>
                            </article>
                        </li>
                        {sections.map((section) => {
                            return (
                                <SectionCard
                                    title={section.title}
                                    id={section._id}
                                    lessons={section.lessons}
                                    removeSection={this.removeSection}
                                />
                            );
                        })}
                    </ol>
                    <aside>
                        <section className="sideCard">
                            <h3>Course Topics</h3>
                            <div className="card topicLegend">
                                <ul className="topicList">
                                    {sections.map((section) => {
                                        return (
                                            <li key={section._id}><a href={`#${section.title}`}>{section.title}</a></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </section>
                        <button className="error">
                            <i className="chalk-remove" />delete template
                    </button>
                    </aside>
                </section>
            </div>
        );
    }
}

EditCourseTemplates.propTypes = {
    actions: PropTypes.shape({
        getCourse: PropTypes.func.isRequired,
        createNewSection: PropTypes.func.isRequired,
        deleteSection: PropTypes.func.isRequired,
    }).isRequired,
    course: PropTypes.shape({
        courses: PropTypes.shape({
            sections: PropTypes.array,
            _id: PropTypes.string,
        }).isRequired,
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            template_id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default EditCourseTemplates;
