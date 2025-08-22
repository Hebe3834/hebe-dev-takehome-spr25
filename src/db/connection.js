import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.ATLAS_URI) {
    throw new Error("Mongo URI not found");
}
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function getDB(dbName) {
    try {
        await client.connect();
        await client.db("admin").command({ ping : 1 });
        console.log("Pinged your deployment, successfully connected to mongodb");
        return client.db(dbName);
    } catch (err) {
        console.log(err);
    }
}

export async function getCollection(collectionName) {
    const db = await getDB("library");
    console.log("getCollection");
    if (db) {
        return db.collection(collectionName);
    } else {
        throw new Error("Failed to connect to MongoDB");
    }
    return null;
}