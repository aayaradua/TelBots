import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import fs from "fs";
import path from "path";
import { ENV } from "../config/index.js";

const apiId = Number(ENV.API_ID);
const apiHash = ENV.API_HASH;
const sessionString = fs.readFileSync(path.join("src", "sessionString.txt"), "utf8").trim();
const client = new TelegramClient(new StringSession(sessionString), apiId, apiHash, { connectionRetries: 5 });
let isConnected = false;

async function ensureConnected() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
}

export async function checkBot(username) {
  try {
    await ensureConnected();
    const entity = await client.getInputEntity(username);
    const result = await client.invoke(new Api.users.GetFullUser({ id: entity }));
    console.log("results", result);
    return result;
  } catch (err) {
    return { status: "Failed", message: err.message };
  }
}
