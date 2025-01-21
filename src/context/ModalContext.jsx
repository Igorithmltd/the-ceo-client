/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
// import ApiSetup from "../utils/ApiSetup";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isSuccessSalesOpen, setIsSuccessSalesOpen] = useState(false);
  const [isSalesTargetOpen, setIsSalesTargetOpen] = useState(false);
  const [isExpensesOpen, setIsExpensesOpen] = useState(false);
  const [isSuccessExpensesOpen, setIsSuccessExpensesOpen] = useState(false);
  const [isEditExpensesOpen, setIsEditExpensesOpen] = useState(false);
  const [isExpensesTargetOpen, setIsExpensesTargetOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAutoAboutOpen, setIsAutoAboutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isAutoTermsOpen, setIsAutoTermsOpen] = useState(false);
  const [isAddUserAdminOpen, setIsAddUserAdminOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isDebtorOpen, setIsDebtorOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isOrderMethodOpen, setIsOrderMethodOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isAddSavingsOpen, setIsAddSavingsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isGetNewBankOpen, setIsGetNewBankOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isConfirmTransferOpen, setIsConfirmTransferOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        appLoading,
        setAppLoading,
        isProductOpen,
        setIsProductOpen,
        isServiceOpen,
        setIsServiceOpen,
        isAddMoneyOpen,
        setIsAddMoneyOpen,
        isTransactionsOpen,
        setIsTransactionsOpen,
        isSalesOpen,
        setIsSalesOpen,
        isSuccessSalesOpen,
        setIsSuccessSalesOpen,
        isSalesTargetOpen,
        setIsSalesTargetOpen,
        isExpensesOpen,
        setIsExpensesOpen,
        isSuccessExpensesOpen,
        setIsSuccessExpensesOpen,
        isEditExpensesOpen,
        setIsEditExpensesOpen,
        isExpensesTargetOpen,
        setIsExpensesTargetOpen,
        isAboutOpen,
        setIsAboutOpen,
        isAutoAboutOpen,
        setIsAutoAboutOpen,
        isTermsOpen,
        setIsTermsOpen,
        isAutoTermsOpen,
        setIsAutoTermsOpen,
        isLogoutOpen,
        setIsLogoutOpen,
        isAddUserAdminOpen,
        setIsAddUserAdminOpen,
        isPlaceOrderOpen,
        setIsPlaceOrderOpen,
        isCustomerOpen,
        setIsCustomerOpen,
        isDebtorOpen,
        setIsDebtorOpen,
        isProductDetailOpen,
        setIsProductDetailOpen,
        currentProductId,
        setCurrentProductId,
        isEditProductOpen,
        setIsEditProductOpen,
        isServiceDetailOpen,
        setIsServiceDetailOpen,
        isEditServiceOpen,
        setIsEditServiceOpen,
        currentServiceId,
        setCurrentServiceId,
        isAdOpen,
        setIsAdOpen,
        isOrderSummaryOpen,
        setIsOrderSummaryOpen,
        isOrderMethodOpen,
        setIsOrderMethodOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        isAddSavingsOpen,
        setIsAddSavingsOpen,
        isConfirmationOpen,
        setIsConfirmationOpen,
        isGetNewBankOpen,
        setIsGetNewBankOpen,
        isSuccessOpen,
        setIsSuccessOpen,
        isConfirmTransferOpen,
        setIsConfirmTransferOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
