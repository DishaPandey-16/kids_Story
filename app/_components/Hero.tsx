"use client"
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { LazyMotion, motion, domAnimation } from "motion/react"

function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="px-10 md:px-28 lg:px-44 mt-10 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
              transition={{ duration: 1 }}
              className="lg:text-7xl md:text-3xl text-xl text-primary font-extrabold">
              Create enchanting stories for children in just minutes.
            </motion.h2>
            <motion.p

              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
              transition={{ duration: 1 }}
              className="lg:text-2xl text-lg text-primary font-light">
              Spin joyful stories for young readers quickly, helping them dream
              big and have fun!
            </motion.p>
            <Link href="/create-story">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 1, delay: .5 } }}
                transition={{ duration: 1 }}>
                <button
                  className="mt-5 font-bold text-2xl p-8 hover:scale-110 transition-transform bg-primary text-white rounded-lg"
                >
                  Create story
                </button>
              </motion.div>
            </Link>
          </div>
          <motion.div

            initial={{ x: 50, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 1 }, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image src={"/hero.png"} alt="hero" width={800} height={400} />
          </motion.div>
        </div>
      </div>
    </LazyMotion>
  );
}

export default Hero