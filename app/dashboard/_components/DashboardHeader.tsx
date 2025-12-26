"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import React, { useContext } from 'react'

function DashboardHeader() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext)
  const router = useRouter()

  return (
    <div className='p-7 bg-primary text-white flex justify-between items-center'>
      <h2 className='font-bold text-2xl lg:text-3xl'>My stories</h2>
      <div className='flex gap-3 text-xl justify-center items-center'>
        <Image src={'/coin.png'} alt={'coin'} height={50} width={60} />
        <span>{userDetails?.credits} credits left</span>
        <button onClick={() => router.push('/add-coins')} className='px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity'>Get more</button>
      </div>
    </div>
  )
}

export default DashboardHeader