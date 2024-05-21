import React, { useEffect, useState } from 'react';
import { getEvents } from '../../utils/eventData';
import EventCard from '../../components/game/EventCard';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <article className="games">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="game">
          <EventCard description={event.description} date={event.date} time={event.time} organizer={event.organizer} game={event.game} />
        </section>
      ))}
    </article>
  );
}

export default Home;
