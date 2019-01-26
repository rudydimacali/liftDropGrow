import React from 'react';
const moment = require('moment');

const DateOptions = ({ dateArray }) => {
  let sortedDates = dateArray.slice().sort((a, b) => {
    return moment(b, 'MM/DD/YYYY').format('X') - moment(a, 'MM/DD/YYYY').format('X');
  });
  return (
    sortedDates.map((date) => {
      return <option value={date} key={date}>{date}</option>
    })
  );
}

export default DateOptions;