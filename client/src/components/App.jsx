import React from 'react';
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutNames: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/api/workoutNames',
      success: (data) => {
        this.setState({ workoutNames: data.rows });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleChange(e) {
  }

  handleSubmit(e) {
  }

  render() {
    return (
      <div>
        <div id='helloWorld'>Hello World!</div>
        <select id='workoutNames'>
          {this.state.workoutNames.map((workout) => {
            return <option key={workout.id} value={workout.id}>{workout.name}</option>
          })}
        </select>
      </div>
    )
  }
}

export default App;
