import React from "react";
import ReactLoading from "react-loading";
import Model from "Shared/Model";

const HomeModel = ({
  closeModel,
  titleInput,
  detailsInput,
  addBTN,
  submitBTN,
  taskTitle,
  subTask,
  array,
  showLoading,
}) => {
  return (
  
     <Model closeModel={closeModel} >
       {/* here use the not default(backgroung-color)that use deferent color  */}
    {/* <Model closeModel={closeModel} backgroundColor={"pink"}> */}
      <div
        className="model-content"
        style={{ textAlign: "left", height: "100%", marginTop: "55px" }}
      >
        <input
          value={taskTitle}
          onChange={(eo) => {
            titleInput(eo);
          }}
          required
          placeholder="Add title : "
          type="text"
        />

        <div>
          <input
            onChange={(eo) => {
              detailsInput(eo);
            }}
            placeholder="details "
            type="text"
            value={subTask}
          />
          <button
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>
        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          style={{ marginBottom: "33px" }}
          onClick={async (eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Model>
  );
};

export default HomeModel;
