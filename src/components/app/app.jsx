import React, { useState } from 'react';
import style from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-Ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import {baseUrl} from '../../constants/constants';
import {BurgerConstructorContext} from '../../context/context';
import {checkResponse} from '../../utils/utils';

const App = () => {
  const [dataIngredients, setDataIngredients] = React.useState ([]);
  const [errorLoad, setErrorLoad ] = React.useState(false);
  const [okLoad, setOKLoad] = React.useState(false);
   



  React.useEffect(() => {
    fetch(baseUrl + '/ingredients')
    .then(checkResponse)
    .then(data => {setDataIngredients(data.data); setOKLoad(true) })
    .catch((err) => { setErrorLoad(true) })
  },[]);
  

    return (
      <div className={style.app}>  
        <AppHeader  />
        {errorLoad && <p> --- Ошибка загрузки данных с сервера ---</p>}
        <main className={style.main}>
          {okLoad && (
              
            <BurgerConstructorContext.Provider value={dataIngredients}>
              <BurgerIngredients />
              <BurgerConstructor/>
            </BurgerConstructorContext.Provider>
              
          )}
        </main>
      </div>
    
    )
    
}

export default App;

