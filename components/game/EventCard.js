import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent } from '../../utils/eventData';

export default function EventCard({
  id,
  game,
  description,
  date,
  time,
  organizer,
  onUpdate,
}) {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/events/update/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card className="text-center" style={{ margin: '20px 0px' }}>
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>By: {organizer.bio}</Card.Title>
        <Card.Text>Starting on {date}, at {time}</Card.Text>
        <Card.Text>We wil be playing: {game.title}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {game.skill_level}</Card.Footer>
      <div className="centered" style={{ margin: '15px', gap: '10px' }}>
        <Button onClick={handleEdit}>
          Edit
        </Button>
        <Button className="btn-danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

EventCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    skill_level: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    bio: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
