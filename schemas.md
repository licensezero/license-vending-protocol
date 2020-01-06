# Schemas

## Metadata

Metadata indicate that a library, package, or other artifact is available under additional, paid license terms.

If the manifest format for the artifact supports arbitrary additional data, licensing metadata appear in that manifest under a `licensing` key.  Otherwise, licensing metadata appear in a separate `licensing.json` file in the root directory of the artifact.

## Licenses

Licenses indicate that a user has bought a license for an artifact.

## Standards

Schemas use a number of standards:

- Ed25519 for public-key signatures

- UUIDv4 for random identifiers

- ISO 8601 for date-and-time strings

- ISO 3166 for country subdivision codes

- ISO 4217 for currency codes

- POSIX utility argument syntax for CLI
