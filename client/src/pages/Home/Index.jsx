import { AiOutlinePushpin } from "react-icons/ai";
import { useSelector } from "react-redux";
import style from "./home.module.css";
import Weather from './Components/Weather';
import Activities from './Components/Activities';
import NextEvent from './Components/NextEvent';
import Event from './Components/Event';
import { Helmet } from 'react-helmet';

const Home = () => {

  const user = useSelector(state => state.user);

  return (
    <>
      <Helmet>
        <title>Accueil - Equipe femme de Granville</title>
      </Helmet>

      <main className={style.ctnHome}>

        <h2>Bonjour {user.infos.firstName} !</h2>

        <section className={style.ctnWeather}>
          <h2 className={style.whiteTitle}>Météo</h2>
          <Weather city="breville-sur-mer" />
        </section>

        <section className={style.ctnPin}>
          <h2 className={style.whiteTitle}>< AiOutlinePushpin /> Prochain entraînement</h2>
          <NextEvent />
        </section>

        <section className={style.ctnNews}>
          <h2 className={style.whiteTitle}>Dernieres actualités</h2>
          <Activities />
        </section>

        <section className={style.ctnEvent}>
          <h2>Prochains évènements</h2>
          <Event />
        </section>

      </main>
    </>
  )
}

export default Home;