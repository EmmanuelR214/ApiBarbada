import { TOKEN_SECRET } from "../config.js"
import jwt from "jsonwebtoken";

export function CreateAccessToken (payload){
  return new Promise((resolve, reject) => {
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    payload.exp = exp
    jwt.sign(
      payload,
      TOKEN_SECRET,
      (err, token) =>{
        if(err) reject(err)
        resolve(token)
      }
    )
  })
}