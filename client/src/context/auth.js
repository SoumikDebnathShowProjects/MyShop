import { useState, useEffect, useContext, createContext} from "react";
import axios from "axios";
const AuthContext = createContext();



const AuthProvider = ({children}) => {
    // global
    const [auth, setAuth] = useState({
        user: null,
        token: "",
      });

      // default axios
      axios.defaults.headers.common['Authorization'] = auth?.token




      useEffect(() => {
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token

            });
        }
        //eslint-disable-next-line
      },[]);  //[] empty object
      /*
      not this [auth,setAuth]); it forms infinit loop
      The warning "Maximum update depth exceeded" typically occurs when there is an unintentional infinite loop in your component. In your 
case, the issue arises from having auth and setAuth in the dependency array of the useEffect 
When you call setAuth inside the useEffect, it triggers a state change, which leads to a re-render of the component.
The re-render will again invoke the useEffect, creating a loop if the dependencies trigger a state change. 
      */




      return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
      )
};



// custom hook
const useAuth = () => useContext(AuthContext)
export {useAuth, AuthProvider}






























