<template>
  <UModal>
    <UCard :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }">
      <template #header>
        <h1>Criar task</h1>
      </template>

      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Título" name="title" class="mb-5">
          <UInput v-model="state.title" />
        </UFormGroup>

        <UFormGroup label="Moedas" name="coins" class="mb-5">
          <UInput v-model="state.coins" type="number" />
        </UFormGroup>

        <UFormGroup label="Usuário" name="user_id" class="mb-5">
          <UInput v-model="userName" type="string" disabled />
        </UFormGroup>

        <UButton type="submit">
          Criar
        </UButton>
      </UForm>

    </UCard>
  </UModal>
</template>
<script setup lang="ts">
const userStore = useUserStore();
const taskStore = useTaskStore();

const userName = ref(userStore?.selectedUser?.name);

const emit = defineEmits(['success'])

const state = reactive({
  title: undefined,
  coins: undefined,
  user_id: userStore?.selectedUser?.id,
})
import { useUserStore } from "~/store/users";
import { useTaskStore } from "~/store/tasks";

function onSubmit() {
  taskStore.createTask(state)

  emit('success')
}
</script>