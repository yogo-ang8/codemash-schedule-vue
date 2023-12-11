<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SessionOverview } from '../models.ts';

// we 'll talk about this in a later module, but here we load the list of sessions and log it to the browser console
// you can also open public/api/sessions/index.json to see the data in your editor
const sessions = ref<SessionOverview[]>([]);
onMounted(() => {
  fetch('/api/sessions/index.json')
    .then((res) => res.json())
    .then((data) => {
      sessions.value = data;
      console.log(data);
    });
});
</script>

<template>
  <div>
    <h1>Sessions</h1>

    <!-- we're going to add filters in a later module that will update these counts -->
    <p>Showing {{ sessions.length }} of {{ sessions.length }} talks</p>

    <div class="speaker-grid">
      <!-- here we include three different cards depending on the level -->
      <!-- your job is to replace this static markup with vue templating syntax -->
      <!-- introductory and overview -->
      <div class="card" v-for="session in sessions" :key="session.id">
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
    </div>

    <!-- show this if there are no sessions -->
    <p v-if="sessions.length === 0">No sessions found</p>
  </div>
</template>

<style scoped>
.speaker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
}

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
