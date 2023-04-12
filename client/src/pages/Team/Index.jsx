import { useEffect, useState } from 'react';
import { getDatas } from '../../services/api.js';
import style from "./user.module.css";

function Team() {

    const [users, setUsers] = useState(null);

    useEffect(() => {

        async function fetchData() {
            try {
                const users = await getDatas("/user");

                setUsers(users.data.result);

            } catch (err) {
                throw new Error(err);
            }

        }
        fetchData();
    }, []);

    return (
        <main className={style.container}>

            <h2>Membres de l'équipe</h2>
            <section className={style.cards}>
                {
                    users ?
                        users.map(u => {
                            return (
                                <article key={u.id}>
                                    <div className={style.cardHeader}>
                                        <figure className={style.avatar}>
                                            <img src={`/img/avatar_user/${u.avatarName ? u.avatarName : "default.jpg"}`} alt={u.avatarAlt ? u.avatarAlt : 'avatar par defaut'} />
                                        </figure>
                                    </div>
                                    <div className={style.cardBody}>
                                        <h3>{u.firstName} {u.lastName}</h3>
                                        <p>Date d'anniversaire : {new Date(u.birthDate).toLocaleDateString('fr-FR', { month: '2-digit', day: '2-digit' })}</p>
                                        <p>Numéro de téléphone : {u.phone ? u.phone : "pas de numéro enregistré"}</p>
                                        <p>Handicap : {u.handicap}</p>
                                    </div>


                                </article>
                            )
                        })
                        :
                        null
                }
            </section>
        </main>
    )
}

export default Team;