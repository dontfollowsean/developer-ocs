import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Time from 'react-time-format';
import { List, ListItem } from '../../components/List';
import { Col, Row } from '../../components/Grid';
import { FormBtn } from '../../components/Form';
import { SaveBtn } from '../../components/Save';
import { ReplyBtn } from '../../components/Reply';
import './AllProjects.css';
import API from '../../utils/API';

class AllProjects extends Component {
  state = {
    projects: [],
    user: {}
  };

  componentDidMount() {
    API.isLoggedIn().then(res => {
      console.log(res);
      if (res.data.statusCode !== 401) {
        this.setState({ user: res.data });
        this.loadAllProjects();
      } else {
        window.location.href = '/';
      }
    });
  }

  // When the form is submitted, use the API.saveProject method to save the project data
  // Then reload projects from the database
  loadAllProjects = () => {
    API.getProjects()
      .then(res =>
        this.setState({
          projects: res.data
        })
      )
      .catch(err => console.log(err));
  };

  // Saves/favorites a project
  handleSaveProject = (id) => {
    API.saveProject({ project_id: id, user_id: this.state.user.id })
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  };

  // Updates save icon display to show if project is in saved status
  loadSaved = () => {
    // ToDo: get saved projects and merge them with this.state.projects... set savedFlag to true. savedFlag === true would need to prevent duplicate saves
  };

  render() {
    return (
      <div>
        {/* // This row will handle all of the projects */}
        <Row>
          <Col size="sm-12">
            <br />

            {/* This panel will initially be made up of a panel and wells for each of the projects retrieved */}
            <div className="panel panel-primary">
              {this.state.projects.length ? (
                <List className="searchResults">
                  {this.state.projects.map(project => {
                    return (
                      <ListItem key={project.id}>
                        <SaveBtn
                          onClick={() => this.handleSaveProject(project.id)}
                        />
                        &nbsp; &nbsp;
                        <ReplyBtn
                          onClick={() =>
                            this.handleSaveProject(
                              project.id,
                              project.project_title
                            )}
                        />
                        &nbsp; &nbsp;
                        {project.id} &nbsp;
                        <Time
                          value={project.posted_date}
                          format="MM-DD-YYYY"
                        />&nbsp;
                        <a href="" className="projTitle">
                          {project.project_title}
                        </a>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <List>
                  <ListItem>
                    <h3 className="noRes">No Results to Display</h3>
                  </ListItem>
                </List>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AllProjects;
