"use client";
import React, { JSX, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface ButtonVariantSlideProps {
  children: ReactNode;
  onClick?: () => void;
}

const slideVariants: Variants = {
  initial: { y: '100%' },
  hover: { y: '0%' },
};

export default function ButtonVariantSlide({ children, onClick }: ButtonVariantSlideProps): JSX.Element {
  return (
    <div className="group relative flex justify-center md:w-fit overflow-hidden border border-[#262532ff] tracking-widest text-base font-poppins cursor-pointer">
      {/* Slide background (appears on hover) */}
      <div className="bg-slide absolute inset-0 w-full h-full bg-[#262532ff] transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-10" />
      
      {/* Base background */}
      <div className="absolute inset-0 w-full h-full bg-gray-100 z-0" />
      
      {/* Button content */}
      <div className="relative flex w-fit items-center gap-2 md:gap-4 z-20 px-3 py-2 text-gray-500 text-xs md:text-base whitespace-nowrap transition-colors duration-300 group-hover:text-white">
        {children}
      </div>
    </div>
  );
};