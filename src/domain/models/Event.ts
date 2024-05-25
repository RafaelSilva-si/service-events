interface Event {
  id: string;
  title: string;
  date: string | Date;
  description: string;
  capacity: number;
  category: string;
  status: string;
}

export default Event;
