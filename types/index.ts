export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  coins: number;
  created_at: string;
  user?: User;
  updated_at: string;
  status: string;
}
