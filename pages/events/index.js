import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getEvents } from '../../utils/eventData';
import EventCard from '../../components/game/EventCard';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const [update, setUpdate] = useState(0);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => {
      setEvents(data);
    });
  }, [update, user]);

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
            joined={event.joined}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
