import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteGame } from '../../utils/gamedata';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/games/update/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Would you like to delete this game?')) {
      deleteGame(id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card className="text-center" style={{ margin: '20px 0px' }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <div className="centered" style={{ margin: '12px', gap: '20px' }}>
        <Button onClick={handleUpdate} style={{ width: '100px' }}>Edit</Button>
        <Button className="btn-danger" onClick={handleDelete} style={{ width: '100px' }}>Delete</Button>
      </div>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
