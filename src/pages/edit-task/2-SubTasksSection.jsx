import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";
import Moment from "react-moment";
import { useState } from "react";
import { async } from "@firebase/util";

const SubTasksSection = ({ user, stringId, completedCheckbox, trashIcon }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [subTitle, setsubTitle] = useState("");

  if (value) {
    return (
    
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            Created : <Moment className="time" fromNow date={value.data().id} />
          </p>
          <div>
            {/* this codes for make check & not check on square beside completed word */}
            <input
              onChange={async (eo) => {
                completedCheckbox(eo);
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            {/* my false work Mervatco */}
          
            <label htmlFor="checkbox">Completed</label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p>{item}</p>
                <i
                  onClick={() => {
                    trashIcon(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTask && (
          <form style={{flexDirection: "row"}} className="add-new-task flex">
            <input
              value={subTitle}
              onChange={(eo) => {
                setsubTitle(eo.target.value);
              }}
              className="add-task"
              type="text"
            />
            <button
              onClick={async (eo) => {
                eo.preventDefault();
                setsubTitle("");
                await updateDoc(doc(db, user.uid, stringId), {
                  details: arrayUnion(subTitle),
                });
              
              }}
              className="add"
            >
              Add
            </button>
            <button
              onClick={(eo) => {
                eo.preventDefault();
                setshowAddNewTask(false);
              }}
              className="cancel"
            >
              Cancel
            </button>
          </form>
        )}
        {/* this for add tasks */}
        <div className="center mttt">
          <button
            onClick={() => {
              setshowAddNewTask(true);
            }}
            className="add-more-btn"
          >
            Add more<i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
};

export default SubTasksSection;
