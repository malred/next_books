import fs from 'fs'
import path from 'path'
import mongodb, { MongoClient } from 'mongodb'

// const filePath = path.join(process.cwd(), "data", "books.json")

function getData() {
  // 只会暴露给服务端，不会暴露到浏览器端
  // console.log(process.env.SECRET);
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data
}

async function handler(req, res) {
  const client = await MongoClient.connect(
    `mongodb+srv://malguy2022:${process.env.SECRET}@cluster0.umzcezh.mongodb.net/?retryWrites=true&w=majority`
  )
  // create db
  const db = client.db("books")

  if (req.method === 'GET') {
    let books
    try {
      books = await db.collection("books").find().sort().toArray()
    } catch (e) {
      console.log(e);
    }
    // const data = getData()
    if (!books) {
      return res.status(500).json({ message: "Internal Server Error" })
    }
    return res.status(200).json({ message: books })
  } else if (req.method === 'POST') {
    const { name, description, imgUrl } = req.body
    if (!name || name.trim() === ""
      || !description || description.trim() === ""
      || !imgUrl || imgUrl.trim() === "") {
      return res.status(422).json({ message: 'Invalid data' })
    }
    // const data = getData()
    const newBook = {
      name, description, imgUrl, id: Date.now()
    }
    // data.push(newBook) 
    // fs.writeFileSync(filePath, JSON.stringify(data))
    let generatedBook
    try {
      generatedBook = await db.collection("books").insertOne(newBook)
    } catch (e) {
      console.log(e);
    }
    return res.status(201).json({ message: "Added", book: generatedBook })
  }
}
export default handler