-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-06-17 11:51:37.918

-- foreign keys
ALTER TABLE occurrence
    DROP FOREIGN KEY occurance_user;

ALTER TABLE occurrence
    DROP FOREIGN KEY occurrence_smellType;

-- tables
DROP TABLE feedback;

DROP TABLE occurrence;

DROP TABLE smellType;

DROP TABLE user;

-- End of file.

