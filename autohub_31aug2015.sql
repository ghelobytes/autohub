CREATE DATABASE  IF NOT EXISTS `autohub` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `autohub`;
-- MySQL dump 10.13  Distrib 5.5.44, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: autohub
-- ------------------------------------------------------
-- Server version	5.5.44-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exchangeRate`
--

DROP TABLE IF EXISTS `exchangeRate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchangeRate` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dealershipCode` varchar(20) DEFAULT NULL,
  `fromDate` date DEFAULT NULL,
  `toDate` date DEFAULT NULL,
  `eliteRate` double(4,2) DEFAULT NULL,
  `platinumEliteRate` double(4,2) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchangeRate`
--

LOCK TABLES `exchangeRate` WRITE;
/*!40000 ALTER TABLE `exchangeRate` DISABLE KEYS */;
INSERT INTO `exchangeRate` VALUES (1,'HONDA','2015-01-01','2020-12-31',20.00,15.00),(2,'HONDA','2015-01-01','2020-12-31',20.00,15.00),(3,'NISSAN','2015-01-01','2020-12-31',20.00,15.00),(4,'HONDA','2015-01-01','2020-12-31',10.00,7.50),(5,'FGC','2015-01-01','2020-12-31',20.00,15.00),(6,'FMLA','2015-01-01','2020-12-31',20.00,15.00),(7,'FBOH','2015-01-01','2020-12-31',20.00,15.00),(8,'FDAV','2015-01-01','2020-12-31',20.00,15.00),(9,'FCDO','2015-01-01','2020-12-31',20.00,15.00),(10,'FGSAN','2015-01-01','2020-12-31',20.00,15.00),(11,'FZAM','2015-01-01','2020-12-31',20.00,15.00),(12,'HPT','2015-01-01','2020-12-31',20.00,15.00),(13,'MCDO','2015-01-01','2020-12-31',20.00,15.00),(14,'MDAV','2015-01-01','2020-12-31',20.00,15.00),(15,'NGO','2015-01-01','2020-12-31',20.00,15.00),(16,'NGQA','2015-01-01','2020-12-31',20.00,15.00),(17,'MINIGC','2015-01-01','2020-12-31',20.00,15.00),(18,'MINICEB','2015-01-01','2020-12-31',20.00,15.00),(19,'RRMLA','2015-01-01','2020-12-31',20.00,15.00),(20,'VKOOL','2015-01-01','2020-12-31',20.00,15.00),(21,'CLICK','2015-01-01','2020-12-31',20.00,15.00),(22,'ACCS','2015-01-01','2020-12-31',20.00,15.00),(23,'AHUSED','2015-01-01','2020-12-31',20.00,15.00),(24,'APE','2015-01-01','2020-12-31',20.00,15.00),(25,'MINIGH','2015-01-01','2020-12-31',20.00,15.00),(26,'MOTOGH','2015-01-01','2020-12-31',20.00,15.00),(27,'FPAL','2015-01-01','2020-12-31',20.00,15.00);
/*!40000 ALTER TABLE `exchangeRate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchangeRate_old`
--

DROP TABLE IF EXISTS `exchangeRate_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchangeRate_old` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dealershipCode` varchar(20) DEFAULT NULL,
  `fromDate` date DEFAULT NULL,
  `toDate` date DEFAULT NULL,
  `eliteRate` double(4,2) DEFAULT NULL,
  `platinumEliteRate` double(4,2) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchangeRate_old`
--

LOCK TABLES `exchangeRate_old` WRITE;
/*!40000 ALTER TABLE `exchangeRate_old` DISABLE KEYS */;
INSERT INTO `exchangeRate_old` VALUES (1,'HONDA','2014-07-01','2014-08-30',20.00,15.00),(2,'HONDA','2014-05-01','2015-03-31',20.00,15.00),(3,'NISSAN','2014-07-01','2014-08-30',20.00,15.00),(4,'HONDA','2015-01-14','2015-01-19',10.00,7.50),(5,'FGC','2015-01-01','2020-12-31',20.00,15.00),(6,'FMLA','2015-01-01','2020-12-31',20.00,15.00),(7,'FBOH','2015-01-01','2020-12-31',20.00,15.00),(8,'FDAV','2015-01-01','2020-12-31',20.00,15.00),(9,'FCDO','2015-01-01','2020-12-31',20.00,15.00),(10,'FGSAN','2015-01-01','2020-12-31',20.00,15.00),(11,'FZAM','2015-01-01','2020-12-31',20.00,15.00),(12,'HPT','2015-01-01','2020-12-31',20.00,15.00),(13,'MCDO','2015-01-01','2020-12-31',20.00,15.00),(14,'MDAV','2015-01-01','2020-12-31',20.00,15.00),(15,'NGO','2015-01-01','2020-12-31',20.00,15.00),(16,'NGQA','2015-01-01','2020-12-31',20.00,15.00),(17,'MINIGC','2015-01-01','2020-12-31',20.00,15.00),(18,'MINICEB','2015-01-01','2020-12-31',20.00,15.00),(19,'RRMLA','2015-01-01','2020-12-31',20.00,15.00),(20,'VKOOL','2015-01-01','2020-12-31',20.00,15.00),(21,'CLICK','2015-01-01','2020-12-31',20.00,15.00),(22,'ACCS','2015-01-01','2020-12-31',20.00,15.00),(23,'AHUSED','2015-01-01','2020-12-31',20.00,15.00),(24,'APE','2015-01-01','2020-12-31',20.00,15.00),(25,'MINIGH','2015-01-01','2020-12-31',20.00,15.00),(26,'MOTOGH','2015-01-01','2020-12-31',20.00,15.00),(27,'FPAL','2015-01-01','2020-12-31',20.00,15.00);
/*!40000 ALTER TABLE `exchangeRate_old` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `lastname` varchar(80) DEFAULT NULL,
  `firstname` varchar(80) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pointsBalance` bigint(10) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orNumber` varchar(20) DEFAULT NULL,
  `orAmount` double(10,2) DEFAULT NULL,
  `cashPaid` double(10,2) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  `cardNumber` varchar(16) DEFAULT NULL,
  `middlename` varchar(80) DEFAULT NULL,
  `mobile2` varchar(20) DEFAULT NULL,
  `address` text,
  `comments` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES ('Arboleda','Angelo','0947 198 86 9700','ghelobytes@yahoo.com',215,2,'2',100.00,100.00,'P','0002000200020002',NULL,'884 285555','addresssom addressxxxx',NULL),('Sibala','Jonathan','09177028994','jsibala@autohubgroup.com',10332,13,'42343',100000.00,90000.00,'P','0001000100010001','Junia','09165948624','Philippines',NULL),('Member1','Member1','09170000001','member1@gmail.com',65500,14,'ds3242',100000.00,50000.00,'E','0000000000000001','Member1','09170000002','123 32nd St, Bonifacio Global City, Taguig City 1634','dummy record'),('Member2','Member2','09170000002','member2@gmail.com',33,15,'dsf2',745000.00,501.00,'P','0000000000000002','Member2','09170000002','2 santo nino st, brgy mabato, pasig','sadf'),('Member3','Member3','09170000003','member3@gmail.com',0,16,NULL,NULL,NULL,'P','0000000000000003','Member3','09170000004','3 santo nino, brgy bato, taguig city','asdf');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pointsHistory`
--

DROP TABLE IF EXISTS `pointsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pointsHistory` (
  `orNumber` varchar(10) DEFAULT NULL,
  `orAmount` double DEFAULT NULL,
  `cashPaid` double DEFAULT NULL,
  `newPointsBalance` int(11) DEFAULT NULL,
  `cardNumber` varchar(20) NOT NULL,
  `transactionDate` date NOT NULL,
  `transactionType` varchar(20) NOT NULL,
  `user` varchar(20) NOT NULL,
  `pointsAccumulated` int(20) DEFAULT NULL,
  `pointsRedeemed` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pointsHistory`
--

LOCK TABLES `pointsHistory` WRITE;
/*!40000 ALTER TABLE `pointsHistory` DISABLE KEYS */;
INSERT INTO `pointsHistory` VALUES ('100101',1300000,1300000,65500,'0000000000000001','2015-02-12','New vehicle','C1ACCS',65000,NULL),('434',65500,NULL,NULL,'0000000000000001','2015-02-16','Parts & Service','C1ACCS',NULL,NULL),('q22',65500,NULL,NULL,'0000000000000001','2015-02-16','Parts & Service','C1ACCS',NULL,NULL),('1231a',100000,5000,744499,'0000000000000002','2015-02-16','Parts & Service','C1FGC',333,95000),('dsf2',745000,501,33,'0000000000000002','2015-02-16','Parts & Service','C1FGC',33,744499);
/*!40000 ALTER TABLE `pointsHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `username` varchar(50) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `data` text,
  `stamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES ('C1ACCS','INSERT','{\"lastname\":\"Member1\",\"firstname\":\"Member1\",\"middlename\":\"Member1\",\"mobile\":\"09170000001\",\"mobile2\":\"09170000002\",\"email\":\"member1@gmail.com\",\"pointsBalance\":0,\"cardNumber\":\"0000000000000001\",\"address\":\"123 32nd St, Bonifacio Global City, Taguig City 1634\",\"type\":\"E\",\"comments\":\"dummy record\",\"id\":14,\"orNumber\":\"\",\"orAmount\":0,\"cashPaid\":0,\"transactionDate\":null,\"transactionType\":\"\",\"pointsRedeemed\":0,\"pointsAccumulated\":0}','2015-02-11 21:05:09'),('C1ACCS','INSERT','{\"lastname\":\"Member2\",\"firstname\":\"Member2\",\"middlename\":\"Member2\",\"mobile\":\"09170000002\",\"mobile2\":\"09170000002\",\"email\":\"member2@gmail.com\",\"pointsBalance\":0,\"cardNumber\":\"0000000000000002\",\"address\":\"2 santo nino st, brgy mabato, pasig\",\"type\":\"P\",\"comments\":\"sadf\",\"id\":15,\"orNumber\":\"\",\"orAmount\":0,\"cashPaid\":0,\"transactionDate\":null,\"transactionType\":\"\",\"pointsRedeemed\":0,\"pointsAccumulated\":0}','2015-02-12 01:36:38'),('C1ACCS','UPDATE','{\"before\":{\"pointsBalance\":0,\"id\":15},\"after\":{\"pointsBalance\":500,\"id\":15}}','2015-02-12 01:37:37'),('C1ACCS','UPDATE','{\"before\":{\"cashPaid\":null,\"pointsBalance\":500,\"orNumber\":null,\"orAmount\":null,\"cardNumber\":\"0000000000000002\",\"id\":15},\"after\":{\"cashPaid\":1200000,\"pointsBalance\":80500,\"orNumber\":\"10001\",\"orAmount\":1200000,\"cardNumber\":\"0000000000000002\",\"transactionDate\":\"02-12-2015\",\"pointsAccumulated\":80000,\"id\":15}}','2015-02-12 01:38:04'),('C1ACCS','UPDATE','{\"before\":{\"pointsBalance\":0,\"id\":14},\"after\":{\"pointsBalance\":500,\"id\":14}}','2015-02-12 01:39:56'),('C1ACCS','UPDATE','{\"before\":{\"cashPaid\":null,\"pointsBalance\":500,\"orNumber\":null,\"orAmount\":null,\"cardNumber\":\"0000000000000001\",\"id\":14},\"after\":{\"cashPaid\":1300000,\"pointsBalance\":65500,\"orNumber\":\"100101\",\"orAmount\":1300000,\"cardNumber\":\"0000000000000001\",\"transactionDate\":\"02-12-2015\",\"transactionType\":\"New vehicle\",\"pointsAccumulated\":65000,\"id\":14}}','2015-02-12 01:40:33'),('C1ACCS','INSERT','{\"lastname\":\"Member3\",\"firstname\":\"Member3\",\"middlename\":\"Member3\",\"mobile\":\"09170000003\",\"mobile2\":\"09170000004\",\"email\":\"member3@gmail.com\",\"pointsBalance\":0,\"cardNumber\":\"0000000000000003\",\"address\":\"3 santo nino, brgy bato, taguig city\",\"type\":\"P\",\"comments\":\"asdf\",\"id\":16,\"orNumber\":\"\",\"orAmount\":0,\"cashPaid\":0,\"transactionDate\":null,\"transactionType\":\"\",\"pointsRedeemed\":0,\"pointsAccumulated\":0}','2015-02-12 01:42:04'),('C1ACCS','UPDATE','{\"before\":{\"orNumber\":\"100101\",\"orAmount\":1300000,\"cardNumber\":\"0000000000000001\",\"id\":14},\"after\":{\"orNumber\":\"434\",\"orAmount\":65500,\"cardNumber\":\"0000000000000001\",\"transactionDate\":\"02-16-2015\",\"transactionType\":\"Parts & Service\",\"id\":14}}','2015-02-15 20:51:31'),('C1ACCS','UPDATE','{\"before\":{\"orNumber\":\"434\",\"orAmount\":65500,\"cardNumber\":\"0000000000000001\",\"id\":14},\"after\":{\"orNumber\":\"q22\",\"orAmount\":65500,\"cardNumber\":\"0000000000000001\",\"transactionDate\":\"02-16-2015\",\"transactionType\":\"Parts & Service\",\"id\":14}}','2015-02-15 20:52:49'),('C1FGC','UPDATE','{\"before\":{\"cashPaid\":1200000,\"pointsBalance\":80500,\"orNumber\":\"10001\",\"orAmount\":1200000,\"cardNumber\":\"0000000000000002\",\"id\":15},\"after\":{\"cashPaid\":80500,\"pointsBalance\":839166,\"orNumber\":\"a111\",\"orAmount\":100000,\"cardNumber\":\"0000000000000002\",\"transactionDate\":\"02-16-2015\",\"pointsRedeemed\":19500,\"pointsAccumulated\":53666,\"id\":15}}','2015-02-15 22:04:52'),('C1FGC','UPDATE','{\"before\":{\"cashPaid\":80500,\"pointsBalance\":839166,\"orNumber\":\"a111\",\"orAmount\":100000,\"cardNumber\":\"0000000000000002\",\"id\":15},\"after\":{\"cashPaid\":5000,\"pointsBalance\":744499,\"orNumber\":\"1231a\",\"orAmount\":100000,\"cardNumber\":\"0000000000000002\",\"transactionDate\":\"02-16-2015\",\"transactionType\":\"Parts & Service\",\"pointsRedeemed\":95000,\"pointsAccumulated\":333,\"id\":15}}','2015-02-15 22:10:46'),('C1FGC','UPDATE','{\"before\":{\"cashPaid\":5000,\"pointsBalance\":744499,\"orNumber\":\"1231a\",\"orAmount\":100000,\"cardNumber\":\"0000000000000002\",\"id\":15},\"after\":{\"cashPaid\":501,\"pointsBalance\":33,\"orNumber\":\"dsf2\",\"orAmount\":745000,\"cardNumber\":\"0000000000000002\",\"transactionDate\":\"02-16-2015\",\"transactionType\":\"Parts & Service\",\"pointsRedeemed\":744499,\"pointsAccumulated\":33,\"id\":15}}','2015-02-15 22:12:50'),('C1FGC','UPDATE','{\"before\":{\"cashPaid\":1300000,\"orNumber\":\"q22\",\"orAmount\":65500,\"cardNumber\":\"0000000000000001\",\"id\":14},\"after\":{\"cashPaid\":50000,\"orNumber\":\"ds3242\",\"orAmount\":100000,\"cardNumber\":\"0000000000000001\",\"transactionDate\":\"02-17-2015\",\"id\":14}}','2015-02-17 01:38:36'),('C1ACCS','UPDATE','{\"before\":{\"cashPaid\":15,\"pointsBalance\":203,\"orNumber\":\"1\",\"orAmount\":15,\"cardNumber\":\"0002000200020002\",\"id\":2},\"after\":{\"cashPaid\":100,\"pointsBalance\":209,\"orNumber\":\"1\",\"orAmount\":100,\"cardNumber\":\"0002000200020002\",\"transactionDate\":\"02-21-2015\",\"pointsAccumulated\":6,\"id\":2}}','2015-02-21 02:51:57'),('C1ACCS','UPDATE','{\"before\":{\"cashPaid\":100,\"pointsBalance\":209,\"orNumber\":\"1\",\"orAmount\":100,\"cardNumber\":\"0002000200020002\",\"id\":2},\"after\":{\"cashPaid\":100,\"pointsBalance\":215,\"orNumber\":\"2\",\"orAmount\":100,\"cardNumber\":\"0002000200020002\",\"transactionDate\":\"02-21-2015\",\"pointsAccumulated\":6,\"id\":2}}','2015-02-21 02:52:38');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `fullname` varchar(200) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `approverCode` varchar(20) DEFAULT NULL,
  `dealershipCode` varchar(20) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('jonathan','jonathan','Jonathan Sibala',1,NULL,'HONDA','SYSAD','LOC A'),('cashier1','cashier1','Cashier One',1,NULL,'HONDA','CASHIER','LOC C'),('supervisor1','supervisor1','Supervisor One',1,'4563','HONDA','SUPERVISOR','LOC A'),('cashier2','cashier2','Cashier Two',1,NULL,'NISSAN','CASHIER','LOC A'),('cashier3','cashier3','Cashier Three',0,NULL,'NISSAN','CASHIER','LOC C'),('C1ACCS','cashier','Cashier 1 ACCS',1,NULL,'ACCS','CASHIER','ACCS'),('C1AHUSED','cashier','Cashier 1 Autohub Used Cars',1,NULL,'AHUSED','CASHIER','AHUSED'),('C1APE','cashier','Cashier 1 APE',1,NULL,'APE','CASHIER','APE'),('C1CLICK','cashier','Cashier 1 Click',1,NULL,'CLICK','CASHIER','CLICK'),('C1FBOH','cashier','Cashier 1 Ford Bohol',1,NULL,'FBOH','CASHIER','FBOH'),('C1FCDO','cashier','Cashier 1 Ford Cagayan de Oro',1,NULL,'FCDO','CASHIER','FCDO'),('C1FDAV','cashier','Cashier 1 Ford Davao',1,NULL,'FDAV','CASHIER','FDAV'),('C1FGC','cashier','Cashier 1 Ford Global City',1,NULL,'FGC','CASHIER','FGC'),('C1FGSAN','cashier','Cashier 1 Ford General Santos',1,NULL,'FGSAN','CASHIER','FGSAN'),('C1FMLA','cashier','Cashier 1 Ford Manila',1,NULL,'FMLA','CASHIER','FMLA'),('C1FPAL','cashier','Cashier 1 Ford Palawan',1,NULL,'FPAL','CASHIER','FPAL'),('C1FZAM','cashier','Cashier 1 Ford Zamboanga',1,NULL,'FZAM','CASHIER','FZAM'),('C1HPT','cashier','Cashier 1 Hyundai Pasong Tamo',1,NULL,'HPT','CASHIER','HPT'),('C1MCDO','cashier','Cashier 1 Mazda Cagayan de Oro',1,NULL,'MCDO','CASHIER','MCDO'),('C1MDAV','cashier','Cashier 1 Mazda Davao',1,NULL,'MDAV','CASHIER','MDAV'),('C1MINICEB','cashier','Cashier 1 MINI Cebu',1,NULL,'MINICEB','CASHIER','MINICEB'),('C1MINIGC','cashier','Cashier 1 MINI Global City',1,NULL,'MINIGC','CASHIER','MINIGC'),('C1MINIGH','cashier','Cashier 1 Mini Greenhills',1,NULL,'MINIGH','CASHIER','MINIGH'),('C1MOTOGH','cashier','Cashier 1 Motoitalia Greenhills',1,NULL,'MOTOGH','CASHIER','MOTOGH'),('C1NGO','cashier','Cashier 1 Nissan Gallery Ortigas',1,NULL,'NGO','CASHIER','NGO'),('C1NGQA','cashier','Cashier 1 Nissan Gallery Quezon Avenue',1,NULL,'NGQA','CASHIER','NGQA'),('C1RRMLA','cashier','Cashier 1 Rolls-Royce Manila',1,NULL,'RRMLA','CASHIER','RRMLA'),('C1VKOOL','cashier','Cashier 1 V-Kool',1,NULL,'VKOOL','CASHIER','VKOOL'),('C2ACCS','cashier','Cashier 2 ACCS',1,NULL,'ACCS','CASHIER','ACCS'),('C2AHUSED','cashier','Cashier 2 Autohub Used Cars',1,NULL,'AHUSED','CASHIER','AHUSED'),('C2APE','cashier','Cashier 2 APE',1,NULL,'APE','CASHIER','APE'),('C2CLICK','cashier','Cashier 2 Click',1,NULL,'CLICK','CASHIER','CLICK'),('C2FBOH','cashier','Cashier 2 Ford Bohol',1,NULL,'FBOH','CASHIER','FBOH'),('C2FCDO','cashier','Cashier 2 Ford Cagayan de Oro',1,NULL,'FCDO','CASHIER','FCDO'),('C2FDAV','cashier','Cashier 2 Ford Davao',1,NULL,'FDAV','CASHIER','FDAV'),('C2FGC','cashier','Cashier 2 Ford Global City',1,NULL,'FGC','CASHIER','FGC'),('C2FGSAN','cashier','Cashier 2 Ford General Santos',1,NULL,'FGSAN','CASHIER','FGSAN'),('C2FMLA','cashier','Cashier 2 Ford Manila',1,NULL,'FMLA','CASHIER','FMLA'),('C2FPAL','cashier','Cashier 2 Ford Palawan',1,NULL,'FPAL','CASHIER','FPAL'),('C2FZAM','cashier','Cashier 2 Ford Zamboanga',1,NULL,'FZAM','CASHIER','FZAM'),('C2HPT','cashier','Cashier 2 Hyundai Pasong Tamo',1,NULL,'HPT','CASHIER','HPT'),('C2MCDO','cashier','Cashier 2 Mazda Cagayan de Oro',1,NULL,'MCDO','CASHIER','MCDO'),('C2MDAV','cashier','Cashier 2 Mazda Davao',1,NULL,'MDAV','CASHIER','MDAV'),('C2MINICEB','cashier','Cashier 2 MINI Cebu',1,NULL,'MINICEB','CASHIER','MINICEB'),('C2MINIGC','cashier','Cashier 2 MINI Global City',1,NULL,'MINIGC','CASHIER','MINIGC'),('C2MINIGH','cashier','Cashier 2 Mini Greenhills',1,NULL,'MINIGH','CASHIER','MINIGH'),('C2MOTOGH','cashier','Cashier 2 Motoitalia Greenhills',1,NULL,'MOTOGH','CASHIER','MOTOGH'),('C2NGO','cashier','Cashier 2 Nissan Gallery Ortigas',1,NULL,'NGO','CASHIER','NGO'),('C2NGQA','cashier','Cashier 2 Nissan Gallery Quezon Avenue',1,NULL,'NGQA','CASHIER','NGQA'),('C2RRMLA','cashier','Cashier 2 Rolls-Royce Manila',1,NULL,'RRMLA','CASHIER','RRMLA'),('C2VKOOL','cashier','Cashier 2 V-Kool',1,NULL,'VKOOL','CASHIER','VKOOL'),('S1ACCS','svisor','Supervisor 1 ACCS',1,'1000','ACCS','SUPERVISOR','ACCS'),('S1AHUSED','svisor','Supervisor 1 Autohub Used Cars',1,'1000','AHUSED','SUPERVISOR','AHUSED'),('S1APE','svisor','Supervisor 1 APE',1,'1000','APE','SUPERVISOR','APE'),('S1CLICK','svisor','Supervisor 1 Click',1,'1000','CLICK','SUPERVISOR','CLICK'),('S1FBOH','svisor','Supervisor 1 Ford Bohol',1,'1000','FBOH','SUPERVISOR','FBOH'),('S1FCDO','svisor','Supervisor 1 Ford Cagayan de Oro',1,'1000','FCDO','SUPERVISOR','FCDO'),('S1FDAV','svisor','Supervisor 1 Ford Davao',1,'1000','FDAV','SUPERVISOR','FDAV'),('S1FGC','svisor','Supervisor 1 Ford Global City',1,'1000','FGC','SUPERVISOR','FGC'),('S1FGSAN','svisor','Supervisor 1 Ford General Santos',1,'1000','FGSAN','SUPERVISOR','FGSAN'),('S1FMLA','svisor','Supervisor 1 Ford Manila',1,'1000','FMLA','SUPERVISOR','FMLA'),('S1FPAL','svisor','Supervisor 1 Ford Palawan',1,'1000','FPAL','SUPERVISOR','FPAL'),('S1FZAM','svisor','Supervisor 1 Ford Zamboanga',1,'1000','FZAM','SUPERVISOR','FZAM'),('S1HPT','svisor','Supervisor 1 Hyundai Pasong Tamo',1,'1000','HPT','SUPERVISOR','HPT'),('S1MCDO','svisor','Supervisor 1 Mazda Cagayan de Oro',1,'1000','MCDO','SUPERVISOR','MCDO'),('S1MDAV','svisor','Supervisor 1 Mazda Davao',1,'1000','MDAV','SUPERVISOR','MDAV'),('S1MINICEB','svisor','Supervisor 1 MINI Cebu',1,'1000','MINICEB','SUPERVISOR','MINICEB'),('S1MINIGC','svisor','Supervisor 1 MINI Global City',1,'1000','MINIGC','SUPERVISOR','MINIGC'),('S1MINIGH','svisor','Supervisor 1 Mini Greenhills',1,'1000','MINIGH','SUPERVISOR','MINIGH'),('S1MOTOGH','svisor','Supervisor 1 Motoitalia Greenhills',1,'1000','MOTOGH','SUPERVISOR','MOTOGH'),('S1NGO','svisor','Supervisor 1 Nissan Gallery Ortigas',1,'1000','NGO','SUPERVISOR','NGO'),('S1NGQA','svisor','Supervisor 1 Nissan Gallery Quezon Avenue',1,'1000','NGQA','SUPERVISOR','NGQA'),('S1RRMLA','svisor','Supervisor 1 Rolls-Royce Manila',1,'1000','RRMLA','SUPERVISOR','RRMLA'),('S1VKOOL','svisor','Supervisor 1 V-Kool',1,'1000','VKOOL','SUPERVISOR','VKOOL');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-31  1:36:25

