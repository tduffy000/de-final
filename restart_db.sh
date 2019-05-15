echo 'This will delete all tables (and their values) currently in the database, PROCEED WITH CAUTION!'
read -p 'Proceed? (y/n): ' decision;
if [ $decision = "y" ]; then
    npx sequelize-cli db:seed:undo:all
    npx sequelize-cli db:migrate:undo:all
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
fi
