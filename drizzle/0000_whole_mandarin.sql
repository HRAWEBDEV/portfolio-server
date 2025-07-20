CREATE TABLE `tests` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `tests_id` PRIMARY KEY(`id`)
);
