export interface Session {
  data: {
    id: string;
    email: string;
    name: string;
  },
  exp?: number
}