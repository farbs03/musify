import Image from 'next/image'
import React, { useState } from 'react'
import { artists } from "../data/artists"
import {motion} from "framer-motion"

const Artists = () => {
    return (
        <div className='flex items-center md:items-start flex-col md:flex-row gap-10'>
            {artists.map((artist) => (
                <motion.div
                    key={artist.name}
                    initial={{opacity: 0, scale: 0.95, y: 2}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    transition={{duration: 0.4}}
                    className='w-32 cursor-pointer'
                >
                    <Image 
                        src={artist.image}
                        className='rounded-full'
                        width={128}
                        height={128}
                    />
                    <p className="mt-2 font-semibold text-center">{artist.name}</p>
                </motion.div>
            ))}
        </div>
    )
}

export default Artists