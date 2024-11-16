<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white flex flex-col p-4">
      <!-- App Title -->
      <div class="text-xl font-semibold mb-10">Brownie</div>

      <!-- Navigation -->
      <ul class="space-y-4">
        <!-- Dashboard -->
        <li
          class="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
        >
          <HomeIcon class="w-6 h-6" />
          <span>Dashboard</span>
        </li>

        <!-- Tarefas com Sub-itens -->
        <li>
          <div
            @click="toggleTasks"
            class="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
          >
            <ClipboardListIcon class="w-6 h-6" />
            <span>Tarefas</span>
            <ChevronDownIcon
              class="w-5 h-5 transform transition-transform"
              :class="{ 'rotate-180': isTasksOpen }"
            />
          </div>
          <!-- Sub-itens com transição -->
          <ul v-if="isTasksOpen" class="ml-8 mt-2 space-y-2">
            <li
              class="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
            >
              <ClipboardListIcon class="w-5 h-5" />
              <span>Suas Tarefas</span>
            </li>
            <li
              class="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
            >
              <ClipboardListIcon class="w-5 h-5" />
              <span>Todas as Tarefas</span>
            </li>
          </ul>
        </li>

        <!-- Configurações -->
        <li
          class="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
        >
          <CogIcon class="w-6 h-6" />
          <span>Configurações</span>
        </li>

        <!-- Logout -->
        <li
          class="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
        >
          <LogoutIcon class="w-6 h-6" />
          <span>Logout</span>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col w-full">
      <!-- Header -->
      <header
        class="flex items-center justify-between bg-gray-700 text-white p-4"
      >
        <div></div>
        <h1> Saldo: {{ users.find(user => user.name == selected)?.coins }}</h1>
        <USelectMenu class="" placeholder="Select a person" v-model="selected" :options="users.map(user => user.name)" />
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/users";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUsers();
});

const users = computed(() => userStore.users);

const selected = ref(userStore.users[0]?.name);



const isTasksOpen = ref(false);

const toggleTasks = () => {
  isTasksOpen.value = !isTasksOpen.value;
};
</script>

<style scoped>
/* Transição suave para o sub-menu */
.transition-height {
  transition: height 0.3s ease;
}
</style>
