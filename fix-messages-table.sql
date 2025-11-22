-- Fix messages table by dropping and recreating it
-- This will delete all existing messages but fix the schema issue

DROP TABLE IF EXISTS messages CASCADE;

-- The table will be recreated automatically by TypeORM when the admin service starts
