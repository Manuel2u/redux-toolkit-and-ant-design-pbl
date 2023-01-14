import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <center>
        <form action="/" method="post">
          <div className={styles.container}>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />

            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="username"
              required
            />

            <label for="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="pass1"
              placeholder="Enter Password"
              name="password"
              required
            />

            <label for="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input
              type="password"
              id="pass2"
              placeholder="Repeat Password"
              name="passwordConfirm"
              required
            />
            <span id="error"></span>

            <div className={styles.clearfix}>
              <button
                type="submit"
                onclick="registerErrorMessage()"
                className={styles.cancelbtn}
              >
                Sign Up
              </button>
              <button
                type="button"
                onclick="login();"
                className={styles.signupbtn}
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className={styles.hz}>
          <hr className="hr-text" data-content="OR" />
        </div>

        <link
          rel="stylesheet"
          type="text/css"
          href="//fonts.googleapis.com/css?family=Open+Sans"
        />

        <div className={styles.google_btn}>
          <div className={styles.google_icon_wrapper}>
            <img
              className={styles.google_icon}
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className={styles.btn_text}>
            <a href="/auth/google">
              <b>Sign up with google</b>
            </a>
          </p>
        </div>
      </center>
    </>
  );
};

export default Home;
