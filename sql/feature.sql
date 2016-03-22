-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2016 at 04:08 AM
-- Server version: 5.6.25
-- PHP Version: 5.5.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `feature`
--

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE IF NOT EXISTS `features` (
  `ID` int(200) NOT NULL,
  `PROJECT_ID` int(200) NOT NULL,
  `DEVELOPER_ID` int(200) NOT NULL,
  `TITLE` varchar(255) NOT NULL,
  `DESCRIPTION` text NOT NULL,
  `MOCKUP_IMGS` text NOT NULL,
  `START_DATE` date NOT NULL,
  `FINISH_DATE` date NOT NULL,
  `STATUS` enum('OPEN','INPROGRESS','ONHOLD','FINISHED') NOT NULL DEFAULT 'OPEN'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`ID`, `PROJECT_ID`, `DEVELOPER_ID`, `TITLE`, `DESCRIPTION`, `MOCKUP_IMGS`, `START_DATE`, `FINISH_DATE`, `STATUS`) VALUES
(1, 7, 1, 'Users module', 'Users module will incorporate creation, authentication and access control for all the users who will be using the system', '', '2016-02-01', '2016-02-16', 'INPROGRESS'),
(2, 7, 1, 'Inventory Module', 'Inventory module will incorporate creation, authentication and access control for all the inventories in the system', '', '2016-02-17', '2016-02-29', 'INPROGRESS');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `ID` int(200) NOT NULL,
  `TITLE` varchar(255) NOT NULL,
  `DESCRIPTION` text NOT NULL,
  `LEAD` int(255) NOT NULL,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  `STATUS` enum('ACTIVE','INACTIVE','ONHOLD') NOT NULL DEFAULT 'ACTIVE',
  `IS_REMOVED` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ID`, `TITLE`, `DESCRIPTION`, `LEAD`, `START_DATE`, `END_DATE`, `STATUS`, `IS_REMOVED`) VALUES
(1, 'EMS Based App Rendering Portal', 'EMS Based App Rendering PortalEMS Based App Rendering PortalEMS Based App Rendering PortalEMS Based App Rendering Portal', 4, '2016-01-12', '2016-02-16', 'ONHOLD', 0),
(2, 'Tender Services', 'Tender ServicesTender ServicesTender ServicesTender Services', 2, '2016-01-12', '0000-00-00', 'ACTIVE', 0),
(3, 'Admin Data entry portal for Housing Information', 'Admin Data entry portal for Housing InformationAdmin Data entry portal for Housing InformationAdmin Data entry portal for Housing InformationAdmin Data entry portal for Housing Information', 1, '2016-01-12', '2016-02-03', 'INACTIVE', 0),
(4, 'Library of Reports', 'Library of ReportsLibrary of ReportsLibrary of ReportsLibrary of Reports', 3, '2016-01-12', '0000-00-00', 'ACTIVE', 0),
(5, 'Housing Data Export System', 'Housing Data Export SystemHousing Data Export SystemHousing Data Export SystemHousing Data Export System', 5, '2016-01-12', '0000-00-00', 'ACTIVE', 0),
(6, 'EMS Based App Rendering Portal', 'EMS Based App Rendering PortalEMS Based App Rendering PortalEMS Based App Rendering PortalEMS Based App Rendering Portal', 1, '2016-01-12', '0000-00-00', 'ACTIVE', 1),
(7, 'GIS Based Slum Management System', 'GIS Based Slum Management System', 1, '2016-02-09', '2016-05-05', 'INACTIVE', 0),
(8, 'MIS Info for Slum Management System', 'MIS Info for Slum Management System projected system for MIS purposes only.', 1, '2016-01-11', '2016-03-28', 'ONHOLD', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(200) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `FIRSTNAME` varchar(255) NOT NULL,
  `LASTNAME` varchar(255) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `ROLE` enum('DEVELOPER','DESIGNER','TESTER','ADMIN') NOT NULL,
  `IS_REMOVE` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `EMAIL`, `FIRSTNAME`, `LASTNAME`, `USERNAME`, `ROLE`, `IS_REMOVE`) VALUES
(1, 'aaditya.gandhare@codersltd.com', 'Aaditya', 'Gandhare', 'aaditya91', 'DEVELOPER', 0),
(2, 'yamini@codersltd.com', 'Yamini', 'Randhak', 'yamini1925', 'TESTER', 0),
(3, 'vishal@codersltd.com', 'vishal', 'shankar', 'vishal123', 'ADMIN', 1),
(4, 'ajay@codersltd.com', 'ajay', 'shrivastav', 'ajay', 'DEVELOPER', 0),
(5, 'rashmi91@codersltd.com', 'rashmi', 'mishra', 'rashmi91', 'TESTER', 1),
(6, 'nilesh@codersltd.com', 'nilesh', 'kale', 'nilesh', 'DEVELOPER', 1),
(7, 'kshitij@codersltd.com', 'kshitij', 'sinha', 'kshitij', 'DEVELOPER', 1),
(8, 'shanu@codersltd.com', 'shanu', 'mohabansi', 'shanu', 'ADMIN', 0),
(9, 'mugdha@codersltd.com', 'mugdha', 'parate', 'mugdha', 'ADMIN', 0),
(10, 'shreerekha@codersltd.com', 'shreerekha', 'setu', 'shreerekha', 'ADMIN', 1),
(11, 'atish@codersltd.com', 'aatish', 'kalpande', 'atish', 'DESIGNER', 0),
(12, 'komal@codersltd.com', 'komal', 'humane', 'komal', 'DESIGNER', 1),
(13, 'pratik@codersltd.com', 'pratik', 'naik', 'pratik', 'DEVELOPER', 0),
(14, 'prasad@codersltd.com', 'prasad', 'godbole', 'prasad', 'DEVELOPER', 0),
(15, 'priyank@codersltd.com', 'priyanka', 'm', 'priyank', 'ADMIN', 1),
(16, 'manasig@codersltd.com', 'manasi', 'jalgaonkar', 'manasig', 'ADMIN', 0),
(17, 'yashaswini@codersltd.com', 'yashaswini', 'g', 'yashaswini', 'ADMIN', 1),
(18, 'kartik@gmail.com', 'kartik', 'bhandakkar', 'kartik', 'DEVELOPER', 1),
(19, 'nikesh@gmail.com', 'nikesh', 'pakhale', 'nikesh', 'DESIGNER', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
