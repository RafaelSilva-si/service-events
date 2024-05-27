interface Event {
  id: string;
  title: string;
  date: string | Date;
  description: string;
  capacity: number;
  cover: string;
  galerry: any;
  category: string;
  status: string;
}
export default Event;
