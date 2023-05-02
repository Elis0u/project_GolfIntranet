-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 02 mai 2023 à 11:08
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `3wa_finalproject_v1`
--

-- --------------------------------------------------------

--
-- Structure de la table `category_document`
--

DROP TABLE IF EXISTS `category_document`;
CREATE TABLE IF NOT EXISTS `category_document` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category_document`
--

INSERT INTO `category_document` (`id`, `label`) VALUES
(1, 'Règlement'),
(2, 'Mental'),
(3, 'Routine'),
(24, 'Exercice'),
(25, 'Divers');

-- --------------------------------------------------------

--
-- Structure de la table `category_event`
--

DROP TABLE IF EXISTS `category_event`;
CREATE TABLE IF NOT EXISTS `category_event` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` varchar(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category_event`
--

INSERT INTO `category_event` (`id`, `label`) VALUES
(1, 'Entraînement'),
(3, 'Rencontre'),
(4, 'Compétition'),
(5, 'Réunion');

-- --------------------------------------------------------

--
-- Structure de la table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE IF NOT EXISTS `document` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `document`
--

INSERT INTO `document` (`id`, `title`, `content`, `createdAt`, `updatedAt`, `category_id`, `user_id`) VALUES
(4, 'Lorem lorem lorem lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a aliquam risus. Aenean ac nunc tortor. In lacus tellus, ultrices eu elementum a, finibus vitae purus. Pellentesque ornare in magna non iaculis. Etiam egestas risus in euismod blandit. Mauris malesuada, urna eu tristique mattis, risus ex convallis orci, vitae fermentum lacus quam eget mauris. Cras fermentum lacus vitae scelerisque malesuada. Sed laoreet nulla magna, nec laoreet libero euismod eu. Nunc mattis ex vel sagittis pellentesque. Pellentesque malesuada fermentum iaculis. Sed eget nisl fringilla, maximus dolor auctor, aliquam orci.\n\nAliquam laoreet volutpat purus, sit amet egestas orci fermentum ac. Nunc mollis eu tortor in tincidunt. Aliquam aliquet sodales dapibus. Mauris rutrum sodales tellus id ullamcorper. Donec quis nulla enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi sollicitudin nisl cursus, ullamcorper nisl sit amet, vehicula leo. Etiam quis neque at tellus tincidunt ultricies. Aliquam blandit lacus vel ante efficitur, vitae blandit sapien interdum. Vivamus quis augue non lorem congue ullamcorper quis vel tortor.\n\nNam fermentum purus eu sapien facilisis semper. Proin vel neque malesuada, vehicula erat ut, pellentesque lacus. Sed cursus iaculis elit dictum dignissim. Maecenas ullamcorper eget odio quis consequat. Cras mollis sem ipsum, et molestie magna congue eget. Morbi quis nisi nec ligula porttitor porttitor. In ligula quam, hendrerit vel felis sed, aliquet egestas dui. Mauris id ex sodales, maximus quam pretium, interdum eros. Curabitur vestibulum nulla ullamcorper ante vehicula sollicitudin. Praesent ac erat neque. Proin massa eros, sodales in tincidunt id, molestie sit amet lacus.\n\nDonec hendrerit mollis sem, sed blandit leo lacinia ut. Curabitur vitae congue metus. Morbi volutpat mollis pharetra. Donec malesuada volutpat arcu scelerisque lobortis. Integer at sem blandit, pretium tellus malesuada, interdum tortor. Mauris eget diam sit amet dui pellentesque sollicitudin. Aenean condimentum quam ac sapien mollis hendrerit.\n\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis id dignissim mi, in consectetur justo. Nullam sagittis tempus lobortis. Duis accumsan, metus sit amet aliquam imperdiet, nisl urna posuere eros, vitae ultricies mi turpis sed nulla. Mauris diam lacus, pharetra vitae pharetra sit amet, convallis in ligula. Fusce a mauris tincidunt, vulputate mi imperdiet, mollis tortor. Aenean scelerisque, nisl lobortis sollicitudin commodo, risus tellus tincidunt est, nec tempor ligula ligula sed metus. Donec condimentum ante risus, quis pharetra libero bibendum ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sagittis ligula finibus, ultricies leo a, ultricies dui. Duis sed dui sit amet eros tristique suscipit. Maecenas pellentesque suscipit enim, in sollicitudin nulla mollis vel. Donec a efficitur diam. Pellentesque imperdiet enim et massa mollis, quis mollis turpis dapibus. Curabitur mauris dui, congue tempus laoreet vel, vehicula eu libero. Pellentesque vel ultrices odio.\n\nCras nec odio malesuada nisl venenatis ornare. Quisque lacus est, gravida sed malesuada quis, maximus eget turpis. Etiam id imperdiet nisl. Quisque rutrum massa vitae placerat vehicula. Etiam non felis neque. Praesent a tellus nec felis tincidunt dignissim. Etiam fringilla tortor lacus, nec sagittis nibh lobortis aliquam. Quisque porta placerat.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a aliquam risus. Aenean ac nunc tortor. In lacus tellus, ultrices eu elementum a, finibus vitae purus. Pellentesque ornare in magna non iaculis. Etiam egestas risus in euismod blandit. Mauris malesuada, urna eu tristique mattis, risus ex convallis orci, vitae fermentum lacus quam eget mauris. Cras fermentum lacus vitae scelerisque malesuada. Sed laoreet nulla magna, nec laoreet libero euismod eu. Nunc mattis ex vel sagittis pellentesque. Pellentesque malesuada fermentum iaculis. Sed eget nisl fringilla, maximus dolor auctor, aliquam orci. Aliquam laoreet volutpat purus, sit amet egestas orci fermentum ac. Nunc mollis eu tortor in tincidunt. Aliquam aliquet sodales dapibus. Mauris rutrum sodales tellus id ullamcorper. Donec quis nulla enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi sollicitudin nisl cursus, ullamcorper nisl sit amet, vehicula leo. Etiam quis neque at tellus tincidunt ultricies. Aliquam blandit lacus vel ante efficitur, vitae blandit sapien interdum. Vivamus quis augue non lorem congue ullamcorper quis vel tortor. Nam fermentum purus eu sapien facilisis semper. Proin vel neque malesuada, vehicula erat ut, pellentesque lacus. Sed cursus iaculis elit dictum dignissim. Maecenas ullamcorper eget odio quis consequat. Cras mollis sem ipsum, et molestie magna congue eget. Morbi quis nisi nec ligula porttitor porttitor. In ligula quam, hendrerit vel felis sed, aliquet egestas dui. Mauris id ex sodales, maximus quam pretium, interdum eros. Curabitur vestibulum nulla ullamcorper ante vehicula sollicitudin. Praesent ac erat neque. Proin massa eros, sodales in tincidunt id, molestie sit amet lacus. Donec hendrerit mollis sem, sed blandit leo lacinia ut. Curabitur vitae congue metus. Morbi volutpat mollis pharetra. Donec malesuada volutpat arcu scelerisque lobortis. Integer at sem blandit, pretium tellus malesuada, interdum tortor. Mauris eget diam sit amet dui pellentesque sollicitudin. Aenean condimentum quam ac sapien mollis hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis id dignissim mi, in consectetur justo. Nullam sagittis tempus lobortis. Duis accumsan, metus sit amet aliquam imperdiet, nisl urna posuere eros, vitae ultricies mi turpis sed nulla. Mauris diam lacus, pharetra vitae pharetra sit amet, convallis in ligula. Fusce a mauris tincidunt, vulputate mi imperdiet, mollis tortor. Aenean scelerisque, nisl lobortis sollicitudin commodo, risus tellus tincidunt est, nec tempor ligula ligula sed metus. Donec condimentum ante risus, quis pharetra libero bibendum ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sagittis ligula finibus, ultricies leo a, ultricies dui. Duis sed dui sit amet eros tristique suscipit. Maecenas pellentesque suscipit enim, in sollicitudin nulla mollis vel. Donec a efficitur diam. Pellentesque imperdiet enim et massa mollis, quis mollis turpis dapibus. Curabitur mauris dui, congue tempus laoreet vel, vehicula eu libero. Pellentesque vel ultrices odio. Cras nec odio malesuada nisl venenatis ornare. Quisque lacus est, gravida sed malesuada quis, maximus eget turpis. Etiam id imperdiet nisl. Quisque rutrum massa vitae placerat vehicula. Etiam non felis neque. Praesent a tellus nec felis tincidunt dignissim. Etiam fringilla tortor lacus, nec sagittis nibh lobortis aliquam. Quisque porta placerat.', '2023-03-09 17:06:35', '2023-04-28 13:45:38', 1, 9),
(19, 'Lorem lorem lorem lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh diam, fermentum sit amet metus id, facilisis venenatis neque. Etiam tempus faucibus sapien, id rhoncus urna facilisis eu. Sed varius ullamcorper sem, at bibendum diam scelerisque vel. Pellentesque dapibus tortor id gravida auctor. Aenean nec accumsan metus. Mauris consequat neque diam, elementum dictum nunc semper et. Vestibulum laoreet lectus a est fermentum, non mattis ligula sollicitudin. Praesent et eros volutpat, dapibus erat a, imperdiet risus. Sed pulvinar ante ac ultricies feugiat.\n\nQuisque facilisis felis turpis, id ornare lacus placerat sed. Sed fringilla accumsan nisl, eget maximus libero cursus at. Maecenas eget leo volutpat massa feugiat laoreet. Suspendisse venenatis urna vel ante finibus gravida. Proin mollis nulla eu pretium tincidunt. Integer tristique, mauris id bibendum porta, lectus enim tempor justo, vel dignissim urna odio eu justo. Sed tincidunt bibendum dolor, ac varius lectus tempus sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dapibus sem at sem pharetra vulputate. Morbi laoreet iaculis neque non malesuada. Aliquam erat volutpat.\n\nNullam nisi libero, sollicitudin at porta vitae, convallis at justo. Morbi porttitor sem eu pretium tincidunt. Integer quis nunc in ante condimentum commodo sit amet vulputate arcu. Etiam pulvinar.', '2023-04-03 17:15:22', '2023-04-28 12:28:08', 24, NULL),
(21, 'Lorem lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh diam, fermentum sit amet metus id, facilisis venenatis neque. Etiam tempus faucibus sapien, id rhoncus urna facilisis eu. Sed varius ullamcorper sem, at bibendum diam scelerisque vel. Pellentesque dapibus tortor id gravida auctor. Aenean nec accumsan metus. Mauris consequat neque diam, elementum dictum nunc semper et. Vestibulum laoreet lectus a est fermentum, non mattis ligula sollicitudin. Praesent et eros volutpat, dapibus erat a, imperdiet risus. Sed pulvinar ante ac ultricies feugiat. Quisque facilisis felis turpis, id ornare lacus placerat sed. Sed fringilla accumsan nisl, eget maximus libero cursus at. Maecenas eget leo volutpat massa feugiat laoreet. Suspendisse venenatis urna vel ante finibus gravida. Proin mollis nulla eu pretium tincidunt. Integer tristique, mauris id bibendum porta, lectus enim tempor justo, vel dignissim urna odio eu justo. Sed tincidunt bibendum dolor, ac varius lectus tempus sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dapibus sem at sem pharetra vulputate. Morbi laoreet iaculis neque non malesuada. Aliquam erat volutpat. Nullam nisi libero, sollicitudin at porta vitae, convallis at justo. Morbi porttitor sem eu pretium tincidunt. Integer quis nunc in ante condimentum commodo sit amet vulputate arcu. Etiam pulvinar.', '2023-04-28 13:46:10', NULL, 2, 9),
(22, 'Lorem lorem lorem lorem lorem lorem lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh diam, fermentum sit amet metus id, facilisis venenatis neque. Etiam tempus faucibus sapien, id rhoncus urna facilisis eu. Sed varius ullamcorper sem, at bibendum diam scelerisque vel. Pellentesque dapibus tortor id gravida auctor. Aenean nec accumsan metus. Mauris consequat neque diam, elementum dictum nunc semper et. Vestibulum laoreet lectus a est fermentum, non mattis ligula sollicitudin. Praesent et eros volutpat, dapibus erat a, imperdiet risus. Sed pulvinar ante ac ultricies feugiat. Quisque facilisis felis turpis, id ornare lacus placerat sed. Sed fringilla accumsan nisl, eget maximus libero cursus at. Maecenas eget leo volutpat massa feugiat laoreet. Suspendisse venenatis urna vel ante finibus gravida. Proin mollis nulla eu pretium tincidunt. Integer tristique, mauris id bibendum porta, lectus enim tempor justo, vel dignissim urna odio eu justo. Sed tincidunt bibendum dolor, ac varius lectus tempus sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dapibus sem at sem pharetra vulputate. Morbi laoreet iaculis neque non malesuada. Aliquam erat volutpat. Nullam nisi libero, sollicitudin at porta vitae, convallis at justo. Morbi porttitor sem eu pretium tincidunt. Integer quis nunc in ante condimentum commodo sit amet vulputate arcu. Etiam pulvinar.', '2023-04-28 13:46:35', NULL, 3, 9),
(23, 'Lorem lorem lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh diam, fermentum sit amet metus id, facilisis venenatis neque. Etiam tempus faucibus sapien, id rhoncus urna facilisis eu. Sed varius ullamcorper sem, at bibendum diam scelerisque vel. Pellentesque dapibus tortor id gravida auctor. Aenean nec accumsan metus. Mauris consequat neque diam, elementum dictum nunc semper et. Vestibulum laoreet lectus a est fermentum, non mattis ligula sollicitudin. Praesent et eros volutpat, dapibus erat a, imperdiet risus. Sed pulvinar ante ac ultricies feugiat. Quisque facilisis felis turpis, id ornare lacus placerat sed. Sed fringilla accumsan nisl, eget maximus libero cursus at. Maecenas eget leo volutpat massa feugiat laoreet. Suspendisse venenatis urna vel ante finibus gravida. Proin mollis nulla eu pretium tincidunt. Integer tristique, mauris id bibendum porta, lectus enim tempor justo, vel dignissim urna odio eu justo. Sed tincidunt bibendum dolor, ac varius lectus tempus sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dapibus sem at sem pharetra vulputate. Morbi laoreet iaculis neque non malesuada. Aliquam erat volutpat. Nullam nisi libero, sollicitudin at porta vitae, convallis at justo. Morbi porttitor sem eu pretium tincidunt. Integer quis nunc in ante condimentum commodo sit amet vulputate arcu. Etiam pulvinar.', '2023-04-28 13:47:20', NULL, 25, 9);

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `startEvent` datetime NOT NULL,
  `endEvent` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `event_ibfk_2` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `title`, `location`, `startEvent`, `endEvent`, `createdAt`, `category_id`, `user_id`) VALUES
(3, 'Championnat Normandie', 'Dieppe', '2023-04-14 08:00:00', '2023-04-16 20:00:00', '2023-03-18 11:35:41', 3, NULL),
(12, 'Entrainement PAM', 'Granville', '2023-04-08 17:00:00', '2023-04-08 19:00:00', '2023-04-06 11:59:13', 1, 9),
(15, 'Championnat de France Dame', 'Caen la Mer', '2023-05-17 07:00:00', '2023-05-21 20:00:00', '2023-04-06 23:47:06', 4, NULL),
(16, 'Championnat de France Mid-Dame', 'Ploemeur', '2023-06-15 07:00:00', '2023-06-18 20:00:00', '2023-04-06 23:49:07', 4, 9),
(17, 'Entraînement PAM', 'Golf de Granville', '2023-04-28 17:00:00', '2023-04-28 19:00:00', '2023-04-28 12:22:13', 1, 9),
(18, 'Entraînement PAM', 'Golf de Granville', '2023-06-10 16:30:00', '2023-06-10 18:30:00', '2023-04-28 13:51:03', 1, 9);

-- --------------------------------------------------------

--
-- Structure de la table `pelz`
--

DROP TABLE IF EXISTS `pelz`;
CREATE TABLE IF NOT EXISTS `pelz` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `score` smallint NOT NULL,
  `createdAt` datetime NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pelz`
--

INSERT INTO `pelz` (`id`, `score`, `createdAt`, `user_id`) VALUES
(3, 54, '2023-04-20 15:33:47', 9),
(4, 76, '2022-04-20 15:34:00', 9),
(7, 46, '2022-11-17 21:04:14', 9),
(8, 64, '2022-09-06 21:09:06', 9),
(9, 39, '2022-10-12 21:20:57', 9),
(12, 71, '2022-05-17 00:00:00', 9),
(13, 68, '2022-07-13 13:27:59', 9),
(14, 72, '2022-08-24 13:28:26', 9),
(15, 61, '2023-02-13 13:29:03', 9),
(16, 65, '2022-12-23 13:29:42', 9),
(17, 55, '2022-10-01 13:30:30', 9),
(18, 65, '2023-04-24 13:56:28', 9),
(19, 72, '2023-04-28 13:22:36', 20);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `handicap` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatarName` varchar(255) DEFAULT NULL,
  `isConfirmed` tinyint(1) NOT NULL,
  `favoriteEvent_id` int UNSIGNED DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `favoriteEvent_id` (`favoriteEvent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `firstName`, `lastName`, `birthDate`, `phone`, `handicap`, `avatarName`, `isConfirmed`, `favoriteEvent_id`, `isAdmin`) VALUES
(9, 'dadure.elisa@outlook.com', '$2b$10$a53dA/AgcZdTN39/DqkeVOOyi6H/9QyUYEUkFU8weHCjuhPNwinHe', 'Elisa', 'Dadure', '1998-03-13', '06 34 16 45 34', '9', '1682627210197-5226.jpeg', 1, NULL, 1),
(20, 'nathalie.doe@test.com', '$2b$10$XIwnnSRjbya9GLym3RjZkOCAsLB2vsXH17aPwEI8l.NZt9lRicxiq', 'Nathalie', 'Doe', '1975-07-09', '06 01 00 00 00', '13.2', '1682680940047-avatarNath.jpg', 1, NULL, 0),
(21, 'carole.dupont@test.com', '$2b$10$Ou0YvMuzJ55xJndVGbnukOS6/Rhni3Z0uqPIIKcZ/pZKckxnj8Lci', 'Carole', 'Dupont', '1980-04-10', '06 02 00 00 00', '11.5', '1682682025326-carole.jpg', 1, NULL, 0),
(22, 'isabelle.smith@test.com', '$2b$10$fXn33QCM0BnO/8nGs6sPm.SXzYmvYTIC3ik8PmvEbYxq3Q9Af7rzq', 'Isabelle', 'Smith', '1970-03-27', '06 03 00 00 00', '6.7', NULL, 1, NULL, 0),
(23, 'alix.martin@contact.com', '$2b$10$YPg8ytTJPrSCpMhf3pX2Wu7VVmXqeONn/puaT//REHZKVKZuqHugS', 'Alix', 'Martin', '1985-11-17', '06 04 00 00 00', '6.1', NULL, 1, NULL, 0),
(24, 'armance.durand@test.com', '$2b$10$7CpqtB2PYP0soqqmKzLhx.ZeE/h/rLb3YNRq4.ASMU0KcabAWSS6W', 'Armance', 'Durand', '2001-03-03', '06 05 00 00 00', '2.3', NULL, 1, NULL, 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_document` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `document_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_event` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `pelz`
--
ALTER TABLE `pelz`
  ADD CONSTRAINT `pelz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`favoriteEvent_id`) REFERENCES `category_event` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
