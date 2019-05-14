# https://dba.stackexchange.com/questions/1285/how-do-i-list-all-databases-and-tables-using-psql
u="$USER";
psql -d app_db_dev -U tduffy -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $u";
psql -d app_db_dev -U tduffy -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $u";
