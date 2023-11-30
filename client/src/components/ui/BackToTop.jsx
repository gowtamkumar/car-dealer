'use client'
import React, { useEffect, useState } from 'react'
import { FloatButton } from 'antd'
import { IoMdArrowUp } from "react-icons/io";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>{
      isVisible &&
      <FloatButton
        icon={<IoMdArrowUp />}
        className='hover:bg-red-400 hover:text-white font-bold text-black border'
        onClick={scrollToTop}
      />
    }</div>
  )
}

export default BackToTop