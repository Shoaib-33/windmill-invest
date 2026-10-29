-- One-time PostgreSQL setup: a login for the site, its database and a scratch database for the tests.
-- Run as the postgres superuser, choosing a password for the new login:
--   psql -U postgres -h localhost -v pw="choose-a-password" -f db/setup.sql
-- The site creates its own table on first start.
CREATE ROLE windmill LOGIN PASSWORD :'pw';
CREATE DATABASE windmill OWNER windmill ENCODING 'UTF8';
CREATE DATABASE windmill_test OWNER windmill ENCODING 'UTF8';
