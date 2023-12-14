<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { SessionDetail } from '../models.ts';

const details = ref<SessionDetail | undefined>();
onMounted(() => {
  fetch(`/api/sessions/537232.json`)
    .then((res) => res.json())
    .then((data) => {
      details.value = data;
    });
});

const descriptionParagraphs = computed(() => {
  if (!details.value) {
    return [];
  }

  return details.value.description.split('\n');
});
</script>

<template>
  <div v-if="details">
    <div class="row">
      <div class="col-3">
        <div class="speaker-list">
          <div v-for="speaker of details.speakers" :key="speaker.name">
            <div class="card">
              <img :src="speaker.photo" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ speaker.name }}</h5>
                <p class="card-text">{{ speaker.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-9">
        <h1>{{ details.title }}</h1>
        <h2>{{ details.day }} {{ details.startTime }} {{ details.endTime }}</h2>
        <p>{{ details.track }}</p>
        <p>{{ details.level }}</p>

        <div class="tag-list">
          <span v-for="tag in details.tags" :key="tag" class="badge bg-primary m-1">{{ tag }}</span>
        </div>

        <p v-for="paragraph in descriptionParagraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped lang="scss">
.speaker-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .card {
    height: 100%;
  }

  .card-text {
    flex: 1;
  }
}
</style>
