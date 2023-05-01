import { Helmet } from "react-helmet-async";

//  closeModel => function to close the Model
const Model = ({ closeModel, children, backgroundColor = "whitesmoke" }) => {
  return (
    <div className="parent-of-model">
      <Helmet>
        <style type="text/css">
          {`
.parent-of-model{

  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}


.model {

  width: 400px;
  height: 333px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  overflow-y:auto;
  animation: mymove 0.8s;
}
@keyframes mymove{
  0% {scale: 0; transform: translateY(-100vh);}

  100% {scale: 1; transform: translateY(0);}
}



.close .fa-xmark {
  color: #444;
  font-size: 29px;
  position: absolute;
  top: 17px;
  right: 22px;
}

.close .fa-xmark:hover {
  font-size: 30px;
  color: orangered;
  transform: rotate(180deg);
  transition: all 0.7s;

}

.check-email {
  color: #333;
  font-size: 16px;
  margin-top: 25px;
  line-height: 25px;
}

          
          
          `}
        </style>
      </Helmet>
      <form style={{ backgroundColor: backgroundColor }} className={`model`}>
        <div
          onClick={() => {
            closeModel();
          }}
          className="close"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        {children}
      </form>
    </div>
  );
};

export default Model;
