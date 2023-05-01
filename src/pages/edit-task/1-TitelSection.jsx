import { db } from "../../firebase/Config";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useRef } from "react";

const TitelSection = ({ user, stringId, titleInput }) => {
  const inputElement = useRef(0);
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

  if (error) {
    return (
      <main>
        <h1>ERROR: {error.message}</h1>
      </main>
    );
  }

  if (loading) {
    return (
      <main>
        <ReactLoading type={"spin"} color={"#FFF"} height={77} width={77} />
      </main>
    );
  }
  // this for show TITLE
  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
        
          style={{textDecoration: value.data().completed ?   "line-through wavy #454545" : null}}
            // @ts-ignore
            ref={inputElement}
            onChange={async (eo) => {
              titleInput(eo);
            }}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
          />
          <i
            onClick={(eo) => {
              // @ts-ignore
              inputElement.current.focus()
            }}
            className="fa-solid fa-pen-to-square"
          ></i>
        </h1>
      </section>
    );
  }
};

export default TitelSection;
