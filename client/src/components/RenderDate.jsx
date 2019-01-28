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
    <table className="table table-hover" id='renderDate'>
      <tbody>
        <tr className="table-active">
          <th scope="col">Workout</th>
          <th scope="col">Weight</th>
          <th scope="col">Reps</th>
        </tr>
        {workoutArray.map((workout, index) => {
          if (index > 0) {
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
      </tbody>
    </table >
  );
}

export default RenderDate;