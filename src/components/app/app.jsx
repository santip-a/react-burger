import React, { useState } from 'react';
import style from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-Ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import {linkRequestData, BurgerConstructorContext} from '../../constants/constants';

const App = () => {
  const [dataIngredients, setDataIngredients] = React.useState ([]);
  const [errorLoad, setErrorLoad ] = React.useState(false);
  const [okLoad, setOKLoad] = React.useState(false);
   

  React.useEffect(() => {
    fetch(linkRequestData)
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  })
    .then(data => {setDataIngredients(data.data); setOKLoad(true) })
    .catch((err) => { setErrorLoad(true) })
  },[]);
  

    return (
      <div className={style.app}>  
        <AppHeader  />
        {errorLoad && <p> --- Ошибка загрузки данных с сервера ---</p>}
        <main className={style.main}>
          {okLoad && (
            <>
              <BurgerIngredients dataList={dataIngredients} />
              <BurgerConstructorContext.Provider value={dataIngredients}>
                <BurgerConstructor/>
              </BurgerConstructorContext.Provider>
              
            </>
          )}
        </main>
      </div>
    
    )
    
}

export default App;

