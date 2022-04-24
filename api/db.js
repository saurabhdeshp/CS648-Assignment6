require('dotenv').config();
const { MongoClient } = require('mongodb');

const COUNTERS = 'counters';
const PRODUCTS = 'products';
const DELETED_PRODUCTS = 'deleted_products'

let db;

const url = process.env.DB_URL 
|| 'mongodb+srv://assignment4:CS648@cluster0.scjap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function connectToDatabase () {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log( "db Connected")
  db = client.db();
//  console.log(await db.collection(PRODUCTS).find({}).toArray())
};

async function sequenceNumDocument(name) {
  const result = await db

    .collection(COUNTERS)
    .findOneAndUpdate(
      { _id: name },
      {
        $inc: { sequenceNum: 1 },
        $set: { _id: name },
      },
      { returnOriginal: false, upsert: true },
    );
  return result.value.sequenceNum;
}

const get = async (_, { id }) => {
    return db.collection(PRODUCTS).findOne({ id });
  };
  
  const list = async () => {
    return db.collection(PRODUCTS).find({}).toArray();
  };
  
  const add = async (_,  product ) => {
    product.id = await sequenceNumDocument(PRODUCTS);
  
    const result = await db.collection(PRODUCTS).insertOne(product);
    return db
      .collection(PRODUCTS)
      .findOne({ _id: result.insertedId });
  };
  
  const update = async (_, { id, changes }) => {
    if (changes.name || changes.category || changes.price || changes.url) {
      const product = await db.collection(PRODUCTS).findOne({ id });
      Object.assign(product, changes);
    }
    await db.collection(PRODUCTS).updateOne({ id }, { $set: changes });
    return db.collection(PRODUCTS).findOne({ id });
  };
  
  const remove = async (_, { id }) => {
    const product = await db.collection(PRODUCTS).findOne({ id });
    if (!product) return false;
  
    product.deleted = new Date();
    let result = await db.collection(DELETED_PRODUCTS).insertOne(product);
    if (result.insertedId) {
      result = await db.collection(PRODUCTS).removeOne({ id });
      return result.deletedCount === 1;
    }
    return false;
  };
  



module.exports = {
  connectToDatabase,
  sequenceNumDocument,
  COUNTERS,
  PRODUCTS,
  DELETED_PRODUCTS,
  update, list, add, get, delete: remove,
};