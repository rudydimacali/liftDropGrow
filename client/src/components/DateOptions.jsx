import React from 'react';

const DateOptions = ({ dateArray }) => {
  return (
    dateArray.map((dateObject) => {
      return <option value={dateObject.date} key={dateObject.date}>{dateObject.date}</option>
    })
  );
}

export default DateOptions;