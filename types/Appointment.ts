export interface Appointment {
    id: string;
    location: string;
    route: string;
    date: string;
    time: string;
    status: 'confirmado' | 'pendiente';
    image: string;
    userName: string;
    userEmail: string;
    visitors: number;
    guideName: string;
  }