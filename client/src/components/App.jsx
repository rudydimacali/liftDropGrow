import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
  }

  handleSubmit(e) {
  }

  render() {
    return (
      <div id='helloWorld'>Hello World!</div>
    )
  }
}

export default App;
