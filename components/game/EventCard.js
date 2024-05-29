import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent, eventSignUp, leaveEvent } from '../../utils/eventData';
import { useAuth } from '../../utils/context/authContext';

export default function EventCard({
  id,
  game,
  description,
  date,
  time,
  organizer,
  onUpdate,
  attendees,
}) {
  const router = useRouter();
  const { user } = useAuth();

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

  const handleLeave = () => {
    const payload = {
      userId: user.id,
    };
    leaveEvent(id, payload).then(() => {
      onUpdate();
    });
  };

  const isAttending = attendees.some((item) => item.id === user.id);

  const handleSignup = () => {
    const payload = { userId: user.id };
    eventSignUp(id, payload).then(() => {
      onUpdate();
    });
  };

  return (
    <Card className="text-center" style={{ margin: '20px 0px' }}>
      <Card.Header>{description}</Card.Header>
      <div>
        {isAttending
          ? <Button onClick={handleLeave} className="btn-danger">Leave</Button>
          : <Button onClick={handleSignup}>Signup</Button>}

      </div>
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
  attendees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  })).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
