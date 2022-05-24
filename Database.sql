-- CREATE TABLE users (
-- 	"name" varchar UNIQUE NOT NULL, --varchar = variable character(string) | UNIQUE = no other element in the table can have the same name | NOT NULL = every entry has to have a name 
-- 	"password" varchar NOT NULL,
-- 	"user_id" serial NOT NULL, --serial = number in order
-- 	CONSTRAINT "users_pk" PRIMARY KEY ("user_id") --pk = primary key
-- ) WITH (
-- 	OIDS=FALSE
-- ); 

CREATE TABLE favorites (
  "_id" serial NOT NULL,
  "favs_id" bigint NOT NULL,
  "user_id" varchar NOT NULL,
  "breed" varchar NOT NULL,
  "age" varchar NOT NULL,
  "gender" varchar NOT NULL,
  "color" varchar NOT NULL,
  "image" varchar NOT NULL,
  "url" varchar NOT NULL,
  "name" varchar NOT NULL,
  -- CONSTRAINT "users_fk" FOREIGN KEY ("user_id") REFERENCES users("user_id"), --constraint is setting up the name for the foreign key(user_id) which will reference the "users" table's column "user_id"
  CONSTRAINT "favs_pk" PRIMARY KEY ("_id") --because every table needs a PK, we need to assign it on a new line. 
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE favorites ADD CONSTRAINT "favs_pk" PRIMARY KEY ("favs_id") REFERENCES users("user_id");


-- psql -d postgres://dugyvcke:m8sbtSm8b9fj06NWYlQKtYexrmjrVKSv@castor.db.elephantsql.com/dugyvcke -f Database.sql
-- psql -d postgres://ylxqwlpf:7YgsxWNTvsIsoHd37PZEltxV5CFUYzjW@kashin.db.elephantsql.com/ylxqwlpf -f Database.sql


--KENNY RANDOM NOTES--
--1) if we have a relational database with a foreign key, we cannot INSERT anything into the foreign table until a primary key table is created
