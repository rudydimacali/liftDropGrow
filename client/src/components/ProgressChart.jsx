import React from 'react';
import $ from 'jquery';
const LineChart = require("react-chartjs").Line;

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
      let data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
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
      label: this.state.workoutNames[e.target.value - 1].name,
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    };
    this.setState({
      [e.target.id]: e.target.value,
      chartData: data
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