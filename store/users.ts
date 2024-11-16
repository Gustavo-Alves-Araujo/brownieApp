import { defineStore } from "pinia";
import { type User } from "../types";

interface UserState {
  users: User[];
}

export const useUserStore = defineStore("userStore", {
  state: (): UserState => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await fetch("http://localhost:4000/users");
        const users = await response.json();
        console.log('felicitações', users);
        this.users = users;
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    },
  },
});
