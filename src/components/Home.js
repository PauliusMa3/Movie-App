import React, { Component } from "react";

class Home extends Component {
  render() {
    console.log("Checking API KEY env file: ", process.env.REACT_APP_API_KEY);
    return <p>Home Sweet Home</p>;
  }
}

export default Home;
