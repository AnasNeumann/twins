drop database if exists abdevfr_theTwins;

create database abdevfr_theTwins;
use abdevfr_theTwins;

CREATE TABLE IF NOT EXISTS `userTwins` (
	`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`pseudo` varchar(30),
	`password` varchar(30) NOT NULL,
	CONSTRAINT PKuser PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `partieTwins` (
	`idPartie` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    CONSTRAINT PKpartie PRIMARY KEY (idPartie)
);

CREATE TABLE IF NOT EXISTS `scoreTwins` (
	`idScore` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`idPartie` int(10) NOT NULL,
	`idUser` varchar(30) NOT NULL,
	`score`  int(15)  NOT NULL DEFAULT 0,
	CONSTRAINT PKscore PRIMARY KEY (idScore),
	CONSTRAINT FKscoreUser FOREIGN KEY (idUser) REFERENCES userTwins (id),
	CONSTRAINT FKscorePartie FOREIGN KEY (idPartie) REFERENCES partieTwins (idPartie)
);