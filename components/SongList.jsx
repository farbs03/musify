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

    const [songData, setSongData] = useState({
        title: "",
        artist: "",
        year: "",
        album: "",
        image: null,
        audio: null,
    })

    const submitSong = () => {
        setDisplayedSongs([...displayedSongs, songData])
        setSongData({
            title: "",
            artist: "",
            year: "",
            album: "",
            image: null,
            audio: null,
        })
        setOpen(false)
    }

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

    const handleAudioChange = (e) => {
        if (e.target.files[0]) {
          setSongData({...songData, audio: URL.createObjectURL(e.target.files[0])});
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
          setSongData({...songData, image: URL.createObjectURL(e.target.files[0])});
          console.log(e.target.files[0])
        }
    };

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
                
                <label htmlFor='audio-upload' className='bg-blue-500 rounded-md text-white font-semibold px-4 py-2'>Upload mp3</label>
                
                <input 
                    className='hidden'
                    id='audio-upload' 
                    type='file'
                    onChange={handleAudioChange} 
                />
                
                <p className="mt-2 mb-1 font-semibold">Upload Photo</p>

                <input 
                    className='hidden'
                    id='image-upload' 
                    type='file'
                    accept="image/*"
                    onChange={handleImageChange} 
                />

                <label htmlFor='image-upload' className="mb-2 cursor-pointer aspect-square w-80 border-2 border-dashed border-gray-200 rounded-md grid place-items-center">
                    <PhotoIcon className='w-12 h-12 text-gray-500' />
                </label>

                <label className='text-sm font-semibold my-2'>
                    Title
                    <input 
                        type='text'
                        value={songData.title}
                        onChange={(e) => setSongData({...songData, title: e.target.value})}
                        className="bg-gray-100 border border-white text-sm rounded-md focus:bg-white focus:ring-blue-500 focus:border-blue-500 p-2.5 transition duration-200 ease-in w-full block"
                    />
                </label>

                <label className='text-sm font-semibold my-2'>
                    Artist
                    <input 
                        type='text'
                        value={songData.artist}
                        onChange={(e) => setSongData({...songData, artist: e.target.value})}
                        className="bg-gray-100 border border-white text-sm rounded-md focus:bg-white focus:ring-blue-500 focus:border-blue-500 p-2.5 transition duration-200 ease-in w-full block"
                    />
                </label>

                <label className='text-sm font-semibold my-2'>
                    Year
                    <input 
                        type='text'
                        value={songData.year}
                        onChange={(e) => setSongData({...songData, year: e.target.value})}
                        className="bg-gray-100 border border-white text-sm rounded-md focus:bg-white focus:ring-blue-500 focus:border-blue-500 p-2.5 transition duration-200 ease-in w-full block"
                    />
                </label>

                <label className='text-sm font-semibold my-2'>
                    Album
                    <input 
                        type='text'
                        value={songData.album}
                        onChange={(e) => setSongData({...songData, album: e.target.value})}
                        className="bg-gray-100 border border-white text-sm rounded-md focus:bg-white focus:ring-blue-500 focus:border-blue-500 p-2.5 transition duration-200 ease-in w-full block"
                    />
                </label>

                <button onClick={submitSong} className='bg-blue-500 rounded-md text-white font-semibold px-4 py-2 mt-4 block ml-auto'>Save</button>
            </Modal>

        </div>
    )
}

export default SongList