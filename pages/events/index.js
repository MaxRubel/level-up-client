import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getEvents } from '../../utils/eventData';
import EventCard from '../../components/game/EventCard';

function Home() {
  const [events, setEvents] = useState([]);
  const [update, setUpdate] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
    });
  }, [update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
  };

  const newEventForm = () => {
    router.push('/events/new');
  };

  return (
    <article className="games">
      <header className="centered topped">
        <Button onClick={newEventForm}>Create an Event</Button>
      </header>
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="game">
          <EventCard
            onUpdate={onUpdate}
            id={event.id}
            description={event.description}
            date={event.date}
            time={event.time}
            organizer={event.organizer}
            game={event.game}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
