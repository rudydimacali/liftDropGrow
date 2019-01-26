import React from 'react';
import AddWorkSet from './AddWorkSet.jsx';
import RenderDate from './RenderDate.jsx';
const moment = require('moment');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: moment().format('MM-DD-YYYY'),
      workouts: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWorkouts = this.getWorkouts.bind(this);
  }

  componentDidMount() {
    this.getWorkouts(this.state.dateSelected);
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
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
  }

  render() {
    if (this.state.dateSelected === moment().format('MM-DD-YYYY')) {
      return (
        <div>
          {/* <RenderDate /> */}
          <AddWorkSet />
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

export default App;
