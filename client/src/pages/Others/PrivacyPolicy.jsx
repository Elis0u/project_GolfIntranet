import React from 'react';
import { NavLink } from "react-router-dom";
import style from "./othersPage.module.css";
import { Helmet } from 'react-helmet';
import { AiOutlineArrowLeft } from "react-icons/ai";

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Politiques de confidentialités - Equipe femme de Granville</title>
            </Helmet>

            <main className={style.ctnOtherPage}>
                <section>

                    <NavLink to="/entry" className={style.backToEntry}><AiOutlineArrowLeft /> Retour sur la page de connexion</NavLink>

                    <h2>Politique de confidentialité</h2>
                    <p>
                        La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site de la manière dont la société // collecte, utilise et protège leurs données personnelles.
                    </p>

                    <h3>Collecte des données personnelles</h3>
                    <p>
                        La société // collecte les données personnelles des utilisateurs lors de leur inscription sur le site, lors de l'utilisation des services proposés ou lors de la navigation sur le site. Ces données peuvent inclure le nom, l'adresse e-mail, le numéro de téléphone, l'adresse postale et les informations de connexion.
                    </p>

                    <h3>Utilisation des données personnelles</h3>
                    <p>
                        Les données personnelles collectées sont utilisées pour fournir et améliorer les services proposés par la société //, pour répondre aux demandes des utilisateurs, pour communiquer avec les utilisateurs et pour effectuer des analyses statistiques.
                    </p>

                    <h3>Partage des données personnelles</h3>
                    <p>
                        La société // ne partage pas les données personnelles des utilisateurs avec des tiers, sauf si cela est nécessaire pour fournir les services demandés, pour se conformer aux obligations légales ou pour protéger les droits, la propriété ou la sécurité de la société //, de ses utilisateurs ou du public.
                    </p>

                    <h3>Protection des données personnelles</h3>
                    <p>
                        La société // met en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger les données personnelles des utilisateurs contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération et la destruction.
                    </p>

                    <h3>Droits des utilisateurs</h3>
                    <p>
                        Les utilisateurs ont le droit d'accéder à leurs données personnelles, de les rectifier, de les effacer, de s'opposer à leur traitement, de demander la limitation du traitement ou de demander la portabilité de leurs données. Pour exercer ces droits, les utilisateurs peuvent contacter la société // à l'adresse e-mail suivante : dadure.elisa@outlook.com.
                    </p>

                    <h3>Modifications de la politique de confidentialité</h3>
                    <p>
                        La société // se réserve le droit de modifier la présente politique de confidentialité à tout moment. Les utilisateurs sont encouragés à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
                    </p>
                </section>
            </main>
        </>

    );
}

export default PrivacyPolicy;