import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://aayaradua:ululalbab2018@cluster-1.dharfjb.mongodb.net/TelBots?retryWrites=true&w=majority&appName=Cluster-1";

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("categories");

    // Get existing indexes
    const indexes = await collection.indexes();
    const slugIndex = indexes.find((idx) => idx.name === "slug_1");

    if (slugIndex) {
      console.log("⚙️ Dropping index: slug_1");
      await collection.dropIndex("slug_1");
      console.log("✅ Dropped slug_1 index");
    } else {
      console.log("ℹ️ No slug_1 index found — skipping drop");
    }

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

run();
