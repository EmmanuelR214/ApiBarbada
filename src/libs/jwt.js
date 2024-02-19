import { TOKEN_SECRET } from "../config.js"
import jwt from "jsonwebtoken";

export function CreateAccessToken (payload){
  return new Promise((resolve, reject) => {
    const exp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    payload.exp = exp.getTime() / 1000
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