import React, { useState } from "react";
import "./SigninPage.css";
import SocialButton from "../../Components/SocialButton/SocialButton";
import MainButton from "../../Components/MainButton/MainButton";
import FacebookIcon from "../../Components/assets/icons/Facebook.svg";
import GoogleIcon from "../../Components/assets/icons/Google.svg";
import Input from "../../Components/Input/Input";
import { Link } from "react-router-dom";

import { auth } from "../../App";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("Signed in");
  } else {
    console.log("no user");
  }
});

interface Props {}

const SigninPage = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const googleProvider = new GoogleAuthProvider();
  const signinWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.providerData);
      })
      .catch((error) => {
        console.log(error.code, error.text);
      });
  };

  const facebookProvider = new FacebookAuthProvider();
  const signinWithFacebook = async () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.providerData);
      })
      .catch((error) => {
        console.log(error.code, error.text);
      });
  };

  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const resetPassword = async () => {
    sendPasswordResetEmail(auth, email)
      .then(function () {
        alert("verification sent successfully");
      })
      .catch(function (error) {
        alert(error.code + " " + error.text);
      });
  };

  return (
    <div className="container">
      <div className="img-part"></div>
      <div className="login-part">
        <div className="flex-space-item"></div>
        <main className="login-main">
          <header className="login-header">
            <h1>Welcome Back 👋</h1>
            <p>
              Today is a new day. It's your day. You shape it. <br />
              Sign in to start managing your projects.
            </p>
          </header>
          <form>
            <Input
              type="email"
              label="Email:"
              placeholder="Enter your email address"
              value={email}
              handleInput={handleEmailInput}
              width={{ width: "100%" }}
            />
            <Input
              type="password"
              label="Password:"
              placeholder="Create your password (at least 8 characters)"
              value={password}
              handleInput={handlePasswordInput}
              width={{ width: "100%" }}
            />
            <a className="forgot-password" onClick={resetPassword}>
              Forgot Password?
            </a>
            <MainButton width={{ width: "100%" }} onClick={signin}>
              Sign in
            </MainButton>
          </form>
          <div className="or-form">
            <div className="or-container">
              <span className="or">
                <span>Or</span>
                <span className="small-screen-only"> sign in with</span>
              </span>
            </div>
            <div className="social-buttons-container">
              <SocialButton
                brandName="Google"
                registrationType="sign in"
                brandLink={GoogleIcon}
                width={{ width: "100%" }}
                onClick={signinWithGoogle}
              />
              <SocialButton
                brandName="Facebook"
                registrationType="sign in"
                brandLink={FacebookIcon}
                width={{ width: "100%" }}
                onClick={signinWithFacebook}
              />
            </div>
          </div>
          <p className="sign-up">
            Don't you have an account? <Link to="SignupPage">Sign up</Link>
          </p>
        </main>
        <p className="copyright not-small-screen-only">
          &copy; 2023 ALL RIGHTS RESERVED
        </p>
      </div>
      <p className="copyright small-screen-only">
        &copy; 2023 ALL RIGHTS RESERVED
      </p>
    </div>
  );
};

export default SigninPage;