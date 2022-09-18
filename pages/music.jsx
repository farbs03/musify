import { useEffect, useState } from "react";
import SongList from "../components/SongList";
import MusicPlayer from "../components/MusicPlayer";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { songs } from "../data/songs";
import { HomeIcon, ListBulletIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import Playlists from "./playlists";
import Artists from "./artists";

export default function Music() {

  const [selectedSong, setSelectedSong] = useState({})

  let links = [
    {
      title: "Library",
      icon: <HomeIcon className="w-5 h-5" />,
      href: "/music"
    },
    {
      title: "Playlists",
      icon: <ListBulletIcon className="w-5 h-5" />,
      href: "/playlists"
    },
    {
      title: "Artists",
      icon: <UserGroupIcon className="w-5 h-5" />,
      href: "/artists"
    },
  ]

  const [tab, setTab] = useState('Library')

  return (
    <div className='grid place-items-center h-screen'>

      <div className='bg-white md:rounded-2xl max-w-6xl w-full md:aspect-[3/2] h-full md:h-fit select-none md:drop-shadow-2xl p-6'>       

        <div className='flex items-center font-semibold gap-10 mb-10 w-full justify-center'>
          {links.map((link) => (
            <button
              key={link.title}
              className={`hover:text-blue-500 transition duration-200 ease-in flex items-center gap-2 ${link.title === tab ? "text-blue-500" : ""}`} 
              onClick={() => setTab(link.title)}
            >
              {link.icon}
              {link.title}
            </button>
          ))}
        </div>

        <div>
          {tab === "Library" &&
            <div className="flex md:flex-row flex-col md:gap-2 justify-center">
              <SongList selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
              <MusicPlayer song={selectedSong} setSong={setSelectedSong} />
            </div>
          }

          {tab === 'Playlists' &&
            <Playlists />
          }

          {tab === 'Artists' &&
            <Artists />
          }
          
        </div>
      </div>
    </div>
  )
}
