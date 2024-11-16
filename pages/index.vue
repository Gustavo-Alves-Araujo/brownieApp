<template>
  <div class="flex justify-between">
    <h1 class="text-xl mb-2 font-bold">Tasks</h1>

    <UButton label="Criar task" @click="openCreateTaskModal" />
  </div>

  <div>
    <UTable :sort="sort" :columns="columns" :rows="formattedTasks" @select="selectTask" />

    <div>
      <TaskModal isOpen />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskCreateModal, TaskModal } from '#components'

import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "~/store/tasks";
import { type Task, type User } from "~/types";

const sort = ref({
  column: 'id',
  direction: 'asc'
})
const taskStore = useTaskStore();
const isOpen = ref(false); // Controle do modal
const isCreateTaskModal = ref(false); // Controle do modal
const selectedTask = ref(null); // Tarefa selecionada para exibir no modal

onMounted(() => {
  taskStore.fetchTasks();
});

const tasks = computed(() => taskStore.tasks);

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "title", label: "Título" },
  { key: "coins", label: "Moedas", sortable: true },
  { key: "status", label: "Status", sortable: true },
  {
    key: "user",
    label: "Responsável",
    formatter: (user: User) => user?.name || "N/A",
  },
];

const formattedTasks = computed(
  () =>
    tasks.value?.map((task) => ({
      id: task.id,
      title: task.title,
      coins: task.coins,
      status: task.status,
      user: task.user ? task.user.name : "N/A",
    })) || []
);

const selected = ref([formattedTasks.value[1]]); // Inicializa com a segunda tarefa

const selectTask = (task: Task) => {
  isOpen.value = true;
  openModal(task)
};
const modal = useModal()
const toast = useToast()


function openModal(task: Task) {
  modal.open(TaskModal, {
    taskId: task.id,
    onSuccess() {
      toast.add({
        title: 'Parabéns',  
      })
      modal.close()
    }
  })
}

function openCreateTaskModal() {
  modal.open(TaskCreateModal,
    {
      onSuccess() {
        toast.add({
          title: 'Tarefa criada com sucesso!',
        })
        modal.close()
      }
    })
}
</script>