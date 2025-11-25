-- Migration: make etudiantId nullable for teacher absences
-- This allows the absence table to store both student and teacher absences

ALTER TABLE absence 
ALTER COLUMN "etudiantId" DROP NOT NULL;

-- Add a check constraint to ensure either etudiantId or enseignantId is set
-- but not both
ALTER TABLE absence 
ADD CONSTRAINT check_absence_subject 
CHECK (
  (sujet = 'etudiant' AND "etudiantId" IS NOT NULL AND "enseignantId" IS NULL) OR
  (sujet = 'enseignant' AND "enseignantId" IS NOT NULL AND "etudiantId" IS NULL)
);
