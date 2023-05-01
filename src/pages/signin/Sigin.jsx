import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/Config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import Model from "Shared/Model";
import ReactLoading from "react-loading";

const Signin = () => {
  const [showLoading, setshowLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [resetPass, setresetPass] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);

  const signInBTN = async (eo) => {
    setshowLoading(true);
    eo.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasError(true);

        switch (errorCode) {
          case "auth/operation-not-allowed":
            setfirebaseError("لا يُمكن انشاء حساب فى الوقت الحالى ");
            break;

          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/user-not-found":
            setfirebaseError(" Email not found");
            break;

          case "auth/wrong-password":
            setfirebaseError("Wrong password");
            break;

          case "auth/too-many-requests":
            setfirebaseError(
              "Too many requests, please try again after 5 minute"
            );
            break;

          default:
            setfirebaseError("pleast check your Email & Password");
            break;
        }
      });

    setshowLoading(false);
  };
  // Level 3
  const [showModel, setshowModel] = useState(false);
  const forgotPassword = () => {
    setshowModel(true);
  };

  const closeModel = () => {
    setshowModel(false);
  };

  return (
    <>
      <Helmet>
        <title>SignIn</title>
      </Helmet>
      <Header />

      <main>
        {showModel && (
          <Model closeModel={closeModel}>
            <input
              onChange={(eo) => {
                setresetPass(eo.target.value);
              }}
              required
              placeholder="E-mail: "
              type="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();

                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    setshowSendEmail(true);
                    console.log("send Email");
                  })
                  .catch((error) => {});
              }}
            >
              Reset Password
            </button>
            {showSendEmail && (
              <p className="check-email">
                Please check your email to Reset your Password
              </p>
            )}
          </Model>
        )}

        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            required
            placeholder="E-mail: "
            type="email"
          />
          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            required
            placeholder="Password: "
            type="password"
          />
          <button
            onClick={(eo) => {
              signInBTN(eo);
            }}
          >
            {showLoading ? (
              <div style={{ justifyContent: "center" }} className="flex">
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={20}
                  width={20}
                />
              </div>
            ) : (
              "Sign in"
            )}
          </button>
          <p className="account">
            Don't have account <Link to="/signup"> sign-up</Link>
          </p>
          <p
            onClick={() => {
              forgotPassword();
            }}
            className="forgot-pass mtt"
          >
            Forgot Password ?
          </p>
          {hasError && <h6 className="mtt">{firebaseError}</h6>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
