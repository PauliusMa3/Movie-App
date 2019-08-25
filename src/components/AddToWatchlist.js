import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.blue};
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 60%;

  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 15px;
  }
  &:hover {
  }
`;

const AddToWatchlist = props => {
  useEffect(() => {}, []);

  const [favouriteMovies, setFavouriteMovies] = useState([]);

  const addToFavourites = movie => {
    let movies = [];
    if (localStorage.getItem("movies")) {
      movies = JSON.parse(localStorage.getItem("movies"));
    }
    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
  };

  return (
    <Button onClick={() => addToFavourites(props.movie)}>
      Add To Watchlist
    </Button>
  );
};

export default AddToWatchlist;
