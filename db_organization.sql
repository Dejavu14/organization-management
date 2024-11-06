-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_organization.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `laporan` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_organization.users: ~17 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `foto`, `nama`, `jabatan`, `laporan`, `created_at`, `updated_at`) VALUES
	(1, 'newuser', 'newuser@example.com', 'password123', NULL, 'D Cisse', 'Direktur', 'Saya...', '2024-11-03 15:54:43', '2024-11-04 10:43:22'),
	(2, 'wariman', 'wariman@example.com', 'password234', NULL, 'Wariman', 'Komisaris', 'Saya...', '2024-11-03 16:28:57', '2024-11-04 10:43:24'),
	(3, 'ricardo kaka', 'ricardokaka@example.com', 'password567', NULL, 'Kaka', 'Staff', 'Saya...', '2024-11-03 16:53:31', '2024-11-04 10:43:26'),
	(4, 'pikacu', 'pikacu@example.com', 'pikacu777', NULL, 'pokemon', 'Staff', 'Saya...', '2024-11-04 03:47:49', '2024-11-04 10:43:27'),
	(5, 'doraemon', 'doraemon@example.com', 'doraemon123', NULL, 'nobita', 'Staff', 'Saya...', '2024-11-04 04:09:06', '2024-11-04 10:43:28'),
	(6, 'spongbob', 'spongbob@example.com', 'abcd1234', 'uploads\\1730742537238_', 'spongbob', 'Manager', 'iyaiyaiyaiyiaya', '2024-11-04 17:48:57', '2024-11-04 20:54:23'),
	(7, 'patrick star', 'patrick@example.com', 'qwertyu123', 'uploads\\1730742670870_Hasil.jpg', 'patrick star', 'Supervisor', 'yuhuyuhuyuhu', '2024-11-04 17:51:10', '2024-11-04 20:54:15'),
	(8, 'skwitword', NULL, 'qwerty123', 'uploads\\1730744530292_605874956108732951.jpg', 'skwitword', 'staff', 'yuhuuuu', '2024-11-04 18:22:10', '2024-11-04 18:22:10'),
	(9, 'Boruto', NULL, 'abcd12345', 'uploads\\1730747130765_Boruto.jpg', 'Boruto', 'staff', 'yahyahyahyah', '2024-11-04 19:05:30', '2024-11-04 19:05:30'),
	(10, 'Monkey D. Luffy', NULL, 'Yuhu123', 'uploads\\1730747601360_Monkey D_ Luffy.jpg', 'Monkey D. Luffy', 'Komisaris', 'Yuhuhuhuhu', '2024-11-04 19:13:21', '2024-11-04 19:13:21'),
	(11, 'tez', 'tez@gmail.com', 'asdzxc123', 'uploads\\1730756758100_605874956108732951.jpg', 'tez', 'staff', 'tez', '2024-11-04 21:45:58', '2024-11-04 21:45:58'),
	(12, 'Tuan Krabs', 'krabs@gmail.com', 'krabs_123', 'uploads\\1730786368656_Tuan-Krabs.jpg', 'Tuan Krabs', 'Direktur', 'Saya Ingin...', '2024-11-05 05:59:28', '2024-11-05 05:59:28'),
	(13, 'Batman', 'batman@example.com', 'Batman_212', 'uploads\\1730795073028_Batman.jpg', 'Batman', 'Staff', 'Yuhuuu...', '2024-11-05 08:24:33', '2024-11-05 08:24:33'),
	(14, 'Antman', 'antman@example.com', 'zxcv123', 'uploads\\1730809745116_Hasil.jpg', 'Antman', 'Staff', 'Wwkwkwk', '2024-11-05 12:29:05', '2024-11-05 12:29:05'),
	(15, 'flash', 'flash@example.com', 'flash_123', 'uploads\\1730816774856_The Flash.jpg', 'flash', 'staff', 'Yuhuuu...', '2024-11-05 14:26:14', '2024-11-05 14:26:14'),
	(16, 'Khaleed', 'khaleed@example.com', 'Khaleed123', 'uploads\\1730826217059_Khaleed.jpg', 'Khaleed', 'CEO', 'Yuhuuu...', '2024-11-05 17:03:37', '2024-11-05 17:03:37'),
	(17, 'Sun Go Kong', 'sungokong@example.com', 'sungokong123', 'uploads\\1730883594777_monkey king.jpg', 'Sun Go Kong', 'Ceo', 'Yuhuuu...', '2024-11-06 08:59:54', '2024-11-06 08:59:54');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
