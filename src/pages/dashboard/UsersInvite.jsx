import React, { useState }  from 'react'
import { FaPlus } from "react-icons/fa6";
import { useModal } from "../../context/ModalContext";
import TableComponent from '../../components/TableComponent';

const UsersInvite = () => {
    const { setIsTransactionsOpen } = useModal()
  return (
    <div className="flex flex-col w-full overflow-auto hide-scrollbar w-[100%]">
            <header className="px-6 py-4 border-b md:border-t w-full">
                <span className="font-bold">Users</span>
            </header>
            <div className="flex flex-col ml-4 mt-12 pr-4">
                <h1 className="font-bold mb-4">Invitations</h1>
                <TableComponent page="page2"/>

            </div>
            <section className="my-5 py-4 flex mx-auto w-[90%] justify-end mb-[70px]">
                <button onClick={() => setIsTransactionsOpen(true)} className="bg-red-800 py-4 px-4 text-white rounded-[50px] flex md:gap-3"><FaPlus /> <span className="hidden md:block">Add new user</span></button>
            </section>
        </div>
  )
}

export default UsersInvite
