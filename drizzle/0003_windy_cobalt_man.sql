ALTER TABLE `test` RENAME COLUMN `firstName` TO `first_name`;--> statement-breakpoint
ALTER TABLE `test` RENAME COLUMN `lastName` TO `last_name`;--> statement-breakpoint
ALTER TABLE `test` RENAME COLUMN `createdAt` TO `created_at`;--> statement-breakpoint
ALTER TABLE `test` MODIFY COLUMN `first_name` varchar(255);--> statement-breakpoint
ALTER TABLE `test` MODIFY COLUMN `last_name` varchar(255);--> statement-breakpoint
ALTER TABLE `test` MODIFY COLUMN `age` int;--> statement-breakpoint
ALTER TABLE `test` MODIFY COLUMN `email` varchar(255);