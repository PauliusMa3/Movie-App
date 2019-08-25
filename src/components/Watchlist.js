import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import RemoveFromWatchlist from "./RemoveFromWatchlist";

const Ul = styled.ul`
  list-style: none;
  background: ${props => props.theme.lightGrey1};
  padding: 15px;
  height: auto;

  @media screen and (max-width: 600px) {
    padding: 8px;
  }

  p {
    font-size: 30px;
    padding: 5px;
  }

  .movie-details {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  li {
    text-decoration: none;
    display: flex;
    margin-bottom: 15px;

    border: 1px solid ${props => props.theme.lightGrey3};
    padding: 15px;
    border-radius: 12px;
    img {
      width: 25%;
      height: auto;
      border-radius: 5px;
      margin-right: 15px;
    }

    strong {
      color: ${props => props.theme.black};
      cursor: pointer;
      font-size: 24px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      background: ${props => props.theme.black};
      color: ${props => props.theme.yellow};
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 100px;
      text-align: center;
      margin-right: 5px;
    }
  }
`;

const Watchlist = props => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setWatchlist(JSON.parse(localStorage.getItem("movies")));
    }
  }, [watchlist]);

  console.log("watchlist", watchlist);
  return (
    <Ul>
      <p>Your Watchlist</p>
      {watchlist.map(movie => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} />
          <div className="movie-details">
            <strong
              onClick={() => {
                props.history.push(`/movies/${movie.imdbID}`);
              }}
            >
              {movie.Title}
            </strong>
            <div className="specifics">
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
            </div>
          </div>
          <RemoveFromWatchlist movie={movie} />
        </li>
      ))}
    </Ul>
  );
};

export default withRouter(Watchlist);
