import pg from "pg";

//DataBase Connection
// postgres://dhanush:JGja9Qb4Tego@ep-morning-darkness-421488.us-east-2.aws.neon.tech/neondb

const PGHOST = 'ep-morning-darkness-421488.us-east-2.aws.neon.tech'
const PGDATABASE = 'neondb'
const PGUSER = 'dhanush'
const PGPASSWORD = 'JGja9Qb4Tego'
const PGPORT = '5432'
const ENDPOINT_ID = 'E-commerce Website'

var conn = new pg.Client({
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT,
    host: PGHOST,
    ssl: true,
    connectionTimeoutMillis: 1000000, 
    idleTimeoutMillis: 1000000 
});

//checking connectivity
const connectDB = async () => {
    try {
      console.log("Connecting....")
      await conn.connect();
      console.log("Connected to db");
    } catch (err) {
      console.error("Error connecting to the database: " + err.message);
    }
  };

  export { conn, connectDB };