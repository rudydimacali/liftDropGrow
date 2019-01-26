import React from 'react';

const upperCase = (workout) => {
  let wordArr = workout.split(' ');
  for (let i = 0; i < wordArr.length; i++) {
    wordArr[i] = wordArr[i].charAt(0).toUpperCase() + wordArr[i].substr(1);
  }
  return wordArr.join(' ');
}

const RenderDate = ({ workoutArray }) => {
  return (
    <table id='renderDate'>
      <tr>
        <th>Workout</th>
        <th>Weight</th>
        <th>Reps</th>
      </tr>
      {workoutArray.map((workout, index) => {
        if (index > 0) {
          console.log(workout.name === workoutArray[index - 1].name);
          if (workout.name === workoutArray[index - 1].name) {
            return (
              <tr>
                <td></td>
                <td>{workout.weight}</td>
                <td>{workout.reps}</td>
              </tr>
            );
          }
        }
        return (
          <tr>
            <td>{upperCase(workout.name)}</td>
            <td>{workout.weight}</td>
            <td>{workout.reps}</td>
          </tr>);
      })}
    </table>
  );
}

export default RenderDate;