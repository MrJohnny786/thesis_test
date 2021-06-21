https://stackoverflow.com/questions/2438055/how-can-i-run-mongodb-as-a-windows-service

net start MongoDB


// Mongodb as windows servive
sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB 2.6 Standard Legacy\bin\mongod.exe\" --service --config=\"C:\data\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

// Manually mongodb Start
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="C:\data\db"