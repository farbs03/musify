import React, { useState } from 'react'
import {motion} from "framer-motion"

const Navbar = () => {

    const navItems = [

    ]

    return (
        <div className='flex items-center justify-between p-2'>
            <a href='/' className="font-bold text-lg hover:text-fuchsia-400 transition duration-200 ease-in">Musica</a>
            <div className='flex items-center font-semibold gap-4'>

            </div>
        </div>
    )
}

export default Navbar