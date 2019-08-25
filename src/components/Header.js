import React, { Component } from "react";
import styled from "styled-components";
import { withRouter, Link, NavLink } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import imdbLogo from "../assets/images/imdbLogo.jpg";

const HeaderStyles = styled.header`
  background: ${props => props.theme.black};
  padding: 8px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  height: 100px;

  .search-icon-mobile {
    display: none;

    @media screen and (max-width: 600px) {
      fill: ${props => props.theme.yellow};
      display: inline-block;
      height: 30px;
    }
  }

  select {
    height: 32px;
    vertical-align: top;
    border: 0;
  }

  .active {
    font-size: 20px;
    color: ${props => props.theme.yellow};
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
  }

  .active::before {
    transition: 300ms;
    height: 3px;
    content: "";
    position: absolute;
    background-color: ${props => props.theme.yellow};
    width: 0%;
    bottom: -10px;
  }

  .active:hover::before {
    width: 100%;
  }

  .logo {
    height: 50px;
    margin-right: 20px;
  }

  @media screen and (max-width: 600px) {
    /* display: none; */

    form.collapsed {
      width: 0;
      overflow: hidden;
    }

    form.collapsed.expanded {
      width: 100%;
      background: ${props => props.theme.black};
      overflow: hidden;
      display: block;
      transition: all 0.2s;
      top: 100px;
      left: 0;
      position: fixed;
      height: 100px;
      z-index: 1000;

      input {
        padding: 10px 12px;
        height: 40px;
        width: calc(100% - 120px);
      }

      input,
      select {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }

      select {
        height: 40px;
        vertical-align: top;
      }

      button {
        height: 40px;
      }
    }

    form > fieldset {
      width: 100%;
      padding: 0;
    }
  }
`;

const Form = styled.form`
  position: relative;
  margin: auto;

  @media screen and (max-width: 600px) {
    display: none;
  }

  fieldset {
    width: 100%;
    border: 0;
    padding: 0;
  }

  .header-search-icon {
    height: 16px;
  }

  input {
    border-radius: 5px 0 0 5px;
    border: 0;

    &:focus {
      outline: none;
    }
  }
  input,
  button {
    display: inline-block;
    padding: 7px 12px;
    font-size: 16px;
    line-height: 16px;
  }

  button {
    position: absolute;
    border-radius: 0 5px 5px 0;

    width: 50px;
    border: none;
    background: ${props => props.theme.yellow};
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

class Header extends Component {
  state = {
    inputValue: "",
    selectValue: "",
    toggleSearch: false
  };

  changeHandler = e => {
    this.setState({ inputValue: e.target.value });
  };

  changeSelectHandler = e => {
    this.setState({ selectValue: e.target.value });
  };

  handleToggleSearch = e => {
    this.setState({ toggleSearch: !this.state.toggleSearch });
  };

  render() {
    return (
      <HeaderStyles>
        <Link to="/">
          <img className="logo" src={imdbLogo} />
        </Link>
        <NavLink className="active" to="/watchList">
          Watch List
        </NavLink>

        <SearchIcon
          className="search-icon-mobile"
          onClick={this.handleToggleSearch}
        />
        <Form
          className={`collapsed ${this.state.toggleSearch ? `expanded` : ""}`}
          onSubmit={e => {
            e.preventDefault();
            this.props.history.push({
              pathname: "/search",
              search: `?query=${this.state.inputValue}`,
              state: { type: this.state.selectValue }
            });
            this.setState({
              inputValue: ""
            });
            this.setState({ toggleSearch: false });
          }}
        >
          <fieldset>
            <input
              type="text"
              placeholder="Find Movies, TV Shows"
              onChange={this.changeHandler}
              value={this.state.inputValue}
              required
            />
            <select onChange={this.changeSelectHandler}>
              <option value="" selected>
                All
              </option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
            <button type="submit">
              <SearchIcon className="header-search-icon" />
            </button>
          </fieldset>
        </Form>
      </HeaderStyles>
    );
  }
}

export default withRouter(Header);
