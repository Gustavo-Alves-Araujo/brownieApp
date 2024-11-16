import { defineStore } from "pinia";
import { type Task } from "../types";

interface TaskState {
  tasks: Task[];
}

export const useTaskStore = defineStore("taskStore", {
  state: (): TaskState => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      try {
        const response = await fetch("http://localhost:4000/tasks");
        const tasks = await response.json();
        console.log('felicitações', tasks);
        this.tasks = tasks;
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    },
  },
});
