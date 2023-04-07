import { AiOutlinePushpin } from "react-icons/ai";
import style from "./home.module.css";
import Weather from './Components/Weather';
import Activities from './Components/Activities';
import NextEvent from './Components/NextEvent';
import Event from './Components/Event';

function Home() {

    return (
		<main className={style.wrapper}>		
			
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
    )
}

export default Home;