const { createHmac, randomBytes } = require('crypto');
const {Schema, model} = require('mongoose');
const {createTokenForUser} = require("../services/authentitaction");

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  phone_number: { type:String, unique: true, required: true},
  salt: {type: String},
  password: { type: String, required: true },
  priority: { type: Number, enum: [0, 1, 2], default: 0 },
},
{timestamps: true}
);

userSchema.pre('save', function (next) {
  const user= this;

    if(!user.isModified("password")) return;//if pass not modfied keep same

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)//salt is secret
                .update(user.password)//when this password is updated
                .digest('hex');
    
    this.salt=salt;
    this.password=hashedPassword;

    next();
});

//virtual function
userSchema.static("matchPasswordAndGenerateToken", async function(phone_number, password){ // takes users pass, created hash and compares with one in db
  const user= await this.findOne({phone_number});
  // console.log(user);
  if(!user) throw new Error('User not Found!');

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac('sha256', salt)
              .update(password)
              .digest('hex');
  
  if(hashedPassword!== userProvidedHash){
      throw new Error('Incorrect Password!');
  }

  const token = createTokenForUser(user);
  return token;
});

const User= model("user", userSchema);

module.exports= User;
