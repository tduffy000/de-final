Repo for GraphQL & Postgres-based Sequelize server containing a storage of University users for DSE-i2400: Data Engineering final project.

Queries and migrations for the User store of this fictional university are handled
by GraphQL. The source code for those implementations is contained in `src`. Those
operations interact with the database.

The models for the database & Sequelize server along with their valid fields are
contained in `models` and `migrations`, respectively. Please consult the `README`
file in `config` when attempting to setup the database to run on your local machine.

Once that works, if you would like to simply start the project locally:

```bash
yarn start
```

in the root directory. which will open up a GraphQL playground at `localhost:4000`.
In order to play around with the database, you can use the `DB_TESTING_FLAG` located in `src/resolvers.js`.

Otherwise, the project is also located on a Heroku server [here](https://whispering-harbor-80622.herokuapp.com/).

If, for any reason you want to start from scratch and re-seed the database. Use
`restart_db.sh` which will run the various Sequelize commands required for this
operation.s
