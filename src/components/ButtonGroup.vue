<script setup lang="ts">
export interface ButtonGroupProps {
  modelValue: string;
  options: string[];
}

const props = defineProps<ButtonGroupProps>();
const emit = defineEmits(['update:modelValue']);

function handleSelectOption(option: string) {
  if (option === props.modelValue) {
    emit('update:modelValue', '');
  } else {
    emit('update:modelValue', option);
  }
}
</script>
<template>
  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
    <template v-for="option in options" :key="option">
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        :id="option"
        autocomplete="off"
        @click="handleSelectOption(option)"
        :checked="option === modelValue"
      />
      <label class="btn btn-outline-primary" :for="option">{{ option }}</label>
    </template>
  </div>
</template>
