const { MongoClient } = require('mongodb');

const dbFunction = async (dbName) => {
 // creates client
 const client = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
 });

 const seats = [];
 const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
 for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
   const seat = {
    _id: `${row[r]}-${s}`,
    price: 225,
    isBooked: false,
   };
   seats.push(seat);
  }
 }

 await client.connect();
 console.log('connected!');

 const db = client.db(dbName);

 await db.collection('seats').insertMany(seats);

 client.close();
 console.log('disconnected');
}

dbFunction('theatre');