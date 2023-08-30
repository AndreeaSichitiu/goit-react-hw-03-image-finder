import React, { useState } from 'react';
import style from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.SearchForm__button}>
          <FaSearch size={18} />
        </button>

        <input
          className={style.SearchForm__input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={event => {
            setSearchQuery(event.target.value);
          }}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
