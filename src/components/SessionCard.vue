<script setup lang="ts">
import { SessionOverview } from '../models';

export interface SessionCardProps {
  session: SessionOverview;
}
defineProps<SessionCardProps>();
</script>

<template>
  <div class="card">
    <div class="card-body">
      <span
        class="badge"
        :class="{
          'bg-success': session.level === 'Introductory and overview',
          'bg-warning': session.level === 'Intermediate',
          'bg-danger': session.level === 'Advanced',
        }"
        >{{ session.level }}</span
      >
      <h5 class="card-title">{{ session.title }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ session.speakers.join(', ') }}</h6>
      <p class="card-text">{{ session.excerpt }}</p>
      <div class="footer pt-2">
        <span> {{ session.day }} {{ session.startTime }} - {{ session.endTime }}</span>
        <a href="" class="btn btn-primary">Details</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-text {
  flex: 1;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid #ccc;
}
</style>
