import User from "../models/user.model";
import List from "../models/list.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUpUser = (info: any, callback: Function) => {
  User.findOne({ email: info.email })
    .then((user) => {
      if (user) {
        callback({ message: "User already exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(info.password, salt, (err, hash) => {
            if (err) throw err;
            info.password = hash;
            const newUser = new User(info);
            newUser
              .save()
              .then((user) => {
                callback(null, user);
              })
              .catch((error) => {
                callback(error);
              });
          });
        });
      }
    })
    .catch((error) => {
      callback(error);
    });
};



const generateToken = (id:any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || ""
    , {
      expiresIn: "30d",
    });
};

const loginUser = (info: any, callback: Function) => {
  User.findOne({ email: info.email })
    .then((user) => {
      if (!user) {
        callback({ message: "User does not exist" });
      } else {
        bcrypt
          .compare(info.password, user.password)
          .then((isMatch: any) => {
            if (!isMatch) {
              callback({ message: "Invalid password" });
            } else {
              const token = generateToken(user._id);
              callback(null, { user, token });
            }
          })
          .catch((error: any) => {
            callback(error);
          });
      }
    })
    .catch((error) => {
      callback(error);
    });
};

const getUser = (id: any, callback: Function) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        callback({ message: "User does not exist" });
      } else {
        callback(null, user);
      }
    })
    .catch((error) => {
      callback(error);
    });
};

const logout = async (id: string, callback: Function) => {
  try {
    //clear token and user data from session or localstorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    callback(null, id);
  } catch (error) {
    callback(error);
  }
};

const createList = async (info: any, callback: Function) => {
  try {
    const newList = new List(info);
    newList
      .save()
      .then((list) => {
        callback(null, list);
      })
      .catch((error) => {
        callback(error);
      });
  } catch (error) {
    callback(error);
  }
};

const getLists = async (id: any, callback: Function) => {
  try {
    List.find({ userId: id })
      .then((lists) => {
        callback(null, lists);
      })
      .catch((error) => {
        callback(error);
      });
  } catch (error) {
    callback(error);
  }
};

const getList = async (id: any, callback: Function) => {
  try {
    List.findById(id)
      .then((list) => {
        callback(null, list);
      })
      .catch((error) => {
        callback(error);
      });
  } catch (error) {
    callback(error);
  }
};

const deleteList = async (id: any, callback: Function) => {
  try {
    List.findByIdAndDelete(id)
      .then((list) => {
        callback(null, list);
      })
      .catch((error) => {
        callback(error);
      });
  } catch (error) {
    callback(error);
  }
};

export { signUpUser, loginUser, getUser, logout, createList, getLists, getList, deleteList };
