import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/20/solid'
import AudioBar from './AudioBar'
import useAudioPlayer from "../hooks/useAudioPlayer"
import { motion } from 'framer-motion'
import BottomDrawer from './BottomDrawer'
import { songs } from '../data/songs'

const MusicPlayer = ({song, setSong}) => {
    
    let { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
    const [drawerOpen, setDrawerOpen] = useState(false)

    const goBack = () => {
        if(song) {
            let idx = songs.indexOf(song)
            if(song !== 0) {
                setSong(songs[song - 1])
            }
        }
        
    }

    const goForward = () => {
        if(song) {
            let idx = songs.indexOf(song)
            if(song !== songs.length - 1) {
                setSong(songs[song + 1])
            }
        }
        
    }


    return (
        <div className='h-full w-full'>
            {song ?
                <>
                    <audio id='audio' src={song.audio} />

                    <div className="h-full w-full hidden md:block">
                        <div className="flex h-full">
                            <div className="w-96 h-96 mx-auto">
                                
                                <motion.div
                                    initial={{y: -2, scale: 0.95, opacity: 0}}
                                    animate={{y: 0, scale: 1, opacity: 1}}
                                    transition={{duration: 0.4}} 
                                    className="w-96 h-96"
                                >
                                    <Image 
                                        src={song.image} 
                                        width={384} 
                                        height={384} 
                                        className='rounded-lg' 
                                    />
                                </motion.div>
                                
                                <div className='font-semibold flex flex-col gap-2 mt-2'>
                                    
                                    <div>
                                        <p className='text-lg'>{song.title}</p>
                                        <p className='font-normal text-sm text-gray-600'>{song.artist}</p>
                                    </div>

                                    <AudioBar 
                                        curTime={curTime} 
                                        duration={duration} 
                                        onTimeUpdate={(time) => setClickedTime(time)}
                                    />

                                    <div className='flex items-center justify-center gap-10'>
                                        <button onClick={goBack} className='p-4 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                            <BackwardIcon className='w-5 h-5' />
                                        </button>

                                        <button onClick={() => {}} className='p-4 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                            {playing ?
                                                <PauseIcon className='w-7 h-7' />
                                                :
                                                <PlayIcon className='w-7 h-7' />
                                            }
                                            
                                        </button>

                                        <button onClick={() => {}} className='p-4 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                            <ForwardIcon className='w-5 h-5' />
                                        </button>

                                        
                                    </div>

                                </div>
                                    
                            </div>

                        </div>
                    </div>
                    <div className='md:hidden grid place-items-center h-full'>
                        {!drawerOpen ?
                            <div onClick={() => setDrawerOpen(true)} className='flex items-center justify-between cursor-pointer mx-auto py-2 px-6 absolute bottom-0 bg-white border-t-gray-200 border-t z-10 max-w-sm w-full'>
                                <div className='flex space-x-2 items-center'>
                                    <div className='w-14 h-14 relative'>
                                        <div className="rounded-md absolute z-0 w-14 h-14">
                                            <Image 
                                                src={song.image} 
                                                width={56} 
                                                height={56}
                                                className='rounded-md' 
                                            />
                                        </div>
                                    </div>
                                    <p className='font-semibold text-sm'>{song.title}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <button onClick={() => setPlaying(!playing)} className='p-2 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                        {playing ?
                                            <PauseIcon className='w-5 h-5' />
                                            :
                                            <PlayIcon className='w-5 h-5' />
                                        }
                                        
                                    </button>

                                    <button className='p-2 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                        <ForwardIcon className='w-5 h-5' />
                                    </button>
                                </div>
                            </div>
                            :
                            <BottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                                <div className="grid place-items-center z-40">

                                    <div className="w-64 mx-auto">
                                        
                                        <motion.div
                                            initial={{y: -2, scale: 0.95, opacity: 0}}
                                            animate={{y: 0, scale: 1, opacity: 1}}
                                            transition={{duration: 0.4}} 
                                            className="w-64 h-64"
                                        >
                                            <Image 
                                                src={song.image} 
                                                width={256} 
                                                height={256} 
                                                className='rounded-lg' 
                                            />
                                        </motion.div>
                                        
                                        <div className='font-semibold flex flex-col gap-2 mt-2'>
                                            
                                            <div>
                                                <p className='text-lg'>{song.title}</p>
                                                <p className='font-normal text-sm text-gray-600'>{song.artist}</p>
                                            </div>

                                            <AudioBar 
                                                curTime={curTime} 
                                                duration={duration} 
                                                onTimeUpdate={(time) => setClickedTime(time)}
                                            />

                                            <div className='flex items-center justify-center gap-10'>
                                                <button className='p-4 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                                    <BackwardIcon className='w-5 h-5' />
                                                </button>

                                                <button onClick={() => setPlaying(!playing)} className='p-4 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                                    {playing ?
                                                        <PauseIcon className='w-7 h-7' />
                                                        :
                                                        <PlayIcon className='w-7 h-7' />
                                                    }
                                                    
                                                </button>

                                                <button className='p-4 rounded-full hover:bg-gray-200 transition duration-200 ease-in'>
                                                    <ForwardIcon className='w-5 h-5' />
                                                </button>

                                                
                                            </div>

                                        </div>
                                            
                                    </div>

                                </div>
                            </BottomDrawer>
                        }
                        

                        
                    </div>
                </>
                :
                <div>
                
                </div>
            }
            
        </div>
    )
}

export default MusicPlayer