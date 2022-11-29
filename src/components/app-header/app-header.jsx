import header from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';

const AppHeader = () => {

  return (
    <header className={`${header.header} mt-10 pb-4`}>
      <nav >
        <ul className={`${header.list} pt-4`} >
          <li className={`${header.item} pl-5 pr-6 pt-1 pb-1`}>
            <NavLink exact to='/' className={header.link} activeClassName={header.activeLink}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </NavLink>
          </li>
          <li className={`${header.item} pl-6 pr-6 pt-1 pb-1 mr-2`}>
            <NavLink to='/temp' className={header.link} activeClassName={header.activeLink}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default pl-2">Лента заказов</p>
            </NavLink>
          </li>
          <li className={`${header.item} ml-10 pl-15 pr-6 pt-1 pb-1`}>
            <NavLink to='/' className={header.link}>
              <Logo />
            </NavLink>
          </li>
          <li className={`${header.item_last} pr-5`} >
            <NavLink to='/profile' className={header.link} activeClassName={header.activeLink}>
              <p className="text text_type_main-default pl-2">Личный кабинет</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )

}

export default AppHeader;