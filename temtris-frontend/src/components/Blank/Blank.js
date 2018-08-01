import React, { Component } from 'react';

class Blank extends Component {
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.children}
      </div>
    );
  }
}

export default Blank;