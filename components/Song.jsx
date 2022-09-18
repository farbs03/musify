import React, { useState } from 'react'
import Image from 'next/image'
import {EllipsisHorizontalIcon, HeartIcon, PlusIcon, TrashIcon} from "@heroicons/react/20/solid"
import { motion } from "framer-motion"
import { usePopper } from 'react-popper'
import { Popover, Transition } from '@headlessui/react'


const getRandomNum = () => {
    return Math.floor(Math.random() * (12 - 4) + 4)
}

const PlayAnimation = () => {

    return (
        <div className="grid grid-cols-4 w-fit gap-1 h-4 rotate-180">
            {[0, 1, 2, 3].map((num) => (
                <motion.div
                    key={num}
                    className='w-1 bg-white rounded-sm'
                    initial={{height: getRandomNum()}}
                    animate={{height: getRandomNum()}}
                    transition={{duration: 0.3, yoyo: Infinity}}
                />
            ))}
        </div>
    )
}

const Song = ({song, playing}) => {

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "bottom-start"
    })

    let songOptions = [
        {
            title: "Like",
            icon: <HeartIcon className='w-5 h-5' />,
        },
        {
            title: "Add to Playlist",
            icon: <PlusIcon className='w-5 h-5' />
        },
        {
            title: "Delete",
            icon: <TrashIcon className='w-5 h-5' />
        }

    ]

    return (
        <div className='flex items-center justify-between w-full select-none'>

            <div className='flex items-center space-x-2'>
                <div className='w-14 h-14 relative'>
                    <div className="rounded-md absolute z-0 w-14 h-14">
                        <Image 
                            src={song.image} 
                            width={56} 
                            height={56}
                            className='rounded-md' 
                        />
                    </div>
                    {playing &&
                        <>
                            <div className='rounded-md bg-black/30 grid place-items-center w-14 h-14 z-10 absolute'>
                                <PlayAnimation />
                            </div>
                            <div className="absolute w-14 h-14 z-10">&nbsp;</div>
                        </>
                    }
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-sm'>{song.title}</p>
                    <p className='text-xs text-gray-600'>{song.artist}</p>
                </div>
            </div>
            
            <Popover>

                <Popover.Button className='p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                    <EllipsisHorizontalIcon className='w-5 h-5' />
                </Popover.Button>

                <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Popover.Panel
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                        className='drop-shadow-xl rounded-lg bg-white mr-auto'
                    >
                        <div className="flex flex-col divide-y divide-gray-200 w-48">
                            {songOptions.map((option) => (
                                <div key={option.title} className='p-2 hover:bg-gray-100 transition duration-200 ease-in flex gap-4 items-center text-sm font-semibold'>
                                    {option.icon}
                                    <p>{option.title}</p>
                                </div>
                            ))}
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>

        </div>
    )
}

export default Song