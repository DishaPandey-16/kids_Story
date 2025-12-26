"use client";
import React, { useContext, useState } from "react";
import { db } from "@/config/db";
import { Transactions } from "@/config/schema";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { usePolling } from "@/functions/usePolling";
import { check } from "drizzle-orm/mysql-core";
import { a } from "framer-motion/client";

function AddCoins() {
  const [selectedPackage, setSelectedPackage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const notify = (message: string) => toast.success(message);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);


  const errorNotify = (message: string) => toast.error(message);

  const coinPackages = [
    {
      name: "Bronze Package",
      coins: 1,
      price: 15,
      advantages: ["Basic Access", "No Expiry"],
    },
    {
      name: "Silver Package",
      coins: 5,
      price: 70,
      advantages: ["Extended Access", "Bonus 1 coin"],
    },
    {
      name: "Gold Package",
      coins: 10,
      price: 130,
      advantages: ["Priority Access", "Bonus 2 coins"],
    },
    {
      name: "Platinum Package",
      coins: 20,
      price: 250,
      advantages: ["Premium Access", "Bonus 5 coins", "Free Support"],
    },
  ];

  const handlePhoneNumberChange = (value: string) => {
    if (value.length !== 9) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setPhoneNumber("254" + value);
    }
  };

  const HandleSubmit = async () => {
    try {
      const result = await fetch("/api/daraja-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          amount: coinPackages[selectedPackage].price,
        }),
      });
      console.log(phoneNumber, coinPackages[selectedPackage].price)
      const data = await result.json();
      if (data.success) {
        notify(data.ResponseDescription);

        const transactionResult = await AddTransaction(
          data.amount,
          data.phoneNumber,
          data.CheckoutRequestID,
          userDetails?.userEmail,
          coinPackages[selectedPackage].coins
        );
        console.log(transactionResult);
      } else {
        errorNotify("An error occurred. Try again later");
      }
    } catch (error) {
      errorNotify("An error occurred. Try again later");
    }
  };


  const AddTransaction = async (
    amount: number,
    phoneNumber: string,
    CheckoutRequestID: string,
    email: string,
    credits: number
  ) => {
    const res = db
      .insert(Transactions)
      .values({
        amount: amount,
        phoneNumber: phoneNumber,
        CheckoutRequestID: CheckoutRequestID,
        userEmail: email,
        credits: credits,
      })
      .returning({
        id: Transactions.id,
        amount: Transactions.amount,
        CheckoutRequestID: Transactions.CheckoutRequestID,
      });
    return res;
  };


  return (
    <div className="w-full min-h-screen overflow-hidden">
      <ToastContainer />

      {/* Modal for Payment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Lipa na M-Pesa</h2>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">+254</span>
              <input
                autoFocus
                type="text"
                inputMode="numeric"
                placeholder="Enter your phone number"
                maxLength={9}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FaPhoneAlt className="text-gray-400" />
            </div>

            {!isValid && phoneNumber && (
              <p className="text-red-600 text-sm mb-2">Phone number must be 9 digits</p>
            )}

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-bold text-lg">Amount: KES {coinPackages[selectedPackage].price}</p>
              <p className="text-gray-600">{coinPackages[selectedPackage].name}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!isValid}
                onClick={HandleSubmit}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-primary font-extrabold lg:text-4xl text-2xl text-center">
        PURCHASE MORE COINS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-4 px-4 md:px-20 lg:px-40">
        {coinPackages.map((coinPackage, index) => (
          <div
            onClick={() => setSelectedPackage(index)}
            key={index}
            className={`flex flex-col justify-between items-center p-5 border rounded-lg text-white cursor-pointer shadow-lg transition-all hover:scale-105 my-5
                        ${selectedPackage == index ? "bg-black" : "bg-primary"
              }`}
          >
            <div>
              <h3 className="text-xl font-bold">{coinPackage.name}</h3>
              <p className="text-lg">{coinPackage.coins} coins</p>
              <p className="text-lg">Price: KES {coinPackage.price}</p>
              <ul className="mt-3 text-sm list-disc pl-5">
                {coinPackage.advantages.map((advantage, i) => (
                  <li key={i}>{advantage}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-green-500 px-4 py-2 rounded text-white hover:bg-green-700"
            >
              Buy Subscription
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCoins;
