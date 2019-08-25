import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as Star } from "../assets/icons/iconmonstr-star-3.svg";
import { Link } from "react-router-dom";
import NoImage from "../assets/images/imdbLogo.jpg";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  max-width: 700px;
  margin: 0 auto;
  grid-gap: 20px;
  background: ${props => props.theme.lightGrey};
  margin-bottom: 5px;
  /* padding: 10px; */
  padding: 5px;
  img {
    height: 200px;
    width: 150px;
    object-fit: cover;
  }

  .movie-details {
    h2 {
      padding: 0;
      margin: 0;
      a {
        color: ${props => props.theme.darkBlue};
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .movie-details-runtime {
    font-size: 1rem;
    color: ${props => props.theme.grey};
    font-weight: 100;
    margin: 5px 0;
  }

  .movie-details-ratings {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .movie-details-rating {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .star-icon {
      height: 20px;
      fill: ${props => props.theme.darkYellow};
    }
  }

  .movie-details-plot {
    margin: 5px 0;
    font-size: 16px;

    @media screen and (max-width: 600px) {
      display: none;
    }
  }

  .movie-details-crew {
    margin: 5px 0;

    span {
      font-size: 14px;
    }

    .crew-label {
      color: ${props => props.theme.grey};
    }
  }

  .movie-details-votes {
    font-size: 14px;
    color: ${props => props.theme.grey};
  }
`;

const Movie = props => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${
          props.movie.imdbID
        }`
      )
      .then(result => {
        setMovie(result.data);
      });
  }, []);

  console.log("Movelis", movie);
  const { Title, Type, Year, Poster } = props.movie;
  const {
    Runtime,
    Genre,
    Metascore,
    Plot,
    Director,
    Actors,
    imdbRating,
    imdbVotes
  } = movie;

  console.log("Posteriukas", Poster);
  return (
    <Container>
      <img src={Poster} />

      <div className="movie-details">
        <h2>
          <Link to={`/movies/${props.movie.imdbID}`}>
            {Title} ({Year}) - {Type}
          </Link>
        </h2>
        <p className="movie-details-runtime">
          <span>{Runtime}</span>
          <span> | </span>
          <span>{Genre}</span>
        </p>
        <div className="movie-details-ratings">
          <div className="movie-details-rating">
            <Star className="star-icon" />
            <span>{imdbRating}</span>
          </div>
          <div className="movie-details-metascore">
            <span>{Metascore}</span>
            <span>Metascore</span>
          </div>
        </div>
        <p className="movie-details-plot">{Plot}</p>
        <p className="movie-details-crew">
          <span className="crew-label">Director: </span>
          <span>{Director}</span>
          <span> | </span>
          <span className="crew-label">Actors:</span>
          <span>{Actors}</span>
        </p>
        <p className="movie-details-votes">
          <span>Votes: </span>
          <span>{imdbVotes}</span>
        </p>
      </div>
    </Container>
  );
};

export default Movie;
