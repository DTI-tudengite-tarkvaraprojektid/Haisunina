-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-06-17 11:51:37.918

-- tables
-- Table: feedback
CREATE TABLE feedback (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(30) NOT NULL,
    description varchar(255) NOT NULL,
    CONSTRAINT feedback_pk PRIMARY KEY (id)
);

-- Table: occurrence
CREATE TABLE occurrence (
    id int NOT NULL AUTO_INCREMENT,
    strength int NOT NULL,
    location text NOT NULL,
    time timestamp NOT NULL,
    description varchar(25) NOT NULL,
    smellType_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT occurrence_pk PRIMARY KEY (id)
);

-- Table: smellType
CREATE TABLE smellType (
    id int NOT NULL AUTO_INCREMENT,
    type varchar(25) NOT NULL,
    CONSTRAINT smellType_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    user_name varchar(30) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: occurance_user (table: occurrence)
ALTER TABLE occurrence ADD CONSTRAINT occurance_user FOREIGN KEY occurance_user (user_id)
    REFERENCES user (id);

-- Reference: occurrence_smellType (table: occurrence)
ALTER TABLE occurrence ADD CONSTRAINT occurrence_smellType FOREIGN KEY occurrence_smellType (smellType_id)
    REFERENCES smellType (id);

-- End of file.

