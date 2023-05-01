import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Error404 from "../pages/Error404";
import ReactLoading from "react-loading";
const Signup = () => {
  const [showLoading, setshowLoading] = useState(false);

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [userName, setuserName] = useState("");

  const [user, loading, error] = useAuthState(auth);
  // Loading
  // Not Sign in
  // sign-in without Email verification
  // sign-in && verifiied email => navigate ("/")

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  // this function .... button make sign up
  const signupBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
        });

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/operation-not-allowed":
            setfirebaseError("لا يُمكن انشاء حساب فى الوقت الحالى ");
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

  if (error) {
    return <Error404 />;
  }

  if (loading) {
    return (
      <div>
        <Header />
        <main> Loading ........</main>
        <Footer />
      </div>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />
          <main>
            <p>We send you an Email to verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
          <form>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create Account{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>

            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              placeholder="User Name: "
              type="text"
            />

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
                signupBTN(eo);
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
                "Sign up"
              )}
            </button>
            <p className="account">
              Already have an Account<Link to="/signup"> sign-in</Link>
            </p>
            {hasError && <h6 className="mtt">{firebaseError}</h6>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};
export default Signup;
