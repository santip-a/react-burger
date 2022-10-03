import React from 'react';
import style from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-Ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';

import { useDispatch } from 'react-redux';
import {getData} from '../../services/actions/ingredients';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const App = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getData());
  },[]);
  

    return (
      <div className={style.app}>  
        <AppHeader  />
        <DndProvider backend={HTML5Backend}>
          <main className={style.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      </div>    
    )
    
}

export default App;

