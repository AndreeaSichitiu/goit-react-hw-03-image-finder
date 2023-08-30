import React from 'react'
import style from "./Button.module.css"
import PropTypes from 'prop-types';


export default function Button({onLoadMore}) {
  return (
    <button type="button" className={style.Button} onClick={onLoadMore}>Load more</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};