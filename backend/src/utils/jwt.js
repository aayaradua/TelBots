import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";


const privateKey = fs.readFileSync(path.join("src/keys", "private.key"), 'utf8');
const publicKey = fs.readFileSync(path.join("src/keys", "public.key"), 'utf8');

export const signAccessToken = (payload) => jwt.sign(payload, privateKey, {
    expiresIn: "15m",
    algorithm: "RS256"
});

export const signRefreshToken = (payload) => jwt.sign(payload, privateKey, {
    expiresIn: "7d",
    algorithm: "RS256"
});

export const verifyJwtToken = (payload) => jwt.verify(payload, publicKey, {
    algorithms: ["RS256"]
});