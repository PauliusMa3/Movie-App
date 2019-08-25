import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${props => props.theme.white};
  padding: 10px 0;
  margin: 0;
  height: 100%;
`;

const Container = styled.div`
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.lightGrey2};
  border-radius: 12px;
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;

const Movies = props => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    let url = `http://www.omdbapi.com/?apikey=${
      process.env.REACT_APP_API_KEY
    }&s=${values.query}`;
    if (props.location.state.type) {
      url = `http://www.omdbapi.com/?apikey=${
        process.env.REACT_APP_API_KEY
      }&s=${values.query}&type=${props.location.state.type}`;
    }

    axios
      .get(url)
      .then(result => {
        setMovies(result.data.Search);
        console.log("returned Movies", result.data.Search);
      })
      .catch(e =>
        setError(
          `We have not found any ${props.location.state.type} with the name "${
            values.query
          }"`
        )
      );
  }, [props.location]);

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error}</p>;
  }
  return (
    <Wrapper>
      <Container>
        {errorMessage}
        {!errorMessage && (
          <Ul>
            {movies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </Ul>
        )}
      </Container>
    </Wrapper>
  );
};

export default withRouter(Movies);
