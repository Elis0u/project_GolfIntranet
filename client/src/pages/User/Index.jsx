import SignForm from './signForm';
import style from "./signForm.module.css";

function Entry() {
  return (
    <>
      <main className={style.entryContainer}>
        <div className={style.signFormContainer}>
          <SignForm />
        </div>
        <div className={style.figureContainer}>
          <figure>
            <img src="/img/divers/golf_fond.jpg" alt="" />
          </figure>
        </div>
      </main>
    </>
  )
}

export default Entry;