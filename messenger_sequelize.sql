-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 20, 2025 at 07:06 PM
-- Server version: 8.0.42-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `messenger_sequelize`
--

-- --------------------------------------------------------

--
-- Table structure for table `call_table`
--

CREATE TABLE `call_table` (
  `id` int NOT NULL,
  `caller_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `status` enum('started','accepted','ended') NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `call_table`
--

INSERT INTO `call_table` (`id`, `caller_id`, `receiver_id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 'started', '2025-06-18 06:23:08', '2025-06-18 08:44:31'),
(2, 1, 2, 'started', NULL, NULL),
(3, 1, 2, 'started', NULL, NULL),
(4, 2, 2, 'started', NULL, NULL),
(5, 2, 2, 'started', NULL, NULL),
(6, 2, 2, 'started', NULL, NULL),
(7, 2, 2, 'started', NULL, NULL),
(8, 2, 2, 'started', NULL, NULL),
(9, 2, 2, 'started', NULL, NULL),
(10, 2, 2, 'started', NULL, NULL),
(11, 2, 2, 'started', NULL, NULL),
(12, 2, 2, 'started', NULL, NULL),
(13, 2, 2, 'started', NULL, NULL),
(14, 2, 2, 'started', NULL, NULL),
(15, 2, 2, 'started', NULL, NULL),
(16, 2, 2, 'started', NULL, NULL),
(17, 2, 2, 'started', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chat_table`
--

CREATE TABLE `chat_table` (
  `id` int NOT NULL,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chat_table`
--

INSERT INTO `chat_table` (`id`, `sender_id`, `receiver_id`, `group_id`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, NULL, 'message from himat', '2025-06-13 08:50:48', '2025-06-13 08:50:48'),
(2, 2, 1, NULL, 'Good aftre noon', '2025-06-13 08:51:01', '2025-06-13 08:51:01'),
(3, 2, 1, NULL, 'Hyy ', '2025-06-13 08:51:11', '2025-06-13 08:51:11'),
(4, 1, 2, NULL, 'Hii ', '2025-06-13 08:51:53', '2025-06-13 08:51:53'),
(5, 1, 2, NULL, 'Good afternoon bro ', '2025-06-13 08:52:01', '2025-06-13 08:52:01'),
(6, 1, NULL, 6, 'this is group message', '2025-06-13 10:30:17', '2025-06-13 10:30:17'),
(7, 1, NULL, 6, 'Hello everyone', '2025-06-13 11:02:51', '2025-06-13 11:02:51'),
(8, 2, NULL, 6, 'Hello from himat', '2025-06-13 11:04:00', '2025-06-13 11:04:00'),
(9, 2, NULL, 6, 'what\'s going on ?', '2025-06-13 11:04:20', '2025-06-13 11:04:20'),
(10, 2, NULL, 6, 'what\'s going on ?', '2025-06-13 11:04:39', '2025-06-13 11:04:39'),
(11, 2, 3, NULL, 'hello jigar', '2025-06-13 13:16:09', '2025-06-13 13:16:09'),
(12, 1, 4, NULL, 'good afternoon jigar', '2025-06-14 10:23:41', '2025-06-14 10:23:41'),
(13, 3, NULL, 7, 'hello mann this is jigar ', '2025-06-14 11:30:13', '2025-06-14 11:30:13'),
(14, 1, 4, NULL, 'hello hardik this side', '2025-06-16 10:09:32', '2025-06-16 10:09:32'),
(15, 2, 1, NULL, 'hello hardik ', '2025-06-16 13:36:01', '2025-06-16 13:36:01'),
(16, 1, 5, NULL, 'Hello mann ', '2025-06-17 07:57:19', '2025-06-17 07:57:19'),
(17, 5, 1, NULL, 'hello from 25dev047', '2025-06-17 07:57:21', '2025-06-17 07:57:21'),
(18, 1, 5, NULL, 'Good afternoon ', '2025-06-17 07:57:37', '2025-06-17 07:57:37'),
(19, 5, 1, NULL, 'hello hii ', '2025-06-17 07:57:38', '2025-06-17 07:57:38'),
(20, 1, NULL, 6, 'Working on Group Chat Pdf Generate', '2025-06-17 10:15:18', '2025-06-17 10:15:18'),
(21, 5, NULL, 6, 'hello changed group i am mann shah', '2025-06-17 10:46:14', '2025-06-17 10:46:14'),
(22, 1, 3, NULL, 'hello', '2025-06-17 17:59:15', '2025-06-17 17:59:15');

-- --------------------------------------------------------

--
-- Table structure for table `group_member_table`
--

CREATE TABLE `group_member_table` (
  `id` int NOT NULL,
  `group_id` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `group_member_table`
--

INSERT INTO `group_member_table` (`id`, `group_id`, `admin_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(6, 6, 1, 1, '2025-06-13 08:58:59', '2025-06-13 08:58:59'),
(8, 6, 1, 2, '2025-06-13 08:59:51', '2025-06-13 08:59:51'),
(9, 6, 1, 3, '2025-06-13 09:00:09', '2025-06-13 09:00:09'),
(10, 6, 1, 4, '2025-06-13 09:00:11', '2025-06-13 09:00:11'),
(11, 7, 1, 1, '2025-06-13 09:17:46', '2025-06-13 09:17:46'),
(12, 8, 2, 2, '2025-06-13 09:26:20', '2025-06-13 09:26:20'),
(13, 7, 1, 2, '2025-06-14 10:06:54', '2025-06-14 10:06:54'),
(15, 7, 1, 3, '2025-06-14 11:27:57', '2025-06-14 11:27:57'),
(16, 6, 1, 5, '2025-06-17 10:45:06', '2025-06-17 10:45:06');

-- --------------------------------------------------------

--
-- Table structure for table `group_table`
--

CREATE TABLE `group_table` (
  `group_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `group_name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `group_table`
--

INSERT INTO `group_table` (`group_id`, `user_id`, `group_name`, `createdAt`, `updatedAt`, `deletedAt`, `profile_photo`) VALUES
(6, 1, 'changed', '2025-06-13 08:58:59', '2025-06-14 10:34:45', NULL, 'https://res.cloudinary.com/duy1xfupo/image/upload/v1749897285/hardik/gowupjwd157hokhwhw1i.jpg'),
(7, 1, 'family', '2025-06-13 09:17:46', '2025-06-13 09:17:46', NULL, NULL),
(8, 2, 'members', '2025-06-13 09:26:20', '2025-06-13 09:26:20', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `otp_verification`
--

CREATE TABLE `otp_verification` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `expiresAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250611041704-create-user.js'),
('20250611055400-otp_verification_table.js'),
('20250612051630-create-group.js'),
('20250612092051-create-group-member-table.js'),
('20250612123525-create-chat.js'),
('20250613093615-add-unique-to-email-column-in-user.js'),
('20250614095317-add_profile_photo_column_group_table.js'),
('20250614101049-add_profile_photo_column_group_table.js'),
('20250614103037-add_profile_photo_column_group_table.js'),
('20250616084147-create-status.js'),
('20250618045841-create-call.js');

-- --------------------------------------------------------

--
-- Table structure for table `status_table`
--

CREATE TABLE `status_table` (
  `status_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `expiresAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `status_table`
--

INSERT INTO `status_table` (`status_id`, `user_id`, `status`, `description`, `createdAt`, `updatedAt`, `expiresAt`) VALUES
(12, 2, 'https://res.cloudinary.com/duy1xfupo/image/upload/v1750165021/hardik/seuq77b8rlp4bfe2htea.jpg', 'Good Morning', '2025-06-17 12:57:01', '2025-06-17 12:57:01', '2025-06-18 12:57:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `profile_photo`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'hardik', 'parmar', 'hardik@gmail.com', 'https://res.cloudinary.com/duy1xfupo/image/upload/v1750076939/hardik/t1utyvqvv2dgj5tv2dj3.jpg', '$2a$10$FlPt2kAyq1TUEx3jpUxMNuZvneyBT.AL9kcQ99mXLcO4tcFSs8Cca', '2025-06-12 14:28:17', '2025-06-16 12:29:00'),
(2, 'himat', 'parmar', 'himat@gmail.com', NULL, '$2a$10$FlPt2kAyq1TUEx3jpUxMNuZvneyBT.AL9kcQ99mXLcO4tcFSs8Cca', '2025-06-12 14:28:53', '2025-06-12 14:29:21'),
(3, 'jigar', 'kanada', 'jigar@gmail.com', 'https://res.cloudinary.com/duy1xfupo/image/upload/v1750076996/hardik/lunpevlm54ndpunyydbi.jpg', '$2a$10$FlPt2kAyq1TUEx3jpUxMNuZvneyBT.AL9kcQ99mXLcO4tcFSs8Cca', '2025-06-12 14:29:28', '2025-06-16 12:29:56'),
(4, 'Darshan', 'Chauhan', 'darshan@gmail.com', NULL, '$2a$10$FlPt2kAyq1TUEx3jpUxMNuZvneyBT.AL9kcQ99mXLcO4tcFSs8Cca', '2025-06-12 14:29:58', '2025-06-14 05:40:31'),
(5, 'Mann', 'Shah', 'mann@gmail.com', 'https://res.cloudinary.com/duy1xfupo/image/upload/v1750076996/hardik/lunpevlm54ndpunyydbi.jpg', '$2a$10$FlPt2kAyq1TUEx3jpUxMNuZvneyBT.AL9kcQ99mXLcO4tcFSs8Cca', '2025-06-17 13:23:27', '2025-06-17 13:24:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `call_table`
--
ALTER TABLE `call_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `caller_id` (`caller_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `chat_table`
--
ALTER TABLE `chat_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `group_member_table`
--
ALTER TABLE `group_member_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `group_table`
--
ALTER TABLE `group_table`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `otp_verification`
--
ALTER TABLE `otp_verification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `status_table`
--
ALTER TABLE `status_table`
  ADD PRIMARY KEY (`status_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `unique_email_constraint` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `call_table`
--
ALTER TABLE `call_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `chat_table`
--
ALTER TABLE `chat_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `group_member_table`
--
ALTER TABLE `group_member_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `group_table`
--
ALTER TABLE `group_table`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `otp_verification`
--
ALTER TABLE `otp_verification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `status_table`
--
ALTER TABLE `status_table`
  MODIFY `status_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `call_table`
--
ALTER TABLE `call_table`
  ADD CONSTRAINT `call_table_ibfk_1` FOREIGN KEY (`caller_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `call_table_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `chat_table`
--
ALTER TABLE `chat_table`
  ADD CONSTRAINT `chat_table_ibfk_937` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_table_ibfk_938` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_table_ibfk_939` FOREIGN KEY (`group_id`) REFERENCES `group_table` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_member_table`
--
ALTER TABLE `group_member_table`
  ADD CONSTRAINT `group_member_table_ibfk_988` FOREIGN KEY (`group_id`) REFERENCES `group_table` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_member_table_ibfk_989` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_member_table_ibfk_990` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `group_table`
--
ALTER TABLE `group_table`
  ADD CONSTRAINT `group_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `status_table`
--
ALTER TABLE `status_table`
  ADD CONSTRAINT `status_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
