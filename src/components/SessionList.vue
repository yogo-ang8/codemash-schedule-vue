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

function handleSelectLevel(level: string) {
  if (level == selectedLevel.value) {
    selectedLevel.value = '';
  } else {
    selectedLevel.value = level;
  }
}

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
    <!-- <ButtonGroup
     :options="levels"
     :model-value="selectedLevel"
     @update:model-value="(newValue) => (selectedLevel = newValue)"
   /> -->
   <ButtonGroup :options="levels" v-model="selectedLevel" />
    <!-- <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <template v-for="level in levels" :key="level">
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          :id="level"
          autocomplete="off"
          @click="handleSelectLevel(level)"
          :checked="level === selectedLevel"
        />
        <label class="btn btn-outline-primary" :for="level">{{ level }}</label>
      </template>
    </div> -->

    <!-- we're going to add filters in a later module that will update these counts -->
    <p>Showing {{ filteredSessions.length }} of {{ sessions.length }} talks</p>

    <!-- <div class="speaker-grid"> -->
      <div class="speaker-grid">
      <!-- here we include three different cards depending on the level -->
      <!-- your job is to replace this static markup with vue templating syntax -->
      <!-- introductory and overview -->
      <!-- <div class="card" v-for="session in filteredSessions" :key="session.id">
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
      </div> -->
      
      <SessionCard 
        v-for="session in filteredSessions" 
        :key="session.id" 
        :session="session"
      />
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
