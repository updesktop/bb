-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2024 at 10:10 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dtr_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `daily`
--

CREATE TABLE IF NOT EXISTS `daily` (
  `date` date NOT NULL,
  `rank` int(3) NOT NULL,
  `usercode` varchar(20) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` varchar(2) NOT NULL,
  `time1` varchar(5) NOT NULL,
  `time2` varchar(5) NOT NULL,
  `time3` varchar(5) NOT NULL,
  `time4` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `daily`
--

INSERT INTO `daily` (`date`, `rank`, `usercode`, `id`, `day`, `time1`, `time2`, `time3`, `time4`) VALUES
('2024-04-04', 1, 'U_20230809_135114', 1, '', '7:43', '12:16', '12:51', '05:08'),
('2024-04-04', 3, 'U_20231107_150722', 3, '', '7:43', '', '', ''),
('2024-04-04', 4, 'U_20230809_135219', 4, '', '7:43', '', '', ''),
('2024-04-04', 5, 'U_20230809_135726', 5, '', '7:43', '', '', ''),
('2024-04-04', 0, 'U_20201212_212129', 16, '', '07:29', '12:06', '12:52', '05:10'),
('2024-04-04', 6, 'U_20230807_144200', 6, '', '7:43', '', '', ''),
('2024-04-04', 7, 'U_20230809_135726', 7, '', '7:43', '', '', ''),
('2024-04-08', 0, 'A_RPD', 11, '1', '07:24', '12:07', '12:54', '05:09'),
('2024-04-10', 0, 'A_RPD', 17, '2', '07:35', '12:07', '12:54', '05:09'),
('2024-04-03', 0, 'A_RPD', 18, '2', '07:48', '12:07', '12:54', '05:09'),
('2024-04-04', 0, 'A_RPD', 19, '2', '07:47', '12:07', '12:54', '05:09'),
('2024-04-05', 0, 'A_RPD', 20, '2', '07:51', '12:07', '12:54', '05:09'),
('2024-04-06', 0, 'A_RPD', 22, '2', '07:05', '12:07', '12:54', '05:09'),
('2024-04-21', 0, 'A_RPD', 23, '2', '07:05', '12:07', '12:54', '05:09');

-- --------------------------------------------------------

--
-- Table structure for table `locker`
--

CREATE TABLE IF NOT EXISTS `locker` (
  `docno` varchar(20) NOT NULL,
  `trans` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `usercode` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(10) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `monthly`
--

CREATE TABLE IF NOT EXISTS `monthly` (
  `date` date NOT NULL,
  `descrp` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `monthly`
--

INSERT INTO `monthly` (`date`, `descrp`, `id`) VALUES
('2024-04-02', 'JBE Day', 1),
('2024-04-09', 'JBE Day 2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `sig`
--

CREATE TABLE IF NOT EXISTS `sig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `head` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `office` varchar(50) NOT NULL,
  `license` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `sig`
--

INSERT INTO `sig` (`id`, `head`, `position`, `office`, `license`) VALUES
(1, 'MA. CARMELA P. GENSOLI, RMT, M.D.', 'CITY HEALTH OFFICER', 'BACOLOD CITY HEALTH OFFICE', 'License # 0104010');

-- --------------------------------------------------------

--
-- Table structure for table `sysfile`
--

CREATE TABLE IF NOT EXISTS `sysfile` (
  `clientno` varchar(20) NOT NULL,
  `clientname` varchar(100) NOT NULL,
  `appname` varchar(20) NOT NULL,
  `shortname` varchar(10) NOT NULL,
  `descrp` varchar(50) NOT NULL,
  `logo` varchar(50) NOT NULL,
  `banner` varchar(50) NOT NULL,
  `hd1` varchar(50) NOT NULL,
  `hd2` varchar(50) NOT NULL,
  `hd3` varchar(50) NOT NULL,
  `pg_title` varchar(50) NOT NULL,
  `pg_body` varchar(500) NOT NULL,
  `clor1` varchar(10) NOT NULL,
  `clor2` varchar(10) NOT NULL,
  `clor3` varchar(10) NOT NULL,
  `clor4` varchar(10) NOT NULL,
  `txclor1` varchar(10) NOT NULL,
  `txclor2` varchar(10) NOT NULL,
  `txclor3` varchar(10) NOT NULL,
  `txclor4` varchar(10) NOT NULL,
  `active` int(1) NOT NULL,
  `site` varchar(30) NOT NULL,
  `telno` varchar(20) NOT NULL,
  `celno` varchar(20) NOT NULL,
  `sys_date` date NOT NULL,
  `sys_holiday` varchar(200) NOT NULL,
  PRIMARY KEY (`clientno`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sysfile`
--

INSERT INTO `sysfile` (`clientno`, `clientname`, `appname`, `shortname`, `descrp`, `logo`, `banner`, `hd1`, `hd2`, `hd3`, `pg_title`, `pg_body`, `clor1`, `clor2`, `clor3`, `clor4`, `txclor1`, `txclor2`, `txclor3`, `txclor4`, `active`, `site`, `telno`, `celno`, `sys_date`, `sys_holiday`) VALUES
('RPD', 'Regent Prints', 'ENAD', 'Regent Pri', 'Regent Prints', 'logo.jpg', 'banner.jpg', '< Promo Content >', '< Category Content >', '< Items Content >', 'Regent Prints Digital', 'Body', '#0080ff', '#0080c0', '#0080ff', '#ff0000', '#ffffff', '#000000', '#ffffff', '#ffffff', 0, 'regentprints', '', '', '2024-04-01', '2,11,25');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `clientno` varchar(20) NOT NULL,
  `usercode` varchar(20) NOT NULL,
  `userid` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pword` varchar(20) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `usertype` int(1) NOT NULL,
  `addrss` varchar(300) NOT NULL,
  `celno` varchar(20) NOT NULL,
  `fb` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `d_active` date NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`usercode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`clientno`, `usercode`, `userid`, `username`, `pword`, `photo`, `usertype`, `addrss`, `celno`, `fb`, `email`, `d_active`, `lat`, `lng`) VALUES
('DTR', 'A_RPD', 'x', 'Administrator', 'x', 'A_RPD.jpg', 5, 'jb', '358', '', '', '2020-11-24', 9.914236549979925, 124.09179590642454),
('DTR', 'U_20201212_212129', 'a', 'aaaa', 'a', 'U_20201212_212129.jpg', 1, 'aaaaadddd', '123', '', '', '2020-12-12', 10.6485284, 122.9771604),
('DTR', 'U_20230807_144200', 'v', 'vvvvvvvvvvvvvvvv', 'v', 'U_20230807_144200.jpg', 0, 'vvvvvvvvvvvvvvvv', '5', '', '', '2023-08-07', 10.6485277, 122.9774905),
('DTR', 'U_20231107_150722', 'yen', 'yen yen', '12345', 'U_20231107_150722.jpg', 1, 'bacolod city', '123456789', '', '', '2023-11-07', 10.648695, 122.9772045),
('DTR', 'U_20230809_135114', 'sumicad', 'Andrian', 'coldroom', 'U_20230809_135114.jpg', 1, 'Coldroom', '1', '', '', '2023-08-09', 10.6485804, 122.9772045),
('DTR', 'U_20230807_145548', 'b', 'bbbb', 'b', 'U_20230807_145548.jpg', 2, 'bbbbbbbbbbbbb22mm', '22222222222', '', '', '2023-08-07', 10.6485277, 122.9774905),
('DTR', 'U_20230809_135219', 'garcia', 'JahMel', 'coldroom', 'U_20230809_135219.jpg', 1, 'Coldroom', '2', '', '', '2023-08-09', 10.6485804, 122.9772045),
('DTR', 'U_20230809_135726', 'jeff', 'Jeffrey', 'jbe', 'U_20230809_135726.jpg', 5, 'Coldroom', '0', '', '', '2023-08-09', 10.6485804, 122.9772045),
('DTR', 'U_20240406_094619', 's', 'sssssssssss', 's', 'U_20240406_094619.jpg', 0, 'sssssssssssssssssssssssss', '333333', '', '', '2024-04-06', 10.670049, 122.9557281),
('DTR', 'U_20240406_095543', 'ffff', 'f', 'f', 'U_20240406_095543.jpg', 0, 'fffffffffffff', '222', '', '', '2024-04-06', 10.670049, 122.9557281),
('DTR', 'U_20240406_100631', 'g', 'ggggg', 'g', 'U_20240406_100631.jpg', 0, 'ggggg', '333', '', '', '2024-04-06', 10.670049, 122.9557281),
('DTR', 'U_20240406_101048', 'w', 'www', 'w', 'U_20240406_101048.jpg', 0, 'wwwwwwwwwwwwww', '33333', '', '', '2024-04-06', 10.670049, 122.9557281),
('DTR', 'U_20240406_101256', 'r', 'rrrr', 'r', 'U_20240406_101256.jpg', 0, 'rrrrrrrrrrrrrrr', '222222222', '', '', '2024-04-06', 10.670049, 122.9557281),
('DTR', 'U_20240406_101637', 'k', 'kkk', 'k', 'U_20240406_101637.jpg', 0, 'kkkkkkkkk', '77777', '', '', '2024-04-06', 10.670049, 122.9557281);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
