import { createContext, useContext, useEffect, useState } from "react";
import ApiSetup from "../utils/ApiSetup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { decryptData, maskedId, setToLocalStorage } from "../utils/encryption";
import { encryptData } from "../utils/encryption";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [phoneNo, setPhoneNo] = useState("");

  const api = ApiSetup();
  const loggedIn = localStorage.getItem("moi-moi");

  const signup = async (body) => {
    setIsLoading(true);
    const res = await api.post("/users/instant-register", body);

    if (res.success == true) {
      setIsLoading(false);
      setIsError(false);
      return res;
    } else {
      setIsLoading(false);
      setIsError(
        "Something went wrong processing your request. Please try again later!"
      );
      return res;
    }
  };
  const verifyAcc = async (code) => {
    setIsLoading(true);
    const res = await api.post("/users/verify-account", code);

    if (res.success == true) {
      setIsLoading(false);
      setIsError(false);
      return res;
    } else {
      setIsLoading(false);
      setIsError(
        "Something went wrong processing your request. Please try again later!"
      );
      return res;
    }
  };
  const uploadUserDetails = async () => {
    const body = {
      first_name: fname,
      last_name: lname,
      email: email,
      password,
      gender,
      phone_number: phoneNo,
    };
    setIsLoading(true);
    console.log(body);
    const res = await api.post("/users/register", body);

    if (res.success == true) {
      setIsLoading(false);
      setIsError(false);
      return res;
    } else {
      setIsLoading(false);
      setIsError(
        "Something went wrong processing your request. Please try again later!"
      );
      return res;
    }
  };

  function resetUserData(data) {
    const masked_id = maskedId(data?.u_id);
    const e_user = encryptData({ ...data, masked_id });
    setToLocalStorage("moi-moi", e_user);
  }

  const fetchUser = async () => {
    try {
      if (localStorage.getItem("moi-moi")) {
        const e_user_data = localStorage.getItem("moi-moi");
        let d_user = decryptData(e_user_data);
        const masked_id = maskedId(d_user?.u_id);
        const res = await api.post('@user', {user_id: masked_id})
        d_user = { masked_id, ...d_user };
        setUserInfo({...d_user, userIsSubscribed: res?.data?.message == "Subscription" ? false : true})
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ fetchUser, userInfo, resetUserData, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
