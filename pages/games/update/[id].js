import { useRouter } from 'next/router';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';

export default function UpdateGameRoute() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  return (<GameForm update user={user} id={Number(id)} />);
}
