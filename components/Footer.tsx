import React from 'react'
import Link from "next/link";

function Footer() {

  return (
    <div className="bottom-0 w-full text-center mt-5">
      <Link href="https://www.linkedin.com/in/ardakeyisoglu/" target="_blank">
        <h3 className="flex justify-center align-center text-[15px] mb-[15px] text-[#6d5dfc] [filter:drop-shadow(2px_4px_6px_lightgray)]">Developed by Arda Keyişoğlu</h3>
      </Link>
    </div>
  )
}

export default Footer;