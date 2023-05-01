import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import Error404 from "../pages/Error404";


const About = () => {
  const inputElement = useRef(null);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


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

  
  if (error) {
    return <Error404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
        </Helmet>

        <Header />
        <main>
          <p>please sign your email</p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (user.emailVerified) {
      return (
        
        <>
        
          <Helmet>
            <title>ABOUT</title>
          </Helmet>
          <Header />
      <main>
        <p>HOW CAN HELP YOU</p>
        <button onClick={(eo) => {
         inputElement.current.focus()
        }} className="delete">Click</button>

       <input ref={inputElement}  type="text" /> 
      
      </main>

          <Footer />
        </>
      );
    }
  }
};


export default About;
