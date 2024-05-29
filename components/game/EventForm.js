import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getGames } from '../../utils/gamedata';
import { createEvent, getSingleEvent, updateEvent } from '../../utils/eventData';

export default function EventForm({ update, id }) {
  const { user } = useAuth();
  const router = useRouter();

  const initState = {
    description: '',
    date: '',
    time: '',
    gameId: '',
    gamerId: user.id,
  };

  const [formInput, setFormInput] = useState(initState);
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames);
    if (update) {
      getSingleEvent(id).then((data) => {
        setFormInput({
          description: data.description,
          date: data.date,
          time: data.time,
          gamerId: data.organizer.id,
          gameId: data.game.id,
          id,
        });
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((preVal) => ({ ...preVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!update) {
      createEvent(formInput).then(() => {
        router.push('/events');
      });
    } else {
      updateEvent(formInput).then(() => {
        router.push('/events');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">

        <Form.Label>Description</Form.Label>
        <Form.Control name="description" required value={formInput.description} onChange={handleChange} />

        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" required value={formInput.date} onChange={handleChange} />

        <Form.Label>Time</Form.Label>
        <Form.Control type="time" name="time" required value={formInput.time} onChange={handleChange} />
        <Form.Label>Game</Form.Label>
        <Form.Select
          name="gameId"
          required
          value={formInput.gameId}
          onChange={handleChange}
        >
          <option value="">Choose a game...</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

EventForm.propTypes = {
  update: PropTypes.bool,
  id: PropTypes.number,
};

EventForm.defaultProps = {
  update: undefined,
  id: undefined,
};
