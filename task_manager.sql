-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2023 at 06:01 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `keys`
--

CREATE TABLE `keys` (
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `keys`
--

INSERT INTO `keys` (`token`) VALUES
('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');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_name` text DEFAULT NULL,
  `repo_name` text DEFAULT NULL,
  `team_leader` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `progress` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_name`, `repo_name`, `team_leader`, `description`, `start_date`, `update_date`, `status`, `progress`) VALUES
(2, 'CCS', 'CCS', 1, 'This a project for users to test out new features', '2023-06-03', '2023-06-03', 0, 'Just Started'),
(3, 'Taskade', 'taskade', 0, 'this is a task manager with many features', '2023-06-03', '2023-06-03', 1, 'Just Started'),
(7, 'admin', 'ccs_tiet', 1, 'this is a task manager with many features', '2023-06-04', '2023-06-04', 2, 'Just Started'),
(8, 'admin', 'ccs_tiet2', 0, 'this is a task manager with many features', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(9, 'admin', 'akarsh_test', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(10, 'admin', 'akarsh_test', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(11, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(12, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(13, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(14, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(15, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(16, '', '', 0, '', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(17, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(18, '', '', 0, '', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(19, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(20, '', '', 0, '', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(21, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(22, '', '', 0, '', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(23, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(24, '', '', 0, '', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(25, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(26, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(27, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(28, 'admin', 'akarsh_test_2', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(29, 'admin', 'akarsh_test_21', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(30, 'admin', 'akarsh_test_21', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(31, 'admin', 'akarsh_test_21', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started'),
(32, 'admin', 'akarsh_test_2120', 1, 'this is just another test project', '2023-06-04', '2023-06-04', 1, 'Just Started');

-- --------------------------------------------------------

--
-- Table structure for table `project_users`
--

CREATE TABLE `project_users` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role` text DEFAULT NULL,
  `tech_stack` longtext DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  `github` text DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `f_name` text DEFAULT NULL,
  `l_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_users`
--

INSERT INTO `project_users` (`id`, `project_id`, `user_id`, `role`, `tech_stack`, `user_type`, `github`, `avatar`, `f_name`, `l_name`) VALUES
(1, 10, 1, 'Team Leader', '', 1, '', '', '', ''),
(2, 11, 1, 'Team Leader', '', 1, '', '', '', ''),
(3, 12, 1, 'Team Leader', '', 1, '', '', '', ''),
(4, 13, 1, 'Team Leader', '', 1, '', '', '', ''),
(5, 14, 1, 'Team Leader', '', 1, '', '', '', ''),
(6, 16, 0, 'Team Leader', '', 1, '', '', '', ''),
(7, 17, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(8, 18, 0, 'Team Leader', '', 1, '', '', '', ''),
(9, 19, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(10, 20, 0, 'Team Leader', '', 1, '', '', '', ''),
(11, 21, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(12, 22, 0, 'Team Leader', '', 1, '', '', '', ''),
(13, 23, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(14, 24, 0, 'Team Leader', '', 1, '', '', '', ''),
(15, 25, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(16, 26, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(17, 27, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(18, 28, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(19, 29, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(20, 30, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(21, 31, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava'),
(22, 32, 1, 'Team Leader', '', 1, 'akarsh911', 'https://avatars.githubusercontent.com/u/107661865?', 'Akarsh', 'Srivastava');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(6) UNSIGNED NOT NULL,
  `f_name` varchar(30) NOT NULL,
  `l_name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `ph_no` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `avatar` varchar(50) NOT NULL,
  `github` varchar(50) NOT NULL,
  `psw_hash` varchar(255) NOT NULL,
  `user_state` int(1) NOT NULL,
  `dashboard_type` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `f_name`, `l_name`, `username`, `ph_no`, `email`, `avatar`, `github`, `psw_hash`, `user_state`, `dashboard_type`) VALUES
(1, 'Akarsh', 'Srivastava', 'akarsh91140@gmail.com', '9305267844', 'akarsh91140@gmail.com', 'https://avatars.githubusercontent.com/u/107661865?', 'akarsh911', 'Premium#119', 4, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_users`
--
ALTER TABLE `project_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `project_users`
--
ALTER TABLE `project_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
