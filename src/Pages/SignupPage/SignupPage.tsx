import React, { useState, useEffect } from "react";
import "./SignupPage.css";
import Popup from "../../Components/Popup/Popup";
import SocialButton from "../../Components/SocialButton/SocialButton";
import MainButton from "../../Components/MainButton/MainButton";
import FacebookIcon from "../../Components/assets/icons/Facebook.svg";
import GoogleIcon from "../../Components/assets/icons/Google.svg";
import Input from "../../Components/Input/Input";
import { Link } from "react-router-dom";

import { auth } from "../../App";

import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

interface Props {}

const SignupPage = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>(0);
  const [showValidations, setShowValidations] = useState(false);

  var validationMessages = [];

  const toggleSuccessPopup = () => {
    setShowSuccessPopup(true);
    if(timeoutId){
      clearTimeout(timeoutId);
    }
    setTimeoutId(window.setTimeout(() =>{setShowSuccessPopup(false)},5000))
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
        toggleSuccessPopup();
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

  const signup = async () => {
    setShowValidations(fshowValidations() ? true : false);
    if (showValidations) {
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
            toggleSuccessPopup();
          } catch (error) {
            console.error("Error updating user display name:", error);
          }
        } else {
          console.log("No user is signed in");
        }

        console.log(userCredential.user, auth.currentUser?.displayName);
      } catch (error) {
        console.error("Error signing up:", error);
        toggleErrorPopup();
      }
    }
  };

  // validations vvvvvvvvvvvvvvvvvvvvvvvvv
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s'-]{1,30}$/;

  function validateName(name: string) {
    if (nameRegex.test(name)) {
      return { message: "good ✓", color: "green", show: false };
    } else {
      return { message: "name is unvalid!", color: "red", show: true };
    }
  }

  function validateEmail(email: string) {
    if (emailRegex.test(email)) {
      return { message: "good ✓", color: "green", show: false };
    } else {
      return { message: "email is unvalid!", color: "red", show: true };
    }
  }

  function validatePassword(password: string) {
    if (password.length >= 8) {
      return { message: "good ✓", color: "green", show: false };
    } else {
      return {
        message: "Password must be at least 8 characters long.",
        color: "red",
        show: true,
      };
    }
  }

  function validateConfirmPassword(password: string, confirmPassword: string) {
    if(confirmPassword == "") {
      return { message: "You have to confirm your password.", color: "red", show: true };
    }else if (password == confirmPassword) {
      return { message: "good ✓", color: "green", show: false };
    }else{
      return { message: "Passwords do not match.", color: "red", show: true };
    }
  }

  function validatePrivacy(isChecked: boolean) {
    if (isChecked) {
      return { message: "good ✓", color: "green" };
    } else {
      return {
        message: "You have to accept our privacy.",
        color: "red",
        show: true,
      };
    }
  }

  const fshowValidations = () => {
    return (
      validateName(name).show ||
      validateEmail(email).show ||
      validatePassword(password).show ||
      validateConfirmPassword(password, confirmPassword).show ||
      validatePrivacy(isChecked).show
    );
  };
  // validations ^^^^^^^^^^^^^^^^^^^^^^

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
              <h1>Create Your Account</h1>
              <p>
                Join us today! Fill in the details below to get started and
                manage your projects effortlessly.
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
                validationResult={validateName(name)}
                show={showValidations}
              ></Input>
              <Input
                type="email"
                label="Email:"
                placeholder="Enter your email address"
                value={email}
                handleInput={handleEmailInput}
                width={{ width: "100%" }}
                validationResult={validateEmail(email)}
                show={showValidations}
              ></Input>
              <Input
                type="password"
                label="Password:"
                placeholder="Create your password (at least 8 characters)"
                value={password}
                handleInput={handlePasswordInput}
                width={{ width: "100%" }}
                validationResult={validatePassword(password)}
                show={showValidations}
              ></Input>
              <Input
                type="password"
                label="Confirm Password:"
                placeholder="Confirm your password"
                value={confirmPassword}
                handleInput={handleConfirmPasswordInput}
                width={{ width: "100%" }}
                validationResult={validateConfirmPassword(
                  password,
                  confirmPassword
                )}
                show={showValidations}
              ></Input>
              <label
                htmlFor="privacy-policy-checkbox"
                className="privacy-policy"
              >
                <input
                  style={(isChecked && showValidations)?{accentColor: "green"}:{background: "red"}}
                  type="checkbox"
                  name="privacy-policy-checkbox"
                  id="privacy-policy-checkbox"
                  onChange={() => {
                    setIsChecked(true);
                  }}
                />
                <span>
                  I have read and accept the <a href="#">Privacy Policy</a> and
                  <a href="#">Terms of Service</a>.<br />
                  {showValidations ? (
                    isChecked ? (
                      <span style={{ color: "green" }}>good ✓</span>
                    ) : (
                      <span style={{ color: "red" }}>
                        you have to accept our privacy
                      </span>
                    )
                  ) : (
                    <></>
                  )}
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
    </>
  );
};

export default SignupPage;
