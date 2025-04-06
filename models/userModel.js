const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        maxlength: [50, "cannot more than 50 char"]
    },
    email: {
        type: String,
        required: [true, "please add an email"],
        unique: [true, "email already exist"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "please add a pwd"],
        minlength: [6, "pwd must be at least 6 char"],
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        try{
            this.password = await bcrypt.hash(this.password, 12)
        }catch(err){
            console.log(err)
        }
        finally{
            next()
        }
    }else{
        next()
    }
})

module.exports = mongoose.model("User", userSchema)