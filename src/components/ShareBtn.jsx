import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const THREE_SEC = 3000;

function ShareBtn({ testid, link, notificationPosition }) {
  let event;
  const [clicked, setClicked] = useState(false);
  const [href] = useState(window.location.href);
  const msg = (
    <span
      className="copy-tooltip"
      style={ { position: notificationPosition } }
    >
      Link copied!
    </span>
  );

  useEffect(() => () => clearTimeout(event), []);

  function handleClick() {
    setClicked(true);
    copy(!link ? href : link);
    clearTimeout(event);
    event = setTimeout(() => {
      setClicked(false);
    }, THREE_SEC);
  }

  return (
    <>
      <button
        type="button"
        className="btn-interact"
        onClick={ handleClick }
      >
        <img
          src={ shareIcon }
          height="25px"
          alt="Share Button"
          data-testid={ testid }
        />
      </button>
      { clicked && msg }
    </>
  );
}

ShareBtn.propTypes = {
  testid: PropTypes.string,
  link: PropTypes.string,
  notificationPosition: PropTypes.string,
};

ShareBtn.defaultProps = {
  testid: 'share-btn',
  link: '',
  notificationPosition: 'fixed',
};

export default ShareBtn;
