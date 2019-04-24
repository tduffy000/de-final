`setup.sh` is required because the development machine runs on Ubuntu Linux, which does not have a default postgres user.

See more [here](https://stackoverflow.com/questions/7695962/postgresql-password-authentication-failed-for-user-postgres).

If you run on another system you edit `config/config.js` such that the username & password pairs are "root":null.