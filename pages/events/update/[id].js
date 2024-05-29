import { useRouter } from 'next/router';
import EventForm from '../../../components/game/EventForm';

export default function UpdateEventsRoute() {
  const router = useRouter();
  const { id } = router.query;

  return (<EventForm id={Number(id)} update />);
}
