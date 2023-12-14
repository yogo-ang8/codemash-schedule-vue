<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { SessionOverview } from '../models.ts';
import SessionCard from './SessionCard.vue';
import ButtonGroup from './ButtonGroup.vue';

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

const searchText = ref('');

const selectedTrack = ref('');

const tracks = computed(() => {
  const allTracks = sessions.value.map((session) => session.track);
  const uniqueTracks = new Set(allTracks);
  return Array.from(uniqueTracks);
});

const selectedLevel = ref('');

const levels = ['Introductory and overview', 'Intermediate', 'Advanced'];

const filteredSessions = computed(() => {
  let currentSessions = sessions.value;

  if (selectedTrack.value) {
    currentSessions = currentSessions.filter((s) => s.track === selectedTrack.value);
  }

  if (selectedLevel.value) {
    currentSessions = currentSessions.filter((s) => s.level === selectedLevel.value);
  }

  if (searchText.value.length <= 2) {
    return currentSessions;
  }

  const term = searchText.value.toLowerCase();
  return currentSessions.filter(
    (s) =>
      s.title.toLowerCase().includes(term) ||
      s.excerpt.toLowerCase().includes(term) ||
      s.speakers.some((speaker) => speaker.toLowerCase().includes(term)) ||
      s.tags.some((tag) => tag.toLowerCase().includes(term))
  );
});
</script>

<template>
  <div>
    <h1>Sessions</h1>

    <div class="row">
      <div class="col">
        <div class="form-floating">
          <input
            id="search"
            class="form-control mb-4"
            type="text"
            placeholder="Search"
            aria-label="Search"
            v-model="searchText"
          />
          <label for="search">Search</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating">
          <select id="track" class="form-control" v-model="selectedTrack">
            <option value="">All</option>
            <option v-for="track in tracks" :key="track" :value="track">{{ track }}</option>
          </select>
          <label for="track">Track</label>
        </div>
      </div>
    </div>

    <ButtonGroup :options="levels" v-model="selectedLevel" />

    <!-- we're going to add filters in a later module that will update these counts -->
    <p>Showing {{ filteredSessions.length }} of {{ sessions.length }} talks</p>

    <div class="speaker-grid">
      <SessionCard v-for="session in filteredSessions" :key="session.id" :session="session" />
    </div>

    <!-- show this if there are no sessions -->
    <p v-if="filteredSessions.length === 0">No sessions found</p>
  </div>
</template>

<style scoped>
.speaker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
}
</style>
