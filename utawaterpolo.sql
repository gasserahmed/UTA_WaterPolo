-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2017 at 11:06 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `utawaterpolo`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `getEventList` (IN `uta_id` CHAR(10))  BEGIN

SET SQL_SAFE_UPDATES = 0;
delete from event_list;
SET SQL_SAFE_UPDATES = 1;
insert into event_list (`event_id`,
        `ticket_id`,
        `description`,
        `location`,
        `start_date`,
        `fee`,
        `end_date`,
        `start_time`,
        `end_time`)
SELECT 
        `e`.`event_id`,
        (select ticket_id from ticket as t where t.event_id = e.event_id and t.uta_id = uta_id) AS `ticket_id`,
        `e`.`description`,
        `e`.`location`,
        `e`.`start_date`,
        `e`.`fee`,
        `e`.`end_date`,
        `e`.`start_time`,
        `e`.`end_time`        
    FROM
        (`event` `e`);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `mission` varchar(1000) NOT NULL,
  `address` varchar(255) NOT NULL,
  `exec_board` varchar(1000) NOT NULL,
  `practices` varchar(1000) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`mission`, `address`, `exec_board`, `practices`, `id`) VALUES
('UTA Water Polo-Sport Club is a non-profit organization that aims at fostering the growth and development of the sport of water polo in the University of Texas at Arlington and building a strong Water Polo team that represents the university to participate in matches and tournaments against other universities and clubs by providing a world-class training and competition environment for our players.', '500 W Nedderman Dr, Arlington, TX 76013 test', 'Matthew Ferrer-President \\r\\nBailey Dillard-Vice President\\r\\nArmando Delabarcena-Treasurer\\r\\nKevin Cooper-Social Media', 'Our weekly practice is on Saturdays from 3-5pm at UTA swimming pool.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `fee` decimal(7,2) NOT NULL,
  `end_date` date NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `description`, `location`, `start_date`, `fee`, `end_date`, `start_time`, `end_time`) VALUES
(2, 'test', 'test', '2001-01-01 00:00:00', '12.00', '2002-03-05', '2017-04-10 02:21:57', '2017-04-08 09:04:00'),
(3, 'test2', 'test2', '2017-04-09 00:00:00', '22.00', '2017-05-08', '2017-04-30 19:05:42', '1970-01-02 02:00:00'),
(7, 'test3', 'test3', '2017-04-12 00:00:00', '0.00', '2017-05-10', '1970-01-01 13:00:00', '1970-01-01 16:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `event_list`
--

CREATE TABLE `event_list` (
  `event_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `fee` decimal(7,2) NOT NULL,
  `end_date` date NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_list`
--

INSERT INTO `event_list` (`event_id`, `ticket_id`, `description`, `location`, `start_date`, `fee`, `end_date`, `start_time`, `end_time`, `id`) VALUES
(2, 0, 'test', 'test', '2001-01-01 00:00:00', '12.00', '2002-03-05', '2017-04-10 02:21:57', '2017-04-08 09:04:00', 485),
(3, 0, 'test2', 'test2', '2017-04-09 00:00:00', '22.00', '2017-05-08', '2017-04-30 19:05:42', '1970-01-02 02:00:00', 486),
(7, 0, 'test3', 'test3', '2017-04-12 00:00:00', '0.00', '2017-05-10', '1970-01-01 13:00:00', '1970-01-01 16:00:00', 487);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `photo_id` int(11) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `news_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `uta_id` varchar(10) NOT NULL,
  `event_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`uta_id`, `event_id`, `ticket_id`) VALUES
('01010101', 6, 19),
('01010101', 4, 25),
('01010101', 3, 26),
('test', 5, 28);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uta_id` varchar(10) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `last_activity` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uta_id`, `email`, `password`, `first_name`, `last_name`, `role`, `status`, `last_activity`) VALUES
('01010101', 'a@uta.edu', '123', 'aa', 'aa', 'Member', 'Pending', '2017-04-30 14:07:32'),
('1234567890', 'dara@gmail.com', '1234', 'dara', 'krang', 'Member', 'Active', '2017-04-30 16:04:43'),
('23456789', 'admin@uta.edu', '1234', 'admin', 'admin', 'Admin', 'Active', '2017-04-30 16:05:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `event_list`
--
ALTER TABLE `event_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`photo_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticket_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uta_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `event_list`
--
ALTER TABLE `event_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=488;
--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
