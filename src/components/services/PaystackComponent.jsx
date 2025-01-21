import React from 'react';
import { PaystackButton } from 'react-paystack';
import ApiSetup from '../../utils/ApiSetup';
import { useAuth } from '../../context/AuthContext';

const PaystackComponent = ({ amount, buttonText, payload, user }) => {
    const api = ApiSetup()
    const {userInfo} = useAuth()

    const paystack_key = import.meta.env.VITE_PAYSTACK_PUB_KEY
  const componentProps = {
    email: user?.email,
    amount: amount * 100, // Amount in kobo (100 kobo = 1 Naira)
    publicKey: paystack_key,
    text: buttonText, // Text displayed on the button
    onSuccess: async ({reference, status}) =>{
        const sub_body = {
            ref: reference,
            user_id: userInfo?.masked_id,
            package: payload?.package,
            plan: payload?.plan,
            count: payload?.count
        }
        if(status == 'success'){
            const res = await api.post('registersubscription', sub_body)
            console.log({res})

        }

    },
    onClose: () => alert("Transaction Closed"),
  };

  return (
    <div>
      <PaystackButton {...componentProps} className='bg-red w-full text-white py-2 rounded-lg' />
    </div>
  );
};

export default PaystackComponent;