import React from 'react';
import $ from 'jquery';
const LineChart = require("react-chartjs").Line;
const moment = require('moment');

export default class ProgressChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutNames: [],
      chartData: {},

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getWorkoutNames = this.getWorkoutNames.bind(this);
  }

  componentDidMount() {
    this.getWorkoutNames(() => {
      let months = [];
      for (let i = 5; i >= 0; i--) {
        months.push(moment().subtract(i, 'months').format('MMMM'));
      };
      let data = {
        labels: months,
        datasets: [
          {
            label: "Max",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55]
          }
        ]
      };
      this.setState({
        chartData: data
      });
    });
  }

  getWorkoutNames(cb) {
    $.ajax({
      method: 'GET',
      url: '/api/workoutNames',
      success: (data) => {
        this.setState({ workoutNames: data.rows }, cb);
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

    let data = {
      labels: this.state.chartData.labels,
      datasets: [
        {
          label: "Max",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: []
        }
      ]
    };
    this.setState({
      [e.target.id]: e.target.value,
      // chartData: data
    });
  }

  render() {
    return (
      <div>
        <form id='addWorkSetForm'>
          <div className='form-group'>
            <label htmlFor="workoutId">Lift</label>
            <select className="form-control" id='workoutId' onChange={this.handleChange}>
              {this.state.workoutNames.map((workout) => {
                return <option key={workout.id} value={workout.id}>{this.upperCase(workout.name)}</option>
              })}
            </select>
          </div>
        </form>
        <form id='chartWrapper'>
          <div className='form-group canvas-container'>
            <LineChart data={this.state.chartData} options={{
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }} width="600" height="250" responsive="true" redraw />
          </div>
        </form>
      </div>
    )
  }
}