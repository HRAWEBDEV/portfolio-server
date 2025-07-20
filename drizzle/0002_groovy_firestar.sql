ALTER TABLE `test` RENAME COLUMN `other` TO `firstName`;--> statement-breakpoint
ALTER TABLE `test` MODIFY COLUMN `firstName` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `test` ADD `lastName` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `test` ADD `age` int NOT NULL;--> statement-breakpoint
ALTER TABLE `test` ADD `email` varchar(100);--> statement-breakpoint
ALTER TABLE `test` ADD `createdAt` timestamp DEFAULT (now());