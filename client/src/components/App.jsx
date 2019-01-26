import React from 'react';
import AddWorkSet from './AddWorkSet.jsx';
import RenderDate from './RenderDate.jsx';
import DateOptions from './DateOptions.jsx';
const moment = require('moment');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: moment().format('MM-DD-YYYY'),
      workouts: [],
      dateOptions: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWorkouts = this.getWorkouts.bind(this);
    this.getDates = this.getDates.bind(this);
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
        this.setState({ workouts: data.rows });
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

  handleSubmit(e) {
  }

  render() {
    if (this.state.dateSelected === moment().format('MM-DD-YYYY')) {
      return (
        <div>
          <select id='dateSelected' onChange={this.handleChange}>
            <DateOptions dateArray={this.state.dateOptions} />
          </select>
          <RenderDate workoutArray={this.state.workouts} />
          <AddWorkSet getWorkouts={this.getWorkouts} />
        </div>
      )
    } else {
      return (
        <div>
          <select id='dateSelected' onChange={this.handleChange}>
            <DateOptions dateArray={this.state.dateOptions} />
          </select>
          <RenderDate workoutArray={this.state.workouts} />
        </div>
      )
    }
  }
}

export default App;
