import React, { useEffect, useState } from "react";
import Hero3 from "../../components/Hero3";
import UserServicesComponent from "../../components/UserServicesComponent";
import { Link, useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const User = () => {
  const { userInfo } = useAuth();
  const api = ApiSetup();
  const { companyname } = useParams();
  const { cart } = useCart();

  const [companyDetails, setCompanyDetails] = useState(null);
  const [companyProducts, setCompanyProducts] = useState([]);
  const [companyServices, setCompanyServices] = useState([]);

  useEffect(() => {
    getCompanyDetails();
  }, [companyname]);

  async function getCompanyDetails() {
    try {
      const companyName = companyname.split("_").join(" ");
      const body = {
        user_id: userInfo?.masked_id,
        action: "companydetails",
        companyname: companyName,
      };

      const res = await api.post("fetchaccountdetails", body);
      const res2 = await api.post("fetchproductsofcompany", body);
      const res3 = await api.post("fetchservicesofcompany", body);

      setCompanyDetails(res?.data);
      setCompanyProducts(res2?.data?.products);
      setCompanyServices(res3?.data?.services);
    } catch (error) {
      console.error(error);
    }
  }

  if (companyname) {
    localStorage.setItem("companyName", companyname);
    localStorage.setItem("accountDetails", JSON.stringify(companyDetails?.details[0]));
  }

  return (
    <div>
      <Hero3 button={true} />
      <UserServicesComponent
        companyDetails={companyDetails}
        companyServices={companyServices}
        companyProducts={companyProducts}
        companyName={companyname?.split("_").join(" ")}
      />
      <section className="fixed right-4 bottom-0  my-10 py-4 flex mx-auto  justify-end">
        <Link
          to="/user/cart"
          className="bg-radial-gradient py-6 px-6 text-white rounded-full lg:rou flex items-center text-[17px] font-semibold md:gap-3"
        >
          {" "}
          <span className="hidden md:block">View cart ({cart?.length ? cart?.length : 0})</span>
          <IoCartOutline size={28} />
        </Link>
      </section>
    </div>
  );
};

export default User;
