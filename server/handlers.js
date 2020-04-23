'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');

const client = new MongoClient('mongodb://localhost:27017', {
 useUnifiedTopology: true,
});

const getSeats = async (req, res) => {
 await client.connect();
 const db = client.db('theatre');

 await db.collection('seats')
  .find()
  .toArray(async (err, result) => {
   if (result.length) {
    const seatsObj = {};
    result.forEach(seat => {
     seatsObj[seat._id] = seat;
    })
    res.status(200).json({ seats: seatsObj, numOfRows: 8, seatsPerRow: 12 })
   }
   else
    res.status(404).json({ status: 400, data: 'data not found' });
  });
};

const handleBooking = async (req, res) => {
 const { seatId, creditCard, expiration, fullName, email } = req.body;
 // console.log(seatId);
 // console.log(req.body);

 if (!creditCard || !expiration) {
  return res.status(400).json({
   status: 400,
   message: 'Please provide credit card information!',
  });
 }

 try {
  await client.connect();
  const db = client.db('theatre');
  const newValue = { $set: { isBooked: true } };
  // const newName = { $set: { name: fullName, email: email } };

  const r = await db.collection('seats').updateOne({ _id: seatId }, newValue);
  assert.equal(1, r.matchedCount);
  assert.equal(1, r.modifiedCount);

  // console.log('howdy');
  // await db.collection('seats').insert(req.body);
  // console.log('hello');
  res.status(200).json({ status: 200, success: true });

 } catch (err) {
  res.status(500).json({ status: 500, message: 'err' });
 }
 client.close();
};


module.exports = { getSeats, handleBooking };
