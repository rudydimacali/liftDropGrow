import React from 'react';
import $ from 'jquery';
const LineChart = require("react-chartjs").Line;
const moment = require('moment');

export default class ProgressChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutNames: [],
      chartData: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWorkoutNames = this.getWorkoutNames.bind(this);
    this.getWorkoutProgress = this.getWorkoutProgress.bind(this);
  }

  componentDidMount() {
    this.getWorkoutNames(() => {
      let months = [];
      for (let i = 5; i >= 0; i--) {
        months.push(moment().subtract(i, 'months').format('MMMM'));
      };
      this.getWorkoutProgress((data) => {
        this.getMonthlyMaxes(data, months, (maxes) => {
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
                data: maxes
              }
            ]
          };
          this.setState({
            chartData: data,
          });
        });
      })
    });
  }

  getWorkoutNames(cb) {
    $.ajax({
      method: 'GET',
      url: '/api/workoutNames',
      success: (data) => {
        this.setState({ workoutNames: data.rows, workoutId: data.rows[0].id }, cb);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getWorkoutProgress(cb) {
    $.ajax({
      method: 'GET',
      url: '/api/progression',
      data: { id: this.state.workoutId },
      success: (data) => {
        cb(data.rows);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMonthlyMaxes(workouts, months, cb) {
    let maxes = [0, 0, 0, 0, 0, 0];
    workouts.forEach((workout) => {
      if (maxes[months.indexOf(moment(workout.date, 'MM-DD-YYYY').format('MMMM'))] < workout.weight) {
        maxes[months.indexOf(moment(workout.date, 'MM-DD-YYYY').format('MMMM'))] = workout.weight;
      }
    });
    cb(maxes);
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
    }, () => {
      this.getWorkoutProgress((data) => {
        this.getMonthlyMaxes(data, this.state.chartData.labels, (maxes) => {
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
                data: maxes
              }
            ]
          };
          this.setState({
            chartData: data,
          });
        });
      });
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
      </div >
    )
  }
}