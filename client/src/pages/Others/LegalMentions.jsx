import React from 'react';
import style from "./othersPage.module.css";
import { Helmet } from 'react-helmet';

const LegalMentions = () => {
    return (
        <>
            <Helmet>
                <title>Mentions légales - Equipe femme de Granville</title>
            </Helmet>

            <main className={style.ctnOtherPage}>
                <section>
                    <h2>Mentions légales</h2>
                    <h3>Éditeur du site</h3>
                    <p>
                        Nom de la société : //<br />
                        Adresse : //<br />
                        Téléphone : //<br />
                        Email : //<br />
                        SIRET : //
                    </p>

                    <h2>Hébergeur du site</h2>
                    <p>
                        Hébergeur : //<br />
                        Adresse : //<br />
                        Téléphone : //<br />
                        Email : //
                    </p>

                    <h3>Propriété intellectuelle</h3>
                    <p>
                        Tous les contenus présents sur ce site (textes, images, vidéos, etc.) sont soumis au droit d'auteur et sont la propriété exclusive de la société //. Toute reproduction, représentation ou diffusion, totale ou partielle, des éléments présents sur ce site, sans l'accord préalable de la société //, est interdite.
                    </p>

                    <h3>Responsabilité</h3>
                    <p>
                        La société // ne saurait être tenue pour responsable en cas d'erreurs, d'omissions ou de défauts de mise à jour des informations contenues sur ce site. La société // se réserve le droit de modifier, de corriger ou de supprimer tout ou partie du contenu du site à tout moment et sans préavis.
                    </p>

                    <h3>Données personnelles</h3>
                    <p>
                        La société // s'engage à protéger les données personnelles de ses utilisateurs conformément à la réglementation en vigueur. Pour en savoir plus sur notre politique de protection des données personnelles, veuillez consulter notre page de politique de confidentialité.
                    </p>
                </section>
            </main>
        </>
    );
}

export default LegalMentions;