# Intranet Equipe Femme de Granville
***
L'application intranet (fictive) a été conçue pour faciliter la communication et la gestion de l'équipe féminine de Granville, fournissant une plateforme centralisée permettant aux membres de l'équipe et aux administrateurs de gérer les documents, les événements et les comptes des joueuses.

L'intranet offre plusieurs fonctionnalités clés, notamment :

- Gestion des documents : les utilisateurs ayant le rôle d'administrateur peuvent ajouter, modifier et supprimer des documents, ainsi que les classer dans différentes catégories.
- Gestion des événements : les utilisateurs ayant le rôle d'administrateur peuvent créer, modifier et supprimer des événements, ainsi que les classer dans différentes catégories.
- Gestion des utilisateurs : les administrateurs peuvent gérer les comptes des joueuses et attribuer des rôles d'administrateur.
- Visualisation des informations des joueuses : les utilisateurs peuvent consulter les informations détaillées des joueuses, telles que leur date d'anniversaire, leur numéro de téléphone et leur handicap.
- Visualisation des événements : les utilisateurs ont accès à un calendrier pour avoir une vue d'ensemble des événements de la saison.
- Consultation des documents : les utilisateurs peuvent visualiser les documents ajoutés par les administrateurs.
- Suivi de leur évolution : les utilisateurs peuvent visualiser un graphique montrant leur évolution sur le score de Pelz (un test connu des golfeurs).

L'accès à cette application est restreint. Les utilisateurs doivent se créer un compte pour y accéder, et un administrateur doit valider le compte afin d'éviter que des utilisateurs non autorisés aient accès au site.

Le but de cette application est de fournir un outil efficace et convivial pour aider l'équipe féminine de Granville à rester organisée et à communiquer efficacement entre ses membres, tout en démontrant la maîtrise des compétences de développement web acquises lors de la formation.

## Table des matières
1. [Infos Général](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)

## Infos Général
***
- Ce projet a été développé dans le cadre d'une formation en développement web fullstack Javascript et vise à valider les compétences acquises, ainsi qu'à obtenir le titre RNCP niveau 5.
- L'application intranet est destinée aux membres et aux administrateurs de l'équipe féminine de Granville.
- Réalisé et développé par Dadure "Elis0u" Elisa.
- Statut actuel : Version 1 non déployée.

## Technologies
***
Coté client :
- [React](https://fr.legacy.reactjs.org/)
- [Redux](https://www.npmjs.com/package/redux)
- [Axios](https://www.npmjs.com/package/axios)
- [ChartJs](https://www.chartjs.org/)
- [Moment](https://www.npmjs.com/package/moment)
- [React-datetime](https://www.npmjs.com/package/react-datetime)
- [React-dom](https://www.npmjs.com/package/react-dom)
- [React-helmet](https://www.npmjs.com/package/react-helmet)
- [React-icon](https://www.npmjs.com/package/react-icons)
- [React-modal](https://www.npmjs.com/package/react-modal)
- [React-paginate](https://www.npmjs.com/package/react-paginate)
- [React-router-dom](https://www.npmjs.com/package/react-router-dom)

Coté server :
- [NodeJs](https://nodejs.org/en)
- [axios](https://www.npmjs.com/package/axios)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [mysql2](https://www.npmjs.com/package/mysql2)

## Installation
***
- Assurez-vous d'avoir installé Node.js version 12.x.x ou ultérieure.
- Lancez WampServer et assurez-vous d'avoir la base de données. Importez le fichier SQL dans votre base de données, si nécessaire.
- Voici les étapes à suivre :

1. Cloner le projet à l'emplacement que vous souhaitez :
```
$ git clone https://github.com/Elis0u/project_GolfIntranet.git
```
2. Rendez-vous dans le dossier client et installez les dépendances :
```
$ cd client
$ npm install
```
3. Retournez dans le dossier de base, puis rendez-vous dans le dossier server et installez les dépendances :
```
$ cd ..
$ cd server
$ npm install
```
4. Toujours dans le dossier server, créez un fichier `.env` et ajoutez le code suivant en le complétant :
```
LOCAL_PORT = " "
HOST = " "

DB_HOST = " "
DB_NAME = " "
DB_USER = " "
DB_PWD = 

TOKEN_SECRET = " "

API_WEATHER_KEY = " "
```
5. Afin de pouvoir lancer l'application, exécutez cette commande dans les dossiers server et client dans des terminaux séparés :
```
$ npm start
```
