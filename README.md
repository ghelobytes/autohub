# Project
A demo project called AuthoHub. Built using Node.js. Uses MySQL as backend. Runs on Windows or Linux.

# Installation

## Database setup

Install MySQL and create the following objects:

```
------------------------------------
--  DATABASE autohub
------------------------------------

CREATE DATABASE autohub;
CREATE USER 'demo'@'localhost' IDENTIFIED BY 'demo';
GRANT ALL PRIVILEGES ON autohub.* TO 'newuser'@'localhost';

------------------------------------
--  TABLE exchangeRate
------------------------------------

CREATE TABLE `exchangeRate`
(
   `dealershipCode`      varchar(20),
   `fromDate`            date,
   `toDate`              date,
   `eliteRate`           double(4, 2),
   `platinumEliteRate`   double(4, 2)
);

------------------------------------
--  TABLE members
------------------------------------

CREATE TABLE members
(
   lastname          varchar(80),
   firstname         varchar(80),
   mobile            varchar(20),
   email             varchar(50),
   `pointsBalance`   bigint(5),
   id                int(10),
   `orNumber`        varchar(20),
   `orAmount`        double(10, 2),
   `cashPaid`        double(10, 2),
   type              char(1),
   `cardNumber`      varchar(20),
   middlename        varchar(80),
   mobile2           varchar(20),
   address           text,
   comments          text
);


------------------------------------
--  TABLE pointsHistory
------------------------------------

CREATE TABLE `pointsHistory`
(
   `orNumber`            varchar(10),
   `orAmount`            double,
   `cashPaid`            double,
   `newPointsBalance`    bigint(5),
   `cardNumber`          varchar(20),
   `transactionDate`     datetime,
   `transactionType`     varchar(20),
   user                  varchar(20),
   `pointsRedeemed`      int(10),
   `pointsAccumulated`   int(10)
);


------------------------------------
--  TABLE transaction
------------------------------------

CREATE TABLE transaction
(
   username   varchar(50),
   type       varchar(10),
   data       text,
   stamp      datetime
);


------------------------------------
--  TABLE users
------------------------------------

CREATE TABLE users
(
   username           varchar(20),
   password           varchar(100),
   fullname           varchar(200),
   role               varchar(20),
   `dealershipCode`   varchar(20),
   `approverCode`     varchar(20),
   active             tinyint(1),
   location           varchar(20)
);

------------------------------------
--  CREATE USERS
------------------------------------

CREATE USER 'demo'@'localhost' IDENTIFIED BY 'demo';
GRANT ALL PRIVILEGES ON *.* TO 'demo'@'localhost' WITH GRANT OPTION;

```

Assuming:

```
mysql:
    host: localhost
    user: demo
    password: demo
    database: autohub
```

## Application setup

1. Install Node.js from ```http://nodejs.org/```
2. Install forever. From the command line: ```npm install forever -g```
3. Clone autohub app: git clone https://github.com/ghelobytes/autohub.git
4. Start app: ```forever start server.js```
5. Visit ```http://localhost:8080/app``` from the browser
