import React, { useState } from "react";
import "./SignupPage.css";
import SocialButton from "../../Components/SocialButton/SocialButton";
import MainButton from "../../Components/MainButton/MainButton";
import FacebookIcon from "../../Components/assets/icons/Facebook.svg";
import GoogleIcon from "../../Components/assets/icons/Google.svg";
import Input from "../../Components/Input/Input";
import { Link } from "react-router-dom";

import { auth } from "../../App";

import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";

interface Props {}

const SignupPage = (props: Props) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s'-]{1,30}$/;

  function validateEmail(email: string) {
    return emailRegex.test(email);
  }

  function validateName(name : string) {
    return nameRegex.test(name);
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const googleProvider = new GoogleAuthProvider();
  const signinWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.providerData);
      })
      .catch((error) => {
        console.log(error.code,error.text);
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
        console.log(error.code,error.text);
      });
  };

  const signup = async () => {
    if(!validateName(name)){
      alert("Name is not valid.")
    }else if (!validateEmail(email)) {
      alert("Email is not valid.");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
    } else if (password != confirmPassword) {
      alert("Passwords don't match.");
    } else if (!isChecked) {
      alert("You have to accept our privacy.");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = auth.currentUser;

        if (user) {
          try {
            await updateProfile(user, {
              displayName: name,
            });
            console.log("User display name updated to:", name);
          } catch (error) {
            console.error("Error updating user display name:", error);
          }
        } else {
          console.log("No user is signed in");
        }

        console.log(userCredential.user, auth.currentUser?.displayName);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="img-part"></div>
      <div className="login-part">
        <div className="flex-space-item"></div>
        <main className="login-main">
          <header className="login-header">
            <h1>Create Your Account</h1>
            <p>
              Join us today! Fill in the details below to get started and manage
              your projects effortlessly.
            </p>
          </header>
          <form>
            <Input
              type="text"
              label="Full Name:"
              placeholder="Enter your full name"
              value={name}
              handleInput={handleNameInput}
              width={{ width: "100%" }}
            ></Input>
            <Input
              type="email"
              label="Email:"
              placeholder="Enter your email address"
              value={email}
              handleInput={handleEmailInput}
              width={{ width: "100%" }}
            ></Input>
            <Input
              type="password"
              label="Password:"
              placeholder="Create your password (at least 8 characters)"
              value={password}
              handleInput={handlePasswordInput}
              width={{ width: "100%" }}
            ></Input>
            <Input
              type="password"
              label="Confirm Password:"
              placeholder="Confirm your password"
              value={confirmPassword}
              handleInput={handleConfirmPasswordInput}
              width={{ width: "100%" }}
            ></Input>
            <label htmlFor="privacy-policy-checkbox" className="privacy-policy">
              <input
                type="checkbox"
                name="privacy-policy-checkbox"
                id="privacy-policy-checkbox"
                onChange={() => {
                  setIsChecked(true);
                }}
              />
              <span>
                I have read and accept the <a href="#">Privacy Policy</a> and
                <a href="#">Terms of Service</a>.
              </span>
            </label>
            <MainButton width={{ width: "100%" }} onClick={signup}>
              sign up
            </MainButton>
          </form>
          <div className="or-form">
            <div className="or-container">
              <span className="or">
                <span>Or</span>
                <span className="small-screen-only"> sign up with</span>
              </span>
            </div>
            <div className="social-buttons-container">
              <SocialButton
                brandName="Google"
                registrationType="sign up"
                brandLink={GoogleIcon}
                width={{ width: "100%" }}
                onClick={signinWithGoogle}
              ></SocialButton>
              <SocialButton
                brandName="Facebook"
                registrationType="sign up"
                brandLink={FacebookIcon}
                width={{ width: "100%" }}
                onClick={signinWithFacebook}
              ></SocialButton>
            </div>
          </div>
          <p className="sign-up">
            Already have an account? <Link to="../">Sign in</Link>
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

export default SignupPage;
