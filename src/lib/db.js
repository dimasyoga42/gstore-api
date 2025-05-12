import mongoose from "mongoose"

export const IsConnect = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`database connected ${con.connection.host}`)
    } catch(error) {
        console.log(`${error}`)
    }
}