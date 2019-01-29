import React from 'react';
import AddWorkSet from './AddWorkSet.jsx';
import RenderDate from './RenderDate.jsx';
import DateOptions from './DateOptions.jsx';
import NavBar from './Navbar.jsx';
import ProgressChart from './ProgressChart.jsx';
const moment = require('moment');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: moment().format('MM-DD-YYYY'),
      workouts: [],
      dateOptions: [],
      currentPage: 'workouts'
    }
    this.handleChange = this.handleChange.bind(this);
    this.getWorkouts = this.getWorkouts.bind(this);
    this.getDates = this.getDates.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.getDates();
    this.getWorkouts(this.state.dateSelected);
  }

  getDates() {
    $.ajax({
      method: 'GET',
      url: '/api/dates',
      success: (data) => {
        let dateOptions = [];
        dateOptions.push(moment().format('MM-DD-YYYY'));
        data.rows.forEach((dateObj) => {
          if (!dateOptions.includes(dateObj.date)) {
            dateOptions.push(dateObj.date);
          }
        })
        this.setState({ dateOptions: dateOptions });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getWorkouts() {
    $.ajax({
      method: 'GET',
      url: '/api/workouts',
      data: { date: this.state.dateSelected },
      success: (data) => {
        this.setState({
          workouts: data.rows.sort((a, b) => {
            return a.id - b.id;
          })
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleChange(e) {
    if (e.target.id === 'dateSelected') {
      this.setState({
        [e.target.id]: e.target.value
      }, this.getWorkouts);
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

  changePage(e) {
    e.preventDefault();
    this.setState({
      currentPage: e.target.id
    });
  }

  render() {
    if (this.state.currentPage === 'workouts') {
      if (this.state.dateSelected === moment().format('MM-DD-YYYY')) {
        return (
          <div>
            <NavBar changePage={this.changePage} activePage={this.state.currentPage} />
            <form>
              <div className="form-group">
                <label htmlFor="dateSelected">Date</label>
                <select className="form-control" id='dateSelected' onChange={this.handleChange}>
                  <DateOptions dateArray={this.state.dateOptions} />
                </select>
              </div>
            </form>
            <RenderDate workoutArray={this.state.workouts} />
            <AddWorkSet getWorkouts={this.getWorkouts} />
          </div>
        )
      } else {
        return (
          <div>
            <NavBar changePage={this.changePage} activePage={this.state.currentPage} />
            <form>
              <div className="form-group">
                <label htmlFor="dateSelected">Date</label>
                <select className="form-control" id='dateSelected' onChange={this.handleChange}>
                  <DateOptions dateArray={this.state.dateOptions} />
                </select>
              </div>
            </form>
            <RenderDate workoutArray={this.state.workouts} />
          </div>
        )
      }
    } else if (this.state.currentPage === 'progress') {
      return (
        <div>
          <NavBar changePage={this.changePage} activePage={this.state.currentPage} />
          <ProgressChart />
        </div>
      )
    }
  }
}

export default App;
