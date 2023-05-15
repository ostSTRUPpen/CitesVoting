CLS
@ECHO off
SETLOCAL
TITLE ImportingNewData

mongoimport  --uri "mongodb+srv://%usrname%:%pssword%@%databaseUrl%" --collection cites --file output.json --jsonArray