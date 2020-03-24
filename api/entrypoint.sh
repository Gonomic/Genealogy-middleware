#!/bin/bash
set -e
cmd="$@"


export DATABASE_URL=mysql://humansUser:yLSivovg8jvkbSDPtUsx@dekknet.com:33306/humans


function mysql_ready(){
node << END
var nativeResult;
var mysql = require("sails-mysql");
var connection = mysql.connection({
  user: '$MYSQL_USER',
  password: '$MYSQL_PASSWORD',
  database: '$MYSQL_USER',
  port: 5432,
  host: 'mysql',
});
connection.connect(function (err) {
  console.log(JSON.Stringify(result));
  if (err) {
    console.log('Connection failed');
    console.error(err);
    process.exit(1);
  }
  console.log('Connection successful');
  process.exit(0);
});
END
}

until mysql_ready; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - continuing..."
exec $cmd