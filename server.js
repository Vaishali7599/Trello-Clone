const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")


//load .env:
dotenv.config()

const app = express()


const PORT = process.env.PORT || 4200


//middleware:
app.use(express.json());             //it would on the top, it should be the first middleware     --- middleware --> convert data into json




//DB:
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,          //useNewUrlParser--> help mongodb to access url and understand our url more efficiently
    useUnifiedTopology: true            //useUnifiedTopology--> improve the connect related problem and improve mongodb connection
})
.then(() => console.log("DB connected"))
.catch((err) => console.log(err))



//Routes:
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Trello Clone API WORLD"
    })
})


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})