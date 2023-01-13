import User from "../models/user.model";
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
  
  const loginUser = (info: any, callback: Function) => {
    User.findOne({ email: info.email })
      .then((user) => {
        if (!user) {
          callback({ message: "User does not exist" });
        } else {
          bcrypt
            .compare(info.password, user.password)
            .then((isMatch : any) => {
              if (!isMatch) {
                callback({ message: "Invalid password" });
              } else {
                const payload = {
                  id: user.id,
                };
                jwt.sign(
                  payload,
                  process.env.JWT_SECRET || "",
                  { expiresIn: 3600 },
                  (err : any, token : any) => {
                    if (err) throw err;
                    callback(null, token);
                  }
                );
              }
            })
            .catch((error : any) => {
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
          }
          )
          .catch((error) => {
              callback(error);
          }
          );
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
  
  
  export { signUpUser, loginUser, getUser , logout};