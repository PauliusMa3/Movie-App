import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as Star } from "../assets/icons/iconmonstr-star-3.svg";
import AddToWatchlist from "./AddToWatchlist";

const Container = styled.div`
  background: ${props => props.theme.lightGrey1};

  header {
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.darkGrey};

    .container-movie-awards {
      display: flex;
      img {
        object-fit: cover;
        width: 200px;
      }

      @media screen and (max-width: 600px) {
        flex-direction: column;

        img {
          width: 80%;
          margin: 0 auto;
        }
      }
    }

    .movie-awards {
      display: block;
      justify-content: center;
      align-items: center;
      padding: 15px;

      p,
      span {
        font-size: 25px;
        color: ${props => props.theme.white};
      }

      p {
        font-weight: 300;
      }

      span {
        font-weight: 500;
      }
    }
  }
  .container-movie-details {
    padding: 15px;

    p {
      font-size: 16px;
      padding-bottom: 15px;
    }

    .movie-details-crew {
      font-size: 16px;

      strong {
        font-weight: 700;
      }

      span {
        color: ${props => props.theme.darkBlue};
      }
    }
  }

  .container-title-block {
    display: flex;

    color: ${props => props.theme.lightGrey3};
    padding: 15px;
  }

  .container-button-addToWatchlist {
    margin-right: 20px;

    button {
      color: ${props => props.theme.white};
      font-size: 30px;
      font-weight: 500;
      padding: 8px;
      background: ${props => props.theme.lightGrey4};
      border: 0;
      transition: all 0.2s;
      cursor: pointer;

      &:hover {
        background: ${props => props.theme.yellow};
      }
    }
  }

  .container-title-wrapper {
    flex: 1;
    h1 {
      display: flex;
      justify-content: space-between;
      font-size: 36px;
      font-weight: 300;
      color: ${props => props.theme.white};

      @media screen and (max-width: 600px) {
        font-size: 20px;
      }
    }
  }

  .header-movie-ratings {
    display: flex;
    padding: 0;
    font-size: 0;
    align-items: center;

    .header-star-icon {
      fill: ${props => props.theme.yellow};
      height: 40px;
      margin-right: 10px;
    }

    .header-movie-ratings-values {
      display: block;
    }
    .header-rating-value {
      display: block;
      font-weight: 100;

      strong {
        font-size: 24px;
        color: ${props => props.theme.white};
        font-weight: 200;
      }

      .header-rating-bestValue {
        font-size: 10px;
      }
    }

    .header-votes-value {
      font-size: 10px;
      margin-top: -50px;
    }
  }
`;

const SingleMovie = props => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const movieId = props.match.params.id;
    axios
      .get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${movieId}&plot=full`)
      .then(result => {
        console.log("returned movie data: ", result.data);
        setMovie(result.data);
      });
  }, []);

  const {
    Runtime,
    Genre,
    Metascore,
    Plot,
    Director,
    Actors,
    Awards,
    imdbRating,
    imdbVotes,
    Year,
    Title,
    Released,
    Writer,
    Poster
  } = movie;
  return (
    <Container>
      <header>
        <div className="container-title-block">
          <div className="container-button-addToWatchlist">
            <button>&#43;</button>
          </div>
          <div className="container-title-wrapper">
            <h1>
              {Title} ({Year})
              <div className="header-movie-ratings">
                <Star className="header-star-icon" />
                <div className="header-movie-ratings-values">
                  <span className="header-rating-value">
                    <strong>{imdbRating}</strong>
                    <span className="header-rating-bestValue">/10</span>
                  </span>
                  <span className="header-votes-value">{imdbVotes}</span>
                </div>
              </div>
            </h1>
            <div className="container-title-subar">
              <span>{Genre}</span>
              <span> | </span>
              <span>{Runtime}</span>
              <span> |</span>
              <span>{Released}</span>
            </div>
          </div>
        </div>
        <div className="container-movie-awards">
          <img src={Poster} />
          <div className="movie-awards">
            <span>Awards: </span>
            <p>{Awards}</p>
            <AddToWatchlist className="addToWatchlist" movie={movie} />
          </div>
        </div>
      </header>

      <div className="container-movie-details">
        <p>{Plot}</p>
        <div className="movie-details-crew">
          <div className="credit-plot-summary">
            <strong className="plot-label">Director: </strong>
            <span className="plot-value">{Director}</span>
          </div>
          <div className="credit-plot-summary">
            <strong className="plot-label">Writers: </strong>
            <span className="plot-value">{Writer}</span>
          </div>
          <div className="credit-plot-summary">
            <strong className="plot-label">Actors: </strong>
            <span className="plot-value">{Actors}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withRouter(SingleMovie);
