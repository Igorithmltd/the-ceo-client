import React, {useEffect} from "react";
import Modal from "../modals/Modal";
import { useModal } from "../../context/ModalContext";

const PageLoader = () => {
    const {appLoading, setAppLoading} = useModal()

    // Custom CSS for the spinning animation
    const styles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    `;

  return (
    <div>
      <Modal persist closeModal={()=> setAppLoading(false)} isOpen={appLoading}>

    <div className="flex flex-col items-center justify-center min-h-screen">
      <div 
        className="w-32 h-32 border-8 border-red border-t-8 border-t-white rounded-full animate-spin"
        style={{ animation: 'spin 2s linear infinite' }} // Applying the spin animation
      ></div>

      {/* Inject custom styles directly into the component */}
      <style>{styles}</style>
    </div>
      </Modal>
    </div>
  );
};

export default PageLoader;
