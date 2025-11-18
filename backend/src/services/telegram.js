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

const ensureConnected = async() => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
}

export const checkBot = async(username) => {
  try {
    await ensureConnected();
       const entity = await client.getInputEntity(username);
    const botData = await client.invoke(new Api.users.GetFullUser({ id: entity }));
     
    const coreBot = {
      username: botData?.users?.[0]?.username ?? null,
      name: botData?.users?.[0]?.firstName ?? null,
      id: botData?.fullUser?.id?.value.toString() ?? botData?.users?.[0]?.id?.value.toString() ?? null,
      about: botData?.fullUser?.about ?? null,
      description: botData?.fullUser?.botInfo?.description ?? null,
      profilePhoto: botData?.fullUser?.profilePhoto ?? botData?.users?.[0]?.photo ?? null,
      activeUsers: botData?.users?.[0]?.botActiveUsers ?? null,
      privacyPolicyUrl: botData?.fullUser?.botInfo?.privacyPolicyUrl ?? null,
      commands: botData?.fullUser?.botInfo?.commands ?? []
    };
    
    const profilePhoto = botData?.fullUser?.profilePhoto ?? botData?.users?.[0]?.photo ?? null;
  if (profilePhoto) {
    const inputPhotoLocation = new Api.InputPhotoFileLocation({
      id: BigInt(profilePhoto.id.value),
      accessHash: BigInt(profilePhoto.accessHash.value),
      fileReference: profilePhoto.fileReference, 
      thumbSize: "x",
    });

    const buffer = await client.downloadProfilePhoto(username, { big: true });
    if (buffer) {
      const base64Image = buffer.toString("base64");
       coreBot.profilePhoto = `data:image/jpeg;base64,${base64Image}`;
    }
  }
    return coreBot;

  } catch (err) {
   throw err;
  }
};
