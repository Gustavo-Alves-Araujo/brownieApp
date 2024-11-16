import { defineStore } from "pinia";
import { type Task, type User } from "../types";
import axios from "axios";

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

    async createTask(params: any) {
      try {
        const response = await axios.post(`http://localhost:4000/tasks`, params)

        if (response.status == 200) {
          await this.fetchTasks()
        }
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      }
    },

    async setTaskUser(task_id: number, user_id: number) {
      try {
        const response = await axios.put(`http://localhost:4000/tasks/${task_id}`, {
          user_id: user_id
        })

        if (response.status == 200) {
          await this.fetchTasks()
        }
      } catch (error) {
        console.error("Erro ao atualizar tareaf:", error);
      }
    }
  },
});
