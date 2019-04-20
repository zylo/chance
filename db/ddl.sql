CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO projects(name)
SELECT 'chance';

CREATE TABLE IF NOT EXISTS charges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount numeric NOT NULL,
    name varchar(128) NOT NULL,
    description varchar(250),
    type varchar(64),
    created_at timestamp with time zone DEFAULT now()
);
