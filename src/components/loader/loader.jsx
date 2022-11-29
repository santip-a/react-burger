import style from './loader.module.css';

export const Loader = () => {
  return (
    <div className={style.overlay}>
      <div className={style.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

    </div>

  )

}