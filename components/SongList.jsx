import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon, PhotoIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { songs } from '../data/songs'
import Song from './Song'
import { motion } from 'framer-motion'
import Modal from "./Modal"

const SongList = ({songList=songs, selectedSong, setSelectedSong}) => {

    const changeSong = (song) => {
        setSelectedSong(song)
    }

    const [query, setQuery] = useState('')
    const [displayedSongs, setDisplayedSongs] = useState(songList)

    useEffect(() => {
        let newSongs = []
        for(let i = 0; i < songs.length; i++) {
            let title = songs[i].title.toLowerCase()
            let artist = songs[i].artist.toLowerCase()
            if(title.includes(query.toLowerCase()) || artist.includes(query.toLowerCase())) {
                newSongs.push(songs[i])
            }
        }
        setDisplayedSongs(newSongs)
    }, [query])
    
    const [open, setOpen] = useState(false)

    return (
        <div className='max-w-sm w-full mx-auto md:mx-0'>

            <div className='relative flex items-center mb-6'>
                <MagnifyingGlassIcon className='w-6 h-6 absolute left-0 z-10' />
                <input 
                    type="text" 
                    placeholder='Search'
                    onChange={(e) => setQuery(e.target.value)}
                    className='placeholder:text-gray-500 pl-8 pr-2 absolute z-0 focus:outline-0 text-sm'
                />
            </div>

            <button onClick={() => setOpen(true)} className="rounded-lg p-4 w-full text-blue-500 flex items-center bg-blue-100 font-semibold gap-2 mb-4 text-sm">
                <PlusCircleIcon className='w-5 h-5' />
                Add Song
            </button>

            <div className='flex flex-col space-y-2 w-full'>  
                {displayedSongs.map((song) => (
                    <motion.div 
                        key={song.title} 
                        className='w-full text-left cursor-pointer' 
                        onClick={() => changeSong(song)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.4}}
                    >
                        <Song song={song} playing={song === selectedSong} />
                    </motion.div>
                ))}
            </div>

            <Modal open={open} setOpen={setOpen}>
                <p className="font-bold text-lg mb-2">Add Song</p>
                <button className='bg-blue-500 rounded-md text-white font-semibold px-4 py-2'>Upload mp3</button>
                <p className="mt-2 mb-1 font-semibold">Upload Photo</p>
                <div className="aspect-square w-80 border-2 border-dashed border-gray-200 rounded-md grid place-items-center">
                    <PhotoIcon className='w-12 h-12 text-gray-500' />
                </div>
                <button onClick={() => {}} className='bg-blue-500 rounded-md text-white font-semibold px-4 py-2 mt-4 block ml-auto'>Save</button>
            </Modal>

        </div>
    )
}

export default SongList