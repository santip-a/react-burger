import page404 from './page_404.module.css';
import image from '../images/page_404.png';
import { useHistory } from 'react-router-dom';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const Page404 = () => {
  const history = useHistory();

  const goToMainPage = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    history.replace({ pathname: '/' });
  }

  const goToBackPage = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    history.goBack();
  }

  return (
    <div className={`${page404.section} mt-20 `}>
      <h1 className={`mb-5 text text_type_main-medium text_color_inactive`}>Нету такой страницы, родной...</h1>
      <img className={`${page404.image} `} src={image} alt="страница не найдена" />
      <p className={`mt-10 text text_type_main-default text_color_inactive`}>(ошибка 404)</p>
      <p className={`${page404.title} mt-5  text text_type_main-default text_color_inactive`}>
        можешь вернуться <Button htmlType='button' type="secondary" size="medium" onClick={(e) => goToBackPage(e)}>назад</Button>
        , или перейти на <Button htmlType='button' type="secondary" size="medium" onClick={(e) => goToMainPage(e)}>главную</Button>
      </p>
    </div>
  )
}

export default Page404
