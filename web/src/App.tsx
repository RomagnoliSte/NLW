import './styles/main.css';
import logoImg from './assets/logo.svg';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';
interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    ads: number;
  }
}

function App() { 

  const [games, setGames] = useState<Game[]>([])

  useEffect( () => {
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  }, [] )

  return (
  
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20"> 
      <img src={logoImg} alt="" />    

      <h1 className="text-6xl text-white font-black mt-20"> 
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent "> duo </span> está aqui. 
      </h1> 

      <div className="grid grid-cols-6 gap-6 mt-16"> 

        {games.map(game => {
          return(
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads}
            />
          )
        })}       
       
      </div>

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>  

    </div>   

  )
}

export default App
