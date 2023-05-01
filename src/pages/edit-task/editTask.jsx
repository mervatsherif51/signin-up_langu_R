import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import "./editTask.css";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/Config";
import Loading from "comp/Loading";
import TitelSection from "./1-TitelSection";
import SubTasksSection from "./2-SubTasksSection";
import BTNsection from "./3-BTNsection";
import { useParams } from "react-router-dom";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactLoading from "react-loading";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);

  let { stringId } = useParams();
  const navigate = useNavigate();
  // ======================
  // 1- TITLE SECTION
  // =======================
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, stringId), {
      title: eo.target.value,
    });
  };
  // ======================
  // 2- Sub -Task Section
  // =======================
  const completedCheckbox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: false,
      });
    }
  };
  // Trash Icon
  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, stringId), {
      details: arrayRemove(item),
    });
  };

  // ======================
  // 3- BTNs Section
  // =======================
  const [showData, setshowData] = useState(false);
  const deleteBTN = async (eo) => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, stringId));
    navigate("/", { replace: true});
  };

  if (error) {
    return <h1>ERROR : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>Edit Task Page</title>
          <style type="text/css">
            {`
          .Light main h1 span{color: #333}
          
          
          `}
          </style>
        </Helmet>
        <Header />
        {showData ? (
          <main>
            <ReactLoading type={"spin"} color={"#FFF"} height={77} width={77} />
          </main>
        ) : (
          <div className="edit-task">
            {/* Title */}
            <TitelSection
              user={user}
              stringId={stringId}
              titleInput={titleInput}
            />

            {/* Sub Tasks section >>> Trash Icon */}
            <SubTasksSection
              user={user}
              stringId={stringId}
              completedCheckbox={completedCheckbox}
              trashIcon={trashIcon}
            />

            {/* add more BTN & Delete BTN */}

            <BTNsection user={user} stringId={stringId} deleteBTN={deleteBTN} />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
