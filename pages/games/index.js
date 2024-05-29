import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/gamedata';

function Home() {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, [update]);

  const handleUpdate = () => {
    setUpdate((preVal) => preVal + 1);
  };

  return (

    <article className="games">
      <header className="centered topped">
        <Button
          onClick={() => {
            router.push('/games/new');
          }}
        >
          Register New Game
        </Button>
      </header>
      <h1>Games</h1>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard
            id={game.id}
            title={game.title}
            maker={game.maker}
            numberOfPlayers={game.number_of_players}
            skillLevel={game.skill_level}
            onUpdate={handleUpdate}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
