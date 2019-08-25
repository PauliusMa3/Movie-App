import React from "react";
import Movies from "./components/Movies";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import { Route } from "react-router-dom";
import "./App.css";
import SingleMovie from "./components/SingleMovie";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import styled from "styled-components";

const AppStyles = styled.div`
  height: 100%;
  width: 60%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const theme = {
  lightGrey: "#F6F6F5",
  darkBlue: "#286CB2",
  blue: "#0091EA",
  grey: "#626262",
  darkGrey: "#333333",
  darkGrey2: "#333345",
  darkYellow: "#C39400",
  yellow: "#F5C518",
  black: "#191919",
  white: "#FFF",
  lightGrey1: "#EEE",
  lightGrey2: "#E8e8e8",
  lightGrey3: "#C0C0C0",
  lightGrey4: "#9E9E9E",
  red: "#D50000"
};
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppStyles>
        <Header />
        <Route exact path="/movies/:id" component={SingleMovie} />
        <Route exact path="/search" component={Movies} />
        <Route exact path="/watchlist" component={Watchlist} />
        <Route exact path="/" component={Home} />
      </AppStyles>
    </ThemeProvider>
  );
};

export default App;
