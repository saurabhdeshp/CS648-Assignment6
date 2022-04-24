/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line.
 * Atlas:
 *   mongosh "mongodb+srv://assignment4:CS648@cluster0.scjap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 * or open mongo shell navigate to current directory
 *  and run load('scripts/init.mongo.js')
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.products.deleteMany({});
const itemCount = db.products.countDocuments();
print('Inserted ', itemCount, 'products');

db.counters.deleteOne({ _id: 'products' });
db.counters.insertOne({ _id: 'products', sequenceNum: itemCount });
db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ category: 1 });
