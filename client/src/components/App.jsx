import React from 'react';
const $ = require('jquery');
import AddWorkout from './AddWorkout.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutNames: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWorkoutNames = this.getWorkoutNames.bind(this);
  }

  componentDidMount() {
    this.getWorkoutNames();
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

  handleChange(e) {
  }

  handleSubmit(e) {
  }

  upperCase(workout) {
    let wordArr = workout.split(' ');
    for (let i = 0; i < wordArr.length; i++) {
      wordArr[i] = wordArr[i].charAt(0).toUpperCase() + wordArr[i].substr(1);
    }
    return wordArr.join(' ');
  }

  render() {
    return (
      <div>
        <div id='helloWorld'>Hello World!</div>
        <select id='workoutNames'>
          {this.state.workoutNames.map((workout) => {
            return <option key={workout.id} value={workout.name}>{this.upperCase(workout.name)}</option>
          })}
        </select>
        <AddWorkout getWorkoutNames={this.getWorkoutNames} />
      </div>
    )
  }
}

export default App;
