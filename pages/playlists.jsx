import { motion } from 'framer-motion'
import React, { useState } from 'react'
import {playlists} from '../data/playlists'
import Image from 'next/image'
import SongList from '../components/SongList'
import MusicPlayer from '../components/MusicPlayer'

const Playlists = () => {

    const [selectedPlaylist, setSelectedPlaylist] = useState('')
    const [selectedSong, setSelectedSong] = useState({})

    const onPlaylistChange = (playlist) => {
        setSelectedSong(playlist.items[0])
        console.log(playlist)
    }

    return (
        <div className='flex items-center md:items-start gap-10 flex-col md:flex-row justify-center md:justify-start w-full'>
            {!selectedPlaylist ?
                <>
                    {playlists.map((playlist) => (
                        <motion.div
                            key={playlist.title}
                            initial={{opacity: 0, scale: 0.95, y: 2}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            transition={{duration: 0.4}}
                            className='w-32 cursor-pointer'
                            onClick={() => onPlaylistChange(playlist)}
                        >
                            <div className="w-32 h-32 bg-gray-100 rounded-lg">
                                <Image 
                                    src={playlist.image}
                                    className='rounded-lg'
                                    width={128}
                                    height={128}
                                />
                            </div>
                            <p className="mt-2 font-semibold">{playlist.title}</p>
                        </motion.div>
                    ))}
                </>
                :
                <div className="flex md:flex-row flex-col md:gap-2 justify-center">
                    <SongList songList={selectedPlaylist.items} selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
                    <MusicPlayer song={selectedSong} />
                </div>
            }
            
        </div>
    )
}

export default Playlists