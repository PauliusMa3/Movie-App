import React, { useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin-left: auto;
  margin-bottom: auto;
  background: none;
  border: 0;
  font-size: 30px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.red};
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
  }
`;

const RemoveFromWatchlist = props => {
  useEffect(() => {}, []);

  const removeFromFavourites = movie => {
    let movies = [];

    if (localStorage.getItem("movies")) {
      movies = JSON.parse(localStorage.getItem("movies"));
    }

    movies = movies.filter(item => item.imdbID !== movie.imdbID);

    localStorage.setItem("movies", JSON.stringify(movies));
  };

  return (
    <Button
      onClick={() => {
        removeFromFavourites(props.movie);
      }}
    >
      &times;
    </Button>
  );
};

export default RemoveFromWatchlist;
