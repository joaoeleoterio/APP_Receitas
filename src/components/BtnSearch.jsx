import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function BtnSearch() {
  const [showInputSearch, setShowInputSearch] = useState(false);

  const showInput = () => {
    setShowInputSearch(!showInputSearch);
  };

  return (
    <button type="button" onClick={ showInput }>
      <img src={ searchIcon } alt="Imagem de Busca" data-testid="search-top-btn" />
    </button>
  );
}

export default BtnSearch;
