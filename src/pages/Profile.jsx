import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  // if loading
  //if not sign in
  // if user not verification email
  // user with virefication email

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  const deleteBTN = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
        console.log("Account Deleted");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log(error.message);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message} </p>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile </title>

          <style type="text/css">
            {`
            main{
              flex-direction: column;
              align-items: flex-start;
              width:fit-content;
              margin: auto;
              
            }
            .delete{
              margin-top: 25px;
              background-color: #dc3545;
              padding: 0.375rem 0.75rem;
              font-size: 1rem;
              line-height: 1.5;
              border-radius: 0.50rem;
              border-color: #dc3545;
              cursor: pointer;
    
            }
            .delete:active{
              scale: 0.9;
              border-radius: 0;
            }
            
            `}
          </style>
        </Helmet>
        <Header />

        <main>
          <h6>Email: {user.email}</h6>
          <h6>UserName: {user.displayName}</h6>
          <h6>
            Last sign-in :{" "}
            <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
          </h6>

          <h6>
            Account Created:{" "}
            <Moment fromNow date={user.metadata.creationTime} />
          </h6>

          <button
            onClick={() => {
              deleteBTN();
            }}
            className="delete"
          >
            {" "}
            Delete Account{" "}
          </button>
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;
