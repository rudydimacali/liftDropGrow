import React from 'react';

const DateOptions = ({ dateArray }) => {
  return (
    dateArray.map((date) => {
      return <option value={date} key={date}>{date}</option>
    })
  );
}

export default DateOptions;