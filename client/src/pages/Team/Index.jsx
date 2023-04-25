import { useEffect, useState } from 'react';
import { getDatas } from '../../services/api.js';
import style from "./user.module.css";
import loader from "../../assets/img/loader.svg";

function Team() {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const users = await getDatas("/user");
                setUsers(users.data.result);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                throw new Error(err);
            }
        }
        fetchData();
    }, []);

    const renderLoader = () => {
        return (
            <div className="loader">
                <img src={loader} alt="Loading..." />
            </div>
        );
    };

    return (
        <main className={style.container}>
            <h2>Membres de l'équipe</h2>
            <section className={style.cards}>
                {isLoading ? (
                    renderLoader()
                ) : (
                    users &&
                    users.map((u) => {
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
                )}
            </section>
        </main>
    )
}

export default Team;