import React from 'react';
import header from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo  } from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader = () => {
    return (
      <header className={`${header.header } mt-10 pb-4`}>
        <nav >
          <ul className={`${header.list} pt-4`} >
            <li className={`${header.item} pl-5 pr-6 pt-1 pb-1`}>
              <a href="#" className={header.link} >
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default pl-2">Конструктор</p> 
              </a>
            </li>
            <li className={`${header.item} pl-6 pr-6 pt-1 pb-1 mr-2`}>
              <a href="#" className={header.link}>
                <ListIcon type="primary" />
                <p className="text text_type_main-default pl-2">Лента заказов</p> 
              </a>              
            </li>
            <li className={`${header.item} ml-10 pl-15 pr-6 pt-1 pb-1`}>
              <a href="#" className={header.link}>
              <Logo />
              </a> 
            </li>
            <li className={`${header.item_last} pr-5`} >
              <a href="#" className={header.link}>
                <ProfileIcon type="primary" />
                <p className="text text_type_main-default pl-2">Личный кабинет</p> 
              </a> 
            </li>
          </ul>
        </nav>

      </header>
      
      
    
    )
    
}

export default AppHeader;