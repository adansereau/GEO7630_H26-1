"""
Micro-script admin: définir le search_path de plusieurs rôles PostgreSQL.

Pré-requis:
  pip install psycopg

Important:
- Doit être exécuté avec un compte ayant le droit de faire ALTER ROLE sur ces utilisateurs.
"""

import getpass
import psycopg
from psycopg import sql


HOST = "geo7630.c124ic8ew2kc.ca-central-1.rds.amazonaws.com"
PORT = "5432"
DBNAME = "geo7630h26"

ROLES = ["ha891140", "cg290808", "ec790898", "kf391972", "ha091004"]


def main():
    print("=== Définir search_path pour plusieurs rôles ===")
    print(f"Serveur : {HOST}")
    print(f"Base de données : {DBNAME}\n")

    admin_user = input("Utilisateur admin PostgreSQL: ").strip()
    if not admin_user:
        raise SystemExit("Erreur: utilisateur admin vide.")

    admin_password = getpass.getpass("Mot de passe admin: ")
    if not admin_password:
        raise SystemExit("Erreur: mot de passe admin vide.")

    dsn = (
        f"host={HOST} "
        f"port={PORT} "
        f"dbname={DBNAME} "
        f"user={admin_user} "
        f"password={admin_password}"
    )

    try:
        with psycopg.connect(dsn) as conn:
            conn.autocommit = True  # ALTER ROLE doit être hors transaction
            with conn.cursor() as cur:
                cur.execute("SELECT current_user;")
                print(f"Connecté comme: {cur.fetchone()[0]}\n")

                for r in ROLES:
                    # ALTER ROLE <role> SET search_path = <schema>, public;
                    q = sql.SQL("ALTER ROLE {} SET search_path = {}, public;").format(
                        sql.Identifier(r),
                        sql.Identifier(r),
                    )
                    cur.execute(q)
                    print(f"OK: {r} -> search_path = {r}, public")

        print("\nTerminé.")
    except Exception as e:
        raise SystemExit(f"Échec: {e}")


if __name__ == "__main__":
    main()
