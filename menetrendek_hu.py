import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("indulas", help="ind")
    parser.add_argument("erkezes", help="erk")
    parser.add_argument("ido", help="ido")

    args = parser.parse_args()
    print(args.indulas)