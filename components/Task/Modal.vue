<template>
  <UModal>
    <UCard :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }">
      <template #header>
        <h1>Selecionar user</h1>
      </template>

      <div v-if="user">
        <h1>Meu usuário é {{ user.name }}</h1>

        <UButton label="Me atribuir" @click="onClick" />
      </div>

      <div v-else>
        <h1>Selecione um usuário primeiro.</h1>
      </div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
const props = defineProps<{ taskId: number }>();

const emit = defineEmits(['success'])

import { useUserStore } from "~/store/users";
import { useTaskStore } from "~/store/tasks";

const userStore = useUserStore();
const taskStore = useTaskStore();

const user = computed(() => userStore.selectedUser);

function onClick(_: any) {
  taskStore.setTaskUser(props.taskId, userStore.selectedUser?.id!)

  emit('success')
}
</script>
