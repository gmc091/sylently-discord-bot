import mongoose from 'mongoose'

let cached

const mongoConnect = async () => {
  if (cached) {
    console.log('Returning cached connection')
    return cached
  }

  console.log('Creating a new connection')

  return await new Promise((resolve) => {
    mongoose.connect(process.env.MONGO_URI).then((mongoose) => {
      cached = mongoose
      resolve(cached)
    })
  })
}

export default mongoConnect
