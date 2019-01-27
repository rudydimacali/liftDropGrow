import React from 'react';
const $ = require('jquery');

export default class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutName: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/workoutNames',
      data: { name: this.state.workoutName },
      success: () => {
        document.getElementById('addWorkoutForm').reset();
        this.props.getWorkoutNames();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleChange(e) {
    this.setState({
      workoutName: e.target.value.toLowerCase()
    });
  }

  render() {
    return (
      <form id='addWorkoutForm'>
        <legend>Add Lift</legend>
        <div class="form-group">
          <label for="liftName">Exercise</label>
          <input id="liftName" class="form-control" onChange={this.handleChange}></input>
          <button class="btn btn-primary" onClick={this.handleClick}>Add</button>
        </div>
      </form>
    )
  }
}