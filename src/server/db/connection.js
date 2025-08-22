import { MongoClient, ServerApiVersion } from "mongodb";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { ObjectId } from "mongodb";

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

export async function createRequest(request) {
    try {
        const db = await getDB("library");
        if (!db) {
            throw new Error("Failed to connect to database");
        }
        const collection = db.collection("requests");
        const result = await collection.insertOne(request);
        console.log("Insert result:", result);
        return result;
    } catch (error) {
        console.error("Database error in createRequest:", error);
        throw error;
    }
}

export async function getRequest(status, page) {
    const db = await getDB("library");
    const collection = db.collection("requests");
    let query = {};
    if (status) {
        query.status = status;
    }    
    const result = await collection.find(query)
        .skip((page - 1) * PAGINATION_PAGE_SIZE)
        .limit(PAGINATION_PAGE_SIZE)
        .toArray();
    console.log(result);
    return result;
}

export async function editRequest(request) {
    const db = await getDB("library");
    const collection = db.collection("requests");
    const result = await collection.updateOne({ _id: new ObjectId(request.id) }, { $set: { status: request.status } });
    console.log(result);
    return result;
}
