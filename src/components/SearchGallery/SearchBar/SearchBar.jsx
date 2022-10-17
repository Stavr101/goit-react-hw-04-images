import css from '../../../styles.module.css';
import { ImSearch } from 'react-icons/im';
import { useState } from 'react';

export default function SearchBar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = e => {
    const { value, name } = e.target;
    setName({
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name);
    reset();
  };

  const reset = () => {
    setName({
      name: '',
    });
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button
          type="submit"
          className={css.SearchForm_button}
          onClick={handleSubmit}
        >
          <span className={css.SearchForm_button_label}>Search</span>
          <ImSearch size={20} />
        </button>
        <input
          className={css.SearchForm_input}
          type="text"
          name="name"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
