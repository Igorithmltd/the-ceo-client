import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/Notfound";
import Homepage from "./pages/Homepage";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./pages/auth/LoginWithEmail";
import Disclaimer from "./pages/Disclaimer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DashboardLayout from "./layout/DashboardLayout";
import UserLayout from "./layout/UserLayout";
import DashboardHomepage from "./pages/dashboard/DashboardHomepage";
import Register from "./pages/auth/Register";
import AuthLayout from "./layout/AuthLayout";
import BusinessLayout from "./layout/BusinessLayout";
import Signin from "./pages/auth/LoginWithPhone";
import LoginWithEmail from "./pages/auth/LoginWithEmail";
import LoginWithPhone from "./pages/auth/LoginWithPhone";
import Sales from "./pages/dashboard/Sales";
import Transactions from "./pages/dashboard/Transactions";
import UserAdmin from "./pages/dashboard/UserAdmin";
import UsersInvite from "./pages/dashboard/UsersInvite";
import Expenses from "./pages/dashboard/Expenses";
import Wallet from "./pages/dashboard/Wallet";
import Designs from "./pages/dashboard/Designs";
import MyProducts from "./pages/dashboard/MyProducts";
import MyServices from "./pages/dashboard/MyServices";
import MyWebsite from "./pages/dashboard/MyWebsite";
import MyCustomers from "./pages/dashboard/MyCustomers";
import HelpAndFAQs from "./pages/dashboard/HelpAndFAQs";
import Settings from "./pages/dashboard/Settings";
import ResetPassword from "./pages/auth/ResetPassword";
import ConfirmResetPassword from "./pages/auth/ConfirmResetPassword";
import VerifyAccount from "./pages/auth/VerifyAccount";
import SuccessVerifyAccount from "./pages/auth/SuccessVerifyAccount";
import PageLoader from "./components/loaders/PageLoader";
import GettingStarted from "./pages/business/GettingStarted";
import SelectSubscribtion from "./pages/business/SelectSubscribtion";
import SelectPaymentProvider from "./pages/business/SelectPaymentProvider";
import ChosePaymentMethod from "./pages/business/ChosePaymentMethod";
import CardDetails from "./pages/business/CardDetails";
import CardPin from "./pages/business/CardPin";
import SuccessPayment from "./pages/business/SuccessPayment";
import { useEffect } from "react";
import { useModal } from "./context/ModalContext";
import AddProductModal from "./components/modals/AddProductModal";
import User from "./pages/client/User";
import Cart from "./pages/client/Cart";
import ProductDetail from "./pages/client/ProductDetail";
import ServiceDetail from "./pages/client/ServiceDetail";
import DesignTemplate from "./pages/dashboard/DesignTemplate";
import OngoingService from "./pages/client/OngoingSevice";
import Plugs from "./pages/dashboard/Plugs";


function App() {
  const { appLoading, setAppLoading } = useModal();

  useEffect(() => {
    setAppLoading(false);
  }, []);

  return (
    <div className="min-h-screen ">
      <Toaster />
      {/* Include all modals here */}
      <PageLoader />
      <AddProductModal />
      {/* end all modals here */}
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* All static pages (homepage, about, contact and disclaimer routes here) */}
          <Route index element={<Homepage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="S/:companyname" element={<User />} />
          <Route path="about" element={<About />} />
          <Route path="disclaimer" element={<Disclaimer />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin-email" element={<LoginWithEmail />} />
          <Route path="signin-phone" element={<LoginWithPhone />} />
          <Route path="signup" element={<Register />} />
          <Route path="verify-account" element={<VerifyAccount />} />
          <Route path="success-verify-account" element={<SuccessVerifyAccount />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="confirm-reset-password" element={<ConfirmResetPassword />} />
        </Route>
        <Route path="/getting-started" element={<BusinessLayout />}>
          <Route index element={<GettingStarted />} />
          <Route path="subscription" element={<SelectSubscribtion />} />
          <Route path="payment/provider" element={<SelectPaymentProvider />} />
          <Route path="payment/method" element={<ChosePaymentMethod />} />
          <Route path="payment/card-details" element={<CardDetails />} />
          <Route path="payment/card-pin" element={<CardPin />} />
          <Route path="payment/success" element={<SuccessPayment />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomepage />} />
          <Route path="sales" element={<Sales />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="transaction" element={<Transactions />} />
          <Route path="user-admin" element={<UserAdmin />} />
          <Route path="users-invite" element={<UsersInvite />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="designs" element={<Designs />} />
          <Route path="designs/template" element={<DesignTemplate />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="my-services" element={<MyServices />} />
          <Route path="my-website" element={<MyWebsite />} />
          <Route path="my-customers" element={<MyCustomers />} />
          <Route path="Plugs" element={<Plugs />} />
          <Route path="Plugs/:searchvalues" element={<Plugs />} />
          <Route path="help-and-faqs" element={<HelpAndFAQs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<User />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="service/:id" element={<ServiceDetail />} />
          <Route path="ongoing" element={<OngoingService />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
