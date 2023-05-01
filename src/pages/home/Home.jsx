import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/Config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// import Error404 from "../../pages/Error404";
// Level3
import "./Home.css";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import HomeModel from "./Model";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";
import Snackbar from "Shared/Snackbar";


const Home = () => {
  const { i18n } = useTranslation();
  // this codes for put data insid input details & click on "add"

  const [user, loading, error] = useAuthState(auth);

  // this button make verify email
  const sendEmailAgin = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  //Level 3

  // ====================
  //   FUNCTIONS Of Model
  //======================
  const [showModel, setshowModel] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const [taskTitle, settitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");

  const closeModel = () => {
    setarray([]);
    settitle("");
    setshowModel(false);
  };

  const titleInput = (eo) => {
    settitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();
    // this code use when we need add element into our array
    if (!array.includes(subTask)) {
      array.push(subTask);
    }

    console.log(array);

    setsubTask("");
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      details: array,
      id: taskId,
      completed: false,
    });
    setshowLoading(false);
    settitle("");
    setarray([]);
    setshowModel(false);
    setshowMessage(true);
    setTimeout(() => {
      setshowMessage(false);
    }, 2000);
  };

  if (error) {
    return <h1>ERROR: {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">
            {`
          .Light main h1 span{color: #333}
          
          
          `}
          </style>
        </Helmet>

        <Header />
        <main>
          <h1>
            <span style={{ fontSize: "28px" }}>
              Welcom to react Level 2 🔥🔥🔥
            </span>
          </h1>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "27px" }} to="/signin">
              sign in
            </Link>
            to Continue...
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              Welcome : {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>

            <p>Please verify your email to continue ✋</p>
            <button
              onClick={() => {
                sendEmailAgin();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* SHOW all tasks */}
            <AllTasksSection user={user} />

            {/* Add new tasks BTN*/}
            <section className="mt">
              <button
              dir="auto"
                onClick={() => {
                  setshowModel(true);
                }}
                className="add-task-btn"
              >
                {i18n.language === "ar" && "اضف مهمة جديدة"}
                {i18n.language === "en" && "Add new task"}
                {i18n.language === "fr" && "Ajouter une nouvelle Tâches"}
                <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModel && (
              <HomeModel
                closeModel={closeModel}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                taskTitle={taskTitle}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}
          <Snackbar showMessage={showMessage} />

          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
