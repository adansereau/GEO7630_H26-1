---------------------------------------------------------------------
-- OBJECTIF
-- Générer une grille d’hexagones (200 m) couvrant les espaces verts
-- et la matérialiser dans une table persistante PostGIS.
--
-- Table cible :
--   geo7630h26.h3_hex_parcs
--
-- Hypothèses :
-- - Les géométries sources sont dans geo7630h26.espaces_verts
-- - Les calculs se font en mètres → projection EPSG:3857
-- - Les hexagones sont conservés s’ils INTERSECTENT les espaces verts
---------------------------------------------------------------------


---------------------------------------------------------------------
-- 1. Suppression de la table si elle existe déjà
--    (permet de rejouer le script sans erreur)
---------------------------------------------------------------------
DROP TABLE IF EXISTS geo7630h26.h3_hex_parcs;


---------------------------------------------------------------------
-- 2. Création de la table à partir d’une requête spatiale
--    (CREATE TABLE AS SELECT)
---------------------------------------------------------------------
CREATE TABLE geo7630h26.h3_hex_parcs AS

WITH
---------------------------------------------------------------------
-- aoi (Area Of Interest)
-- - Transformation des espaces verts en EPSG:3857 (mètres)
-- - Fusion en une seule géométrie pour simplifier les traitements
---------------------------------------------------------------------
aoi AS (
  SELECT
    ST_Union(
      ST_Transform(geom, 3857)
    ) AS g
  FROM geo7630h26.espaces_verts
),

---------------------------------------------------------------------
-- grid
-- - Génération d’une grille hexagonale couvrant l’enveloppe
--   rectangulaire (bounding box) de l’AOI
-- - Taille des hexagones : 200 mètres
-- - La grille est volontairement plus large que l’AOI
---------------------------------------------------------------------
grid AS (
  SELECT
    (
      ST_HexagonGrid(
        200.0,            -- taille des hexagones (mètres)
        ST_Envelope(g)    -- emprise rectangulaire de l’AOI
      )
    ).geom AS geom
  FROM aoi
)

---------------------------------------------------------------------
-- 3. Sélection finale
-- - Conservation uniquement des hexagones qui intersectent
--   l’AOI (espaces verts)
---------------------------------------------------------------------
SELECT
  geom
FROM grid, aoi
WHERE ST_Intersects(geom, g);


---------------------------------------------------------------------
-- 4. Typage explicite de la colonne géométrique
-- - Déclare la colonne comme geometry(POLYGON, 3857)
-- - Fixe le SRID de façon explicite (bonne pratique PostGIS)
---------------------------------------------------------------------
ALTER TABLE geo7630h26.h3_hex_parcs
  ALTER COLUMN geom
  TYPE geometry(POLYGON, 3857)
  USING ST_SetSRID(geom, 3857);


---------------------------------------------------------------------
-- 5. Création d’un index spatial GIST
-- - Indispensable pour les performances :
--   jointures spatiales, affichage, agrégations, analyses
---------------------------------------------------------------------
CREATE INDEX h3_hex_parcs_geom_idx
ON geo7630h26.h3_hex_parcs
USING GIST (geom);

select * from geo7630h26.h3_hex_parcs;
