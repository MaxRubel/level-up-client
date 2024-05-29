import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
}) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/games/update/${id}`);
  };

  return (
    <Card className="text-center" style={{ margin: '20px 0px' }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <div style={{ margin: '12px' }}><Button onClick={handleUpdate} style={{ width: '100px' }}>Edit</Button></div>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
};

export default GameCard;
