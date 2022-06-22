import PropTypes from 'prop-types';
import React, { useState } from 'react';
import BtnFilter from './BtnFilter';
import BtnAll from './BtnAll';

function FilterButtons({ btns, page, buttonsFunc }) {
  const [valueBtn, setValueBtn] = useState('');

  const foodsCase = () => (
    <>
      <BtnAll
        type="meal"
        setValueBtn={ setValueBtn }
        valueBtn={ valueBtn }
      />
      <BtnFilter
        btns={ btns }
        buttonsFunc={ buttonsFunc }
        valueBtn={ valueBtn }
        setValueBtn={ setValueBtn }
        type="meal"
      />
    </>
  );

  const drinksCase = () => (
    <>
      <BtnAll
        type="cocktail"
        setValueBtn={ setValueBtn }
        valueBtn={ valueBtn }
      />
      <BtnFilter
        btns={ btns }
        buttonsFunc={ buttonsFunc }
        valueBtn={ valueBtn }
        setValueBtn={ setValueBtn }
        type="cocktail"
      />
    </>
  );

  return (
    page.includes('foods')
      ? foodsCase()
      : drinksCase()
  );
}

FilterButtons.propTypes = {
  page: PropTypes.string.isRequired,
  btns: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonsFunc: PropTypes.func.isRequired,
};

export default FilterButtons;
