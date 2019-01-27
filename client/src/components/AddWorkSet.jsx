import React from 'react';
import AddWorkout from './AddWorkout.jsx';
const $ = require('jquery');
const moment = require('moment');

export default class AddWorkSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightOptions: [],
      workoutNames: [],
      workoutName: '',
      workoutId: 1,
      weight: 5,
      reps: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getWorkoutNames = this.getWorkoutNames.bind(this);
  }

  componentDidMount() {
    this.getWorkoutNames();
    let weightOptions = [];
    let weight = 5;
    while (weight <= 600) {
      weightOptions.push(weight);
      weight += 5;
    }
    this.setState({ weightOptions });
  }

  getWorkoutNames() {
    $.ajax({
      method: 'GET',
      url: '/api/workoutNames',
      success: (data) => {
        this.setState({ workoutNames: data.rows });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleClick(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/workouts',
      data: {
        date: moment().format('MM-DD-YYYY'),
        workoutid: this.state.workoutId,
        weight: this.state.weight,
        reps: this.state.reps
      },
      success: () => {
        this.props.getWorkouts();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  upperCase(workout) {
    let wordArr = workout.split(' ');
    for (let i = 0; i < wordArr.length; i++) {
      wordArr[i] = wordArr[i].charAt(0).toUpperCase() + wordArr[i].substr(1);
    }
    return wordArr.join(' ');
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form id='addWorkSetForm'>
          <legend>Add Set</legend>
          <div class="form-group">
            <label for="workoutId">Lift</label>
            <select class="form-control" id='workoutId' onChange={this.handleChange}>
              {this.state.workoutNames.map((workout) => {
                return <option key={workout.id} value={workout.id}>{this.upperCase(workout.name)}</option>
              })}
            </select>
          </div>
          <div class="form-group">
            <label for="weight">Weight</label>
            <select class="form-control" id='weight' onChange={this.handleChange}>
              {this.state.weightOptions.map((weight) => {
                return <option key={weight} value={weight}>{weight} lbs</option>
              })};
          </select>
          </div>
          <div class="form-group">
            <label for="reps">Reps</label>
            <select class="form-control" id='reps' onChange={this.handleChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((repCount) => {
                return <option key={repCount} value={repCount}>{repCount} Reps</option>
              })}
            </select>
            <button class="btn btn-primary" onClick={this.handleClick}>Add</button>
          </div>
        </form>
        <AddWorkout getWorkoutNames={this.getWorkoutNames} />
      </div>
    )
  }
}