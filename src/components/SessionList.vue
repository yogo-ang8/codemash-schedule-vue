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
    <p>Showing 3 of 3 talks</p>

    <div class="speaker-grid">
      <!-- here we include three different cards depending on the level -->
      <!-- your job is to replace this static markup with vue templating syntax -->
      <!-- introductory and overview -->
      <div class="card">
        <div class="card-body">
          <span class="badge bg-success">Introductory and overview</span>
          <h5 class="card-title">Build a Modern Single Page Application with Vue</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Matt Burke</h6>
          <p class="card-text">
            Vue offers developers a way to build ambitious front-end applications with powerful reactive programming
            patterns and an intuitive HTML-based templating language. This workshop will give you a jumping-off point
            for large front-end applications using Vue with blazing-fast dev tools like esbuild,...
          </p>
          <div class="footer pt-2">
            <span> Tuesday 8:00 - 12:00</span>
            <a href="" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>

      <!-- intermediate -->
      <div class="card">
        <div class="card-body">
          <span class="badge bg-warning">Intermediate</span>
          <h5 class="card-title">Isn't it time to ditch code coverage? Focus on high value tests instead</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Stephen Odell</h6>
          <p class="card-text">
            As engineers, it can be difficult to use metrics to measure the value of what we do. One metric that
            typically falls short is code coverage because it can’t measure how WELL our application has been tested,
            rather, it focuses how MUCH has been tested. What if we ditched this traditional metric and...
          </p>
          <div class="footer pt-2">
            <span>Thursday 10:30 - 11:30</span>
            <a href="" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>

      <!-- advanced -->
      <div class="card">
        <div class="card-body">
          <span class="badge bg-danger">Advanced</span>
          <h5 class="card-title">Controlling data overhead from the OpenTelmetry Collector</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Nočnica Mellifera</h6>
          <p class="card-text">
            The OpenTelemetry Collector is becoming the de facto standard for moving observability data within your
            architecture and to a data store. But in its default configuration it can overuse data and network
            resources. In this talk I'll cover the configuration control you have over your collector, and...
          </p>
          <div class="footer pt-2">
            <span>Friday 14:45 - 15:45</span>
            <a href="" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>
    </div>

    <!-- show this if there are no sessions -->
    <!--<p>No sessions found</p>-->
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
