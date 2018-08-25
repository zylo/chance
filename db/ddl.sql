CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

DROP Table if EXISTS projects;
DROP Table if EXISTS charges;
DROP Type if EXISTS charge_type; 

CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TYPE charge_type as enum('AP', 'Other');

CREATE TABLE charges (
  id uuid DEFAULT gen_random_uuid(),
  amount INTEGER NOT NULL,
  date timestamp with time zone DEFAULT now(),
  name VARCHAR NOT NULL,
  description text NOT NULL,
  type charge_type NOT NULL
);

INSERT INTO projects(name)
SELECT 'chance';
