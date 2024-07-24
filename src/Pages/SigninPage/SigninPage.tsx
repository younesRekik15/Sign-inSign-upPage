import React, { useState,useEffect } from "react";
import "./SigninPage.css";
import Popup from "../../Components/Popup/Popup";
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>(0);

  const toggleSuccessPopup = () => {
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 5000);
  };

  const toggleErrorPopup = () => {
    setShowErrorPopup(true);
    if(timeoutId){
      clearTimeout(timeoutId);
    }
    setTimeoutId(window.setTimeout(() =>{setShowErrorPopup(false)},5000))
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

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
        toggleSuccessPopup();
      })
      .catch((error) => {
        console.log(error.code, error.text);
        toggleErrorPopup();
      });
  };

  const facebookProvider = new FacebookAuthProvider();
  const signinWithFacebook = async () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.providerData);
        toggleSuccessPopup();
      })
      .catch((error) => {
        console.log(error.code, error.text);
        toggleErrorPopup();
      });
  };

  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toggleSuccessPopup();
      console.log(userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error);
      toggleErrorPopup();
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
    <>
      <Popup
        show={showSuccessPopup}
        type="success"
        message="signed in successfully !"
        togglePopup={() => {
          setShowSuccessPopup(false);
        }}
      />
      <Popup
        show={showErrorPopup}
        type="error"
        message="something went wrong! please try again."
        togglePopup={() => {
          setShowErrorPopup(false);
        }}
      />
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
                placeholder="Enter your password (at least 8 characters)"
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
    </>
  );
};

export default SigninPage;
