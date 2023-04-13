
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (2083),
    "user_id" INT REFERENCES "user"
);

INSERT INTO "user" ("username", "password")
VALUES ('david', '$2a$10$NphAjIyZGdCaAJKDjPdSlOyunFDctq9jxZRm4bMCOCA9bNt3RPkIy'), ('sam', '$2a$10$NJ7etCRr6z8AsNLtIxq/A.k8X6J7Pi9mZyRUeIkayn/aobqUh/SdS');

INSERT INTO "item" ("description", "image_url", "user_id")
VALUES ('pasta', 'https://thedizzycook.com/wp-content/uploads/2019/12/Boursin-pasta-500x375.jpg', '1'), ('corkscrew', 'https://cdn2.vectorstock.com/i/1000x1000/27/56/corkscrew-device-for-open-vector-20982756.jpg', '1'),
('funguy', 'https://plantbasednews.org/app/uploads/2022/08/plant-based-news-mushrooms-sustainable-730x500.jpg', '2'), ('lake', 'https://media.cntraveler.com/photos/5eb1cdd479397e1bac70bdf3/master/w_4032,h_2688,c_limit/Crater-Lake-GettyImages-1158150928.jpg', '2')