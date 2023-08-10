## API Example for Trial Class:
### Third Party Integration

#### Database Setup
Please provide postgresql database, and provide its URL in .env file. for example
```
DB=postgres://postgres:postgres@localhost:5432/trial-class-db
```

#### Database Setup: Migration
If you already installed go migrate package [golang-migrate](https://medium.com/@aldinofrizal/golang-migrate-8990135cdc6)
just run
```bash
migrate -database ${POSTGRESQL_URL} -path migrations up
```
if you are not, you can copy-paste the DDL queries from `/migrations`.

#### Database Setup: Migration
Seeding queries provided on `/seeders` path.
