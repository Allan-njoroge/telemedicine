import Redis from 'ioredis'
import dotenv from "dotenv"
dotenv.config()
const { REDIS_HOST, REDIS_PORT } = process.env

const redis = new Redis({
    host: REDIS_HOST || "127.0.0.1",
    port: REDIS_PORT || 6379
})

export default redis;