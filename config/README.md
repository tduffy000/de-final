A dummy password is used in `config.json` because Linux requires one when running postgres locally. You can, on a different setup, likely change it to `null` (as was shown in the sample project).

I.e. if you run on another system (Mac OS X/Windows) you may edit `config/config.js` such that the username & password pairs are "root":null. **You will need to change the username field if running locally**:

```bash
get_user.sh
```

to see your local user.

See more [here](https://stackoverflow.com/questions/7695962/postgresql-password-authentication-failed-for-user-postgres).
