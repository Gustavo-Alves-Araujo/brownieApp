import { defineStore } from "pinia";
import { type User } from "../types";

interface UserState {
  users: User[];
  selectedUser: User | null;
}

export const useUserStore = defineStore("userStore", {
  state: (): UserState => ({
    users: [],
    selectedUser: null
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

    selectUser(user: User) {
      this.selectedUser = user;
      console.log("uasuario selecionado", this.selectedUser)
    }
  },
});
