import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function EventCard({
  game, //
  description,
  date,
  time,
  organizer,
}) {
  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>By: {organizer.bio}</Card.Title>
        <Card.Text>Starting on {date}, at {time}</Card.Text>
        <Card.Text>We wil be playing: {game.title}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {game.skill_level}</Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    skill_level: PropTypes.number.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    bio: PropTypes.string.isRequired,
  }).isRequired,
};
