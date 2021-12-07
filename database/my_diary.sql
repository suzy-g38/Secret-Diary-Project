-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2021 at 09:38 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_diary`
--

-- --------------------------------------------------------

--
-- Table structure for table `diary`
--

CREATE TABLE `diary` (
  `id` int(11) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diary`
--

INSERT INTO `diary` (`id`, `date`, `note`) VALUES
(1, '13-11-2021', 'First'),
(2, '10-11-2021', 'Second'),
(3, '13-11-2021', 'nxznjznvz'),
(4, '12-11-2021', 'mcnxb,xm,f'),
(5, '12-11-2021', 'fksl'),
(6, '12-11-2021', 'userdata is 1'),
(7, '12-11-2021', 'after userdata'),
(8, '11-11-2021', 'Hey it is 11 nov'),
(9, '11-11-2021', 'Hey it is 11 nov'),
(10, '11-11-2021', '11 nov another diary'),
(11, '10-11-2021', 'This is 10th nov'),
(12, '14-11-2021', 'it is 14th of Nov'),
(13, '10-11-2021', 'Hey there'),
(14, '10-11-2021', 'Sharing thoughts'),
(15, '10-11-2021', 'Hey there'),
(16, '10-11-2021', 'hey hello'),
(17, '10-11-2021', 'Trial'),
(18, '10-11-2021', 'last trial'),
(19, '11-11-2021', 'Sharing with trina'),
(20, '10-11-2021', 'Hello'),
(21, '10-11-2021', 'I am sharing this with trina@gmail.com'),
(22, '10-11-2021', 'Again sharing with trina@gmail.com'),
(23, '10-11-2021', 'sharing from sulagna to trina'),
(24, '8-12-2021', 'It is 8th december 2021'),
(25, '9-12-2021', 'It is 9th decmeber'),
(26, '7-12-2021', 'It is 7th december'),
(27, '8-12-2021', 'It is 8th December'),
(28, '8-12-2021', 'It is 8th December'),
(29, '10-12-2021', 'It is 10th December');

-- --------------------------------------------------------

--
-- Table structure for table `diaryuser`
--

CREATE TABLE `diaryuser` (
  `id` int(11) NOT NULL,
  `tableid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `isowner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diaryuser`
--

INSERT INTO `diaryuser` (`id`, `tableid`, `userid`, `isowner`) VALUES
(1, 1, 1, '1'),
(2, 2, 2, '1'),
(3, 3, 1, '1'),
(4, 4, 1, '1'),
(5, 5, 1, '1'),
(6, 6, 1, '1'),
(7, 7, 1, '1'),
(8, 8, 1, '1'),
(9, 9, 1, '1'),
(10, 10, 1, '1'),
(11, 11, 1, '1'),
(12, 12, 1, '1'),
(13, 13, 1, '1'),
(14, 14, 2, '1'),
(15, 15, 2, '1'),
(16, 16, 2, '1'),
(17, 17, 2, '1'),
(18, 18, 2, '1'),
(19, 18, 1, '0'),
(20, 18, 1, '0'),
(21, 19, 2, '1'),
(23, 19, 1, '0'),
(24, 20, 1, '1'),
(25, 21, 3, '1'),
(26, 22, 3, '1'),
(27, 21, 1, '0'),
(28, 22, 1, '0'),
(29, 11, 3, '0'),
(30, 11, 3, '0'),
(31, 23, 3, '1'),
(32, NULL, 1, '0'),
(33, 24, 3, '1'),
(34, 24, 3, '0'),
(35, 25, 3, '1'),
(36, 25, 3, '0'),
(37, 26, 21, '1'),
(38, 26, 21, '0'),
(39, 26, 1, '0'),
(40, 27, 1, '0'),
(41, 28, 1, '1'),
(42, 28, 3, '0'),
(43, 29, 3, '1'),
(44, 29, 21, '0');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(1, 'Trina', 'trina@gmail.com', '699832'),
(2, 'Suzy', 'suzy@gmail.com', '154062'),
(3, 'Sulagna', 'sulagna@gmail.com', '192877'),
(4, 'Rubi Ghosh', 'rubighosh5289@gmail.com', '247314'),
(5, 'Sulagna Ghosh', 'sulagna@stockedge.com', '695947'),
(6, 'Deep Roy', 'deeproy.bishnupur@gmail.com', '556356'),
(7, 'abc', 'abc@gmail.com', '750447'),
(8, 'bcd', 'bcd.gmail.com', '288615'),
(9, 'xyz', 'xyz@gmail.com', '300239'),
(10, 'amnh', 'amnh@gmail.com', '601472'),
(11, 'sulagna', 's@gmail.com', '209238'),
(12, 'sg', 'sg@gmail.com', '992626'),
(13, 'tg', 'tg@gmail.com', '800176'),
(14, 't', 't@gmail.com', '470130'),
(15, 'rg', 'rgb@gmail.com', '394407'),
(16, 'sgt', 'sgt@gmail.com', '422365'),
(17, 'fg', 'fg@gmail.com', '703506'),
(18, 'sherlock', 'heysherlockitsme@gmail.com', '954949'),
(19, 'Suzy', 'suzyG@gmail.com', '642385'),
(20, 'Tri', 'tri@gmail.com', '288339'),
(21, 'Chandreyee', 'chandreyee@gmail.com', '109668'),
(22, 'C', 'c@gmail.com', '368792'),
(23, 'cs', 'cs@gmail.com', '305909'),
(24, 'trina@gmail.com', '699832', '956464');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diary`
--
ALTER TABLE `diary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diaryuser`
--
ALTER TABLE `diaryuser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tableid` (`tableid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diary`
--
ALTER TABLE `diary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `diaryuser`
--
ALTER TABLE `diaryuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diaryuser`
--
ALTER TABLE `diaryuser`
  ADD CONSTRAINT `diaryuser_ibfk_1` FOREIGN KEY (`tableid`) REFERENCES `diary` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
