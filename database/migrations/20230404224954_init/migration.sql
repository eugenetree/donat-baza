/*
  Warnings:

  - Added the required column `message` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Donation` ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `notificationWasPlayed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `paymentStatus` ENUM('idle', 'progress', 'success', 'fail') NOT NULL DEFAULT 'idle',
    MODIFY `paymentData` JSON NULL;
