import React from "react";
import { Link } from "react-router-dom";
import "../css/form.css";
import { getCourseData } from "./promise";

class Home extends React.Component {
  state = {
    courseData: [],
    loaded: false
  };
  componentDidMount() {
    getCourseData()
      .then(response => {
        console.log("response", response);
        this.setState({
          courseData: response,
          loaded: true
        });
      })
      .catch(e => console.log(e));
  }

  handleDelete = index => {
    let data = [...this.state.courseData];
    data.splice(index, 1);
    console.log(data);
    this.setState({
      courseData: data
    });
    localStorage.setItem("courseData", JSON.stringify(data));
  };

  handleEdit = index => {
    let data = [...this.state.courseData];
    let value = data[index];
    this.props.history.push({
      pathname: "/add",
      state: {
        index,
        courseData: this.state.courseData,
        value: value
      }
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.courseData.length > 0 ? (
            this.state.courseData.map((data, index) => {
              console.log("index inside map", index);
              return (
                <div key={index} className="pod">
                  <p>Couse Name : {data.courseName}</p>
                  <p>Duration (in hours) : {data.duration}</p>
                  <p>Max Attendees : {data.maxAttendees}</p>
                  <p>
                    <button
                      onClick={() => this.handleEdit(index)}
                      type="button"
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => this.handleDelete(index)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              );
            })
          ) : (
            <div className="pod">
              <p>No Data Saved</p>
            </div>
          )}
        </div>
        <Link to="/add" type="button" className="btn btn-primary">
          Add
        </Link>
      </div>
    );
  }
}

export default Home;
