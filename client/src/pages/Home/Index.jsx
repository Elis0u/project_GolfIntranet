import { AiOutlinePushpin } from "react-icons/ai";
import style from "./home.module.css";
import Weather from './Components/Weather';

function Home() {

    return (
		<main className={style.wrapper}>		
			
      <section className={style.ctnWeather}>
        <h2 className={style.whiteTitle}>Météo</h2>
        <Weather city="Bréville-sur-Mer" />
      </section>

      <section className={style.ctnPin}>
        <h2 className={style.whiteTitle}>< AiOutlinePushpin /> Prochain entraînement</h2>
      </section>

      <section className={style.ctnNews}>
        <h2 className={style.whiteTitle}>Dernieres actus</h2>
      </section>

      <section className={style.ctnEvent}>
        <h2>Prochains évènements</h2>
      </section>

      <section className={style.ctnChat}>
        <h2 className={style.whiteTitle}>CHAT</h2>
      </section>

      <section className={style.ctnPoll}>
        <h2>Sondages</h2>
      </section>
	
		</main>
    )
}

export default Home;