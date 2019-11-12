import User from '../models/user';
import '../config';

const createUser= async ({username, email, password}) =>{
  const user = new User({
    username,
    email,
    password,
  });
  const res = await user.save();
  }

  const seedUser = [{
    username: "Onyinye",
    email: "onyinye@gmail.com",
    password: "dfafdtt3"
  },
  {
    username: "Julius",
    email: "julius@gmail.com",
    password: "gjhgtghhg"
  },
  {
    username: "emeka",
    email: "emeka@gmail.com",
    password: "gjhgtghhg"
  },
  {
    username: "Bola",
    email: "bola@gmail.com",
    password: "gjhgtghhg"
  },
  {
    username: "Yemi",
    email: "yemi@gmail.com",
    password: "gjhgtghhg"
  }];

  seedUser.forEach(newUser => createUser(newUser));