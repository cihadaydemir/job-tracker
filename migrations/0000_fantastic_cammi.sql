CREATE TABLE `job-tracker_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_name` text(256) NOT NULL,
	`vacancy_url` text(256),
	`status` text NOT NULL,
	`files` text(256),
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
