import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  dataset,
  dataset2,
  projectedData,
  actualData
} from "../../components/charts/dataset";
import LogoutModal from "../../components/modals/LogoutModal";
import SuccessSalesModal from "../../components/modals/SuccessSalesModal";
import EditSalesTargetModal from "../../components/modals/EditSalesTargetModal";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import SettingInput from "../../components/SettingInput";
import ApiSetup, { baseUrl } from "../../utils/ApiSetup";
import { toast } from "react-hot-toast";
import { FiSave } from "react-icons/fi";

const initialSetting = {
  full_name: '',
  phone: '',
  business_name: '',
  account_status: '',
  subscription_status: '',
  language: '',
  currency: '',
  theme: '',
  password: '',
  c_password: '',
  two_factor: '',
  business_slogan: '',
  country: '',
  state: '',
  office_address: '',
  customer_phone: '',
  service1: '',
  service2: '',
  service3: '',
  brand_color: '',
  sec_brand_color: '',
  website: '',
  instagram: '',
  facebook: '',
}

const Settings = () => {
  const api = ApiSetup()
  const {isLogoutOpen, setIsLogoutOpen} = useModal()
  const {userInfo, resetUserData} = useAuth()
  const [settingData, setSettingData] = useState(initialSetting)
  const [imageSrc, setImageSrc] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [editProfileImage, setEditProfileImage] = useState(false);

  
  useEffect(()=>{
    const getUserProfile = async()=>{
      try {
        const user_data = {
          id: userInfo?.masked_id
        }
        setSettingData({
          full_name: userInfo?.fullname,
          instagram: userInfo?.instagram,
          facebook: userInfo?.facebook,
          business_name: userInfo?.companyname,
          account_status: userInfo?.account_state,
          phone: userInfo?.phone,
          language: '',
          currency: '',
          theme: '',
          password: '',
          two_factor: '',
          business_slogan: userInfo?.slogan,
          country: userInfo?.country,
          state: userInfo?.location,
          office_address: userInfo?.address,
          customer_phone: userInfo?.whatsapp,
          service1: userInfo?.offer1,
          service2: userInfo?.offer2,
          service3: userInfo?.offer3,
          brand_color: userInfo?.maincolor,
          sec_brand_color: userInfo?.subcolor,
          website: userInfo?.website,
        })
        // console.log(res,'the user profile')
      } catch (error) {
        console.log(error)
      }
    }
    getUserProfile()
  },[userInfo])

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setProfileFile(file)
    if (file) {
      const reader = new FileReader();

      // Once the file is read, update the image source
      reader.onloadend = () => {
        setImageSrc(reader.result); // Set the file as image src
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };


  const handleSubmit = async()=>{
    try {
      const body = {...settingData, u_id: userInfo?.masked_id, fullName: settingData?.full_name}

      const res = await api.post("updateuserprofile", body)
      if(res?.data?.profile){
        resetUserData(res?.data?.profile)
        window.location.reload()
      }
      if(res?.data?.message == "Successfully Updated"){
        toast.success(res?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  const handleLogoutModalOpen = () => {
    setIsLogoutOpen(true);
  };

  const handleModalClose = () => {
    setIsLogoutOpen(false);

  };

  const changePassword = async ()=>{
    try {
      if(!settingData.password){
        return toast.error('Please, enter your old password')
      }
      if(!settingData.c_password){
        return toast.error('Please, enter your new password')
      }
      const user_data = {
        user_id: userInfo?.masked_id,
        oldpassword: settingData?.password,
        password: settingData?.c_password
      }

      const res = await api.post('userchangepassword', user_data)
      toast.success(res?.data?.message)
      console.log(res?.data, 'the password change')
    } catch (error) {
      console.log(error)
    }
  }


  const changeProfilePicture = async()=>{
    try {
      const formData = new FormData()

      formData.append('oldurl', userInfo?.logo)
      formData.append('rembg', 'no')
      formData.append('id', userInfo?.masked_id)
      formData.append('type', 'logo')
      formData.append('file', profileFile)

      const res = await api.postFormData('uploaduserimages', formData)
      if(res?.data?.profile){
        resetUserData(res?.data?.profile)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(userInfo)

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-bold">Settings</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <div className="flex flex-col gap-4 mt-4 md:mt-0 rounded-md p-4 border text-xs md:text-sm">
          <article className="flex flex-col gap-4">
            <header className="font-bold">
              Account information
            </header>
            <div className="flex flex-col gap-4 flex-wrap">
              <div className="flex md:justify-between md:flex-row flex-col gap-4 md:items-center border border-gray-400 px-6 py-4 rounded relative">
                <div className="grid md:grid-cols-4 gap-4 items-center w-full">
                  <div>Logo</div>
                  <div>
                    <input disabled={!editProfileImage} type="file" id="profile-image" onChange={handleFileChange} className="hidden" />
                    <label className="" htmlFor="profile-image">
                    {
                      !editProfileImage ?
                      <img
                        className={`object-cover rounded-full cursor-pointer w-[100px] md:w-[150px] h-[100px] md:h-[150px] ${editProfileImage && 'animate-pulse duration-100 border-8 border-gray-400'}`}
                        src={`${baseUrl}${userInfo?.logo}`}
                      /> :
                      <img
                        className={`object-cover rounded-full cursor-pointer w-[100px] md:w-[150px] h-[100px] md:h-[150px] ${editProfileImage && 'animate-pulse duration-100 border-8 border-gray-400'}`}
                        src={`${imageSrc ? imageSrc : '/images/defaultPicture.svg'}`}
                      /> 
                    }
                    </label>
                  </div>
                </div>
                {
                  !editProfileImage ?
                <div onClick={()=> setEditProfileImage(!editProfileImage)} className="cursor-pointer flex gap-2 items-center self-start md:self-auto md:w-[100px]">
                  <BsPencil
                    size={25}
                    className="cursor-pointer"
                  />
                  <span>Edit</span>
                </div>
                :
                <div onClick={()=> setEditProfileImage(!editProfileImage)} className="cursor-pointer flex gap-2 items-center self-start md:self-auto md:w-[100px]">
                  <FiSave
                    size={25}
                    className="cursor-pointer"
                  />
                  <span>Change</span>
                </div>
                }
                {profileFile && <button onClick={changeProfilePicture} className="py-2 absolute top-1 md:top-4 border-1 border px-2 rounded-lg md:right-5 right-0">Upload image</button>}
              </div>
              <SettingInput nonEditable type="input" setSettingData={setSettingData} value={settingData.full_name} name='full_name' title="Full name" />
              <SettingInput nonEditable type="input" setSettingData={setSettingData} value={settingData.phone} name='phone' title="Phone" />
              <SettingInput nonEditable type="input" setSettingData={setSettingData} value={settingData.business_name} name='business_name' title="Business name" />
              <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
                <div className="grid md:grid-cols-4 gap-4 items-center w-full">
                  <div>Account Status</div>
                  {/* <div className="">
                    <span className="text-green-600">Verified</span>
                  </div> */}
                </div>
                  
                <div className="">
                    <span className={`${userInfo.account_state == 'active' ? 'text-green-60' : 'text-red-100'}`}>{userInfo?.account_state == 'active' ? 'Verified' : 'Unverified'}</span>
                  </div>
              </div>
              <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
                <div className="grid md:grid-cols-4 gap-4 items-center w-full">
                  <div>Subscription Status</div>
                  <div className="">
                    {userInfo?.pay_state == 'Yes' && userInfo?.userIsSubscribed == true ? <span className="text-blue-400">Subscribed</span> : <span className="text-red-400">UnSubscribed</span>}
                  </div>
                </div>
                  
                <div className="flex gap-2 items-center self-start md:self-auto md:w-[100px]">
                  {!userInfo?.userIsSubscribed ? <Link to='/getting-started/subscription'><span className="text-red ml-auto cursor-pointer">Subscribe</span></Link> : <span className="text-blue-800 ml-auto cursor-pointer">Upgrade</span>}
                </div>
              </div>
            </div>
            <div>
            </div>
          </article>
          <article className="flex flex-col gap-4">
            <header className="font-bold">
              Preferences
            </header>
            <div className="flex flex-col gap-4 flex-wrap">
              <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
                <div className="flex flex-col md:flex-row gap-1 md:gap-4 w-full">
                  <div className="flex-1 md:flex-[1]">Display language</div>
                  <div className="text-gray-600 h-full flex-1 md:flex-[4] w-full">
                    <select disabled name="" className="border h-full w-full md:w-2/3 py-2 px-3 rounded-lg" id="">
                      <option value="">English(US)</option>
                      <option value="">English(USA)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
                  <div className="flex flex-col md:flex-row gap-1 md:gap-4 w-full">
                  <div className="flex-1 md:flex-[1]">Currency</div>
                  <div className="text-gray-600 h-full flex-1 md:flex-[4] w-full">
                    <select disabled name="" className="border h-full w-full md:w-2/3 py-2 px-3 rounded-lg" id="">
                      <option value="">NGN</option>
                      <option value="">USD</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
              <div className="flex flex-col md:flex-row gap-1 md:gap-4 w-full">
                  <div className="flex-1 md:flex-[1]">Theme</div>
                  <div className="text-gray-600 h-full flex-1 md:flex-[4] w-full">
                    <select name="" className="border h-full w-full md:w-2/3 py-2 px-3 rounded-lg" id="">
                      <option value="">Light mode</option>
                      <option value="">Dark mode</option>
                    </select>
                  </div>
                </div>
                  
                <div className="flex gap-2 items-center self-start md:self-auto md:w-[100px]">
                </div>
              </div>
            </div>
            <div>
            </div>
          </article>
          <article className="flex flex-col gap-4">
            <header className="font-bold">
              Security
            </header>
            <div className="flex flex-col gap-4 flex-wrap">
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.password} placeholder="***********" name='password' title="Old Password" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.c_password} placeholder="***********" name='c_password' title="New password" />
              <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
               <button onClick={changePassword} className="bg-green-700 text-white rounded-lg w-full py-3 md:w-2/3 mx-auto">Update Password</button>
              </div>
              <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
                <div className="grid md:grid-cols-4 gap-4 items-center w-full">
                  <div>Two Factor Authentication</div>
                  <div className="text-gray-600">
                    Coming soon
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </article>
          <article className="flex flex-col gap-4">
            <header className="font-bold">
              About your business
            </header>
            <div className="flex flex-col gap-4 flex-wrap">
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.business_slogan} name='business_slogan' title="Business Slogan" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.country} name='country' title="Country" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.state} name='state' title="Province/State" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.office_address} name='office_address' title="Office Address" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.customer_phone} name='customer_phone' title="Customer phone" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.service1} name='service1' title="Provided service 1" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.service2} name='service2' title="Provided service 2" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.service3} name='service3' title="Provided service 3" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.brand_color} name='brand_color' title="Brand Color" nonEditable />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.sec_brand_color} name='sec_brand_color' title="Secondary Brand Color" nonEditable />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.website} name='website' title="Website" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.instagram} name='instagram' title="Instagram" />
              <SettingInput type="input" setSettingData={setSettingData} value={settingData.facebook} name='facebook' title="Facebook" />
            </div>
            <div>
            </div>
            <button onClick={handleSubmit} className="bg-green-700 w-full md:w-[80%] m-auto text-white py-3 rounded-lg">Update Profile</button>
          </article>
          
        </div>
        <article className="w-full md:w-[70%] self-center">
          <div className="flex gap-4 p-4 text-red-900 items-center justify-center 
            border border-red-900 w-full rounded cursor-pointer"
            onClick={handleLogoutModalOpen}
          >
            Log out
            <BsPencil
              
              size={15}
              // className="cursor-pointer"
            />
          </div>
        </article>
        <article className="relative">
           <LogoutModal onClose={handleModalClose} />
        </article>
      </section>
      
    </div>
  );
};

export default Settings;
