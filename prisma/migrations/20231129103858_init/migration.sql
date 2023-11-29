-- CreateTable
CREATE TABLE `countries` (
    `country_id` CHAR(2) NOT NULL,
    `country_name` VARCHAR(40) NULL,
    `region_id` INTEGER UNSIGNED NOT NULL,

    INDEX `region_id`(`region_id`),
    PRIMARY KEY (`country_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `department_id` INTEGER UNSIGNED NOT NULL,
    `department_name` VARCHAR(30) NOT NULL,
    `manager_id` INTEGER UNSIGNED NULL,
    `location_id` INTEGER UNSIGNED NULL,

    INDEX `location_id`(`location_id`),
    INDEX `manager_id`(`manager_id`),
    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `employee_id` INTEGER UNSIGNED NOT NULL,
    `first_name` VARCHAR(20) NULL,
    `last_name` VARCHAR(25) NOT NULL,
    `email` VARCHAR(25) NOT NULL,
    `phone_number` VARCHAR(20) NULL,
    `hire_date` DATE NOT NULL,
    `job_id` VARCHAR(10) NOT NULL,
    `salary` DECIMAL(8, 2) NOT NULL,
    `commission_pct` DECIMAL(2, 2) NULL,
    `manager_id` INTEGER UNSIGNED NULL,
    `department_id` INTEGER UNSIGNED NULL,

    INDEX `department_id`(`department_id`),
    INDEX `job_id`(`job_id`),
    INDEX `manager_id`(`manager_id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_history` (
    `employee_id` INTEGER UNSIGNED NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `job_id` VARCHAR(10) NOT NULL,
    `department_id` INTEGER UNSIGNED NOT NULL,

    INDEX `department_id`(`department_id`),
    INDEX `job_id`(`job_id`),
    UNIQUE INDEX `employee_id`(`employee_id`, `start_date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `job_id` VARCHAR(10) NOT NULL,
    `job_title` VARCHAR(35) NOT NULL,
    `min_salary` DECIMAL(8, 0) NULL,
    `max_salary` DECIMAL(8, 0) NULL,

    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `location_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `street_address` VARCHAR(40) NULL,
    `postal_code` VARCHAR(12) NULL,
    `city` VARCHAR(30) NOT NULL,
    `state_province` VARCHAR(25) NULL,
    `country_id` CHAR(2) NOT NULL,

    INDEX `country_id`(`country_id`),
    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regions` (
    `region_id` INTEGER UNSIGNED NOT NULL,
    `region_name` VARCHAR(25) NULL,

    PRIMARY KEY (`region_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `countries` ADD CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employees`(`employee_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`manager_id`) REFERENCES `employees`(`employee_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_history` ADD CONSTRAINT `job_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`employee_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_history` ADD CONSTRAINT `job_history_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_history` ADD CONSTRAINT `job_history_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `locations` ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries`(`country_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
