import React from 'react';
import PropTypes from 'prop-types';

import css from '../../styles.module.css';

export default function Button({ onClick }) {
  return (
    <button className={css.Button} onClick={onClick}>
      load more
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
};
