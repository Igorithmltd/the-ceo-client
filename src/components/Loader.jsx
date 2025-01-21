import { ThreeDots } from "react-loader-spinner";

const LoadingAnimation = ({ loadingMessage, loaderColor, loaderBg }) => {
  return (
    <div className={`flex absolute ${loaderBg ? loaderBg : 'bg-[#f187633f]'} z-10 top-0 left-0 w-full place-content-center items-center h-full`}>
      <div className="w-fit my-40 flex flex-col bg-[#f4f4f4dc] h-fit p-10 shadow-2xl rounded-xl">
        <p className="!text-center  mt-6 text-lg font-semibold text-primary">
          {loadingMessage}
          
        </p>
        <small className="text-center">Please wait!...</small>
        <div className="mx-auto flex-col w-fit flex ">
          <ThreeDots
            height="50"
            width="50"
            radius="5"
            color={loaderColor ? loaderColor : "#007a85"}
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
