export interface Session {
  data: {
    id: string;
    name: string;
    admin: boolean
  },
  exp?: number
}