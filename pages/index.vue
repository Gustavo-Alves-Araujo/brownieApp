<template>
    <div>
      <UTable
        :columns="columns"
        :rows="formattedTasks"
        @select="selectTask"
      />
  
      <div>
        <UModal v-model="isOpen">
          <UCard
            :ui="{
              ring: '',
              divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }"
          >
            <template #header>
              <Placeholder class="h-8" />
            </template>
  
            <Placeholder class="h-32" />
  
            <template #footer>
              <Placeholder class="h-8" />
            </template>
          </UCard>
        </UModal>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import { useTaskStore } from "~/store/tasks";
  import { type User } from "~/types";
  
  const taskStore = useTaskStore();
  const isOpen = ref(false); // Controle de exibição do modal
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
  
  // Método para selecionar a tarefa e abrir o modal
  const selectTask = (task: any) => {
    const index = selected.value.findIndex((item) => item.id === task.id);
    if (index === -1) {
      selected.value.push(task);
    } else {
      selected.value.splice(index, 1);
    }
    selectedTask.value = task; // Define a tarefa selecionada
    isOpen.value = true; // Abre o modal
  };
  </script>
  