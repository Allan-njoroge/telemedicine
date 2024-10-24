-- CreateTable
CREATE TABLE `Patients` (
    `patientId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` CHAR(50) NOT NULL,
    `lastName` CHAR(50) NOT NULL,
    `emailAdress` CHAR(150) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `profilePicture` VARCHAR(191) NULL,

    UNIQUE INDEX `Patients_emailAdress_key`(`emailAdress`),
    PRIMARY KEY (`patientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Providers` (
    `providerId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` CHAR(50) NOT NULL,
    `lastName` CHAR(50) NOT NULL,
    `emailAdress` CHAR(150) NOT NULL,
    `providerSpecialty` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `dateJoined` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profilePicture` VARCHAR(191) NULL,

    UNIQUE INDEX `Providers_emailAdress_key`(`emailAdress`),
    PRIMARY KEY (`providerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultations` (
    `consultationId` INTEGER NOT NULL AUTO_INCREMENT,
    `providerId` INTEGER NOT NULL,
    `patientId` INTEGER NOT NULL,
    `description` LONGTEXT NOT NULL,
    `dateScheduled` DATETIME(3) NOT NULL,
    `dateCompleted` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`consultationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Consultations` ADD CONSTRAINT `Consultations_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Providers`(`providerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultations` ADD CONSTRAINT `Consultations_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patients`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;
