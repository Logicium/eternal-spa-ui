<script setup lang="ts">

import TuneIcon from "@/assets/icons/TuneIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import FeatureCard from "@/components/cards/FeatureCard.vue";
import PodcastCard from "@/components/cards/PodcastCard.vue";
import IconToggle from "@/components/IconToggle.vue";
import { ref, computed } from "vue";
import api from "@/router/api.ts";
import LoadingPage from "@/pages/LoadingPage.vue";
import type { PodcastsPageResponse, PodcastsPageData } from "@/interfaces";

const fetchedData = ref<PodcastsPageResponse | null>(null);
const fetchData = async function (){
  const response = await fetch(`${api.podcasts}?populate=*`, {});
  const data = await response.json();
  fetchedData.value = data;
  console.log(data);
}

fetchData();

// Computed property for featured podcasts from CMS data
const featuredPodcasts = computed(() => {
  if (!fetchedData.value) return [];

  return fetchedData.value.data.filter(podcast => podcast.isFeatured === true);
});

// Adapter function to transform CMS podcast data to the format expected by FeatureCard
const adaptedFeaturedPodcasts = computed(() => {
  return featuredPodcasts.value.map(podcast => ({
    id: podcast.documentId,
    name: podcast.name,
    image: `https://strapi-8w04.onrender.com${podcast.image.formats.medium?.url || podcast.image.url}`
  }));
});

// Search and filter state
const searchText = ref('');
const showFilters = ref(false);
const tagInput = ref('');
const tagFilters = ref<string[]>([]);
const sortBy = ref('newest');

// Filter podcasts based on search text and tags
const filteredPodcasts = computed(() => {
  if (!fetchedData.value) return [];

  return fetchedData.value.data.filter(podcast => {
    // Text search filter
    if (searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      const titleMatch = podcast.name?.toLowerCase().includes(searchLower);
      const descriptionMatch = podcast.description?.toLowerCase().includes(searchLower);

      if (!(titleMatch || descriptionMatch)) {
        return false;
      }
    }

    // Tag filter
    if (tagFilters.value.length > 0) {
      // Check if any of the podcast's tags match any of the selected tags
      const hasMatchingTag = podcast.tags.some(tag =>
        tagFilters.value.some(filter => tag.tagName.toLowerCase().includes(filter.toLowerCase()))
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy.value === 'newest') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else if (sortBy.value === 'oldest') {
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    } else if (sortBy.value === 'title') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
});

// Adapter function to transform CMS podcast data to the format expected by PodcastCard
const adaptedFilteredPodcasts = computed(() => {
  return filteredPodcasts.value.map(podcast => ({
    id: podcast.documentId,
    name: podcast.name,
    desc: podcast.description,
    tags: podcast.tags.map(tag => tag.tagName),
    image: `https://strapi-8w04.onrender.com${podcast.image.formats.medium?.url || podcast.image.url}`
  }));
});

// Add tag to filters
const addTag = () => {
  if (tagInput.value.trim()) {
    // Split the input by commas and add each tag
    const newTags = tagInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    // Add new tags to the filters array (avoid duplicates)
    newTags.forEach(tag => {
      if (!tagFilters.value.includes(tag)) {
        tagFilters.value.push(tag);
      }
    });
    // Clear the input field
    tagInput.value = '';
  }
};

// Remove tag from filters
const removeTag = (tag: string) => {
  const index = tagFilters.value.indexOf(tag);
  if (index !== -1) {
    tagFilters.value.splice(index, 1);
  }
};

// Reset filters
const resetFilters = () => {
  searchText.value = '';
  tagFilters.value = [];
  tagInput.value = '';
  sortBy.value = 'newest';
};

// Toggle filters visibility
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

// Handle tag click from PodcastCard
const handleTagClick = (tag: string) => {
  // Add the tag to filters if it's not already there
  if (!tagFilters.value.includes(tag)) {
    tagFilters.value.push(tag);
  }

  // Enable the filter button if it's not already toggled on
  if (!showFilters.value) {
    showFilters.value = true;
  }
};

</script>

<template>
  <transition-group name="fade" appear>

    <LoadingPage v-if="fetchedData===null" :big="false"/>
    <template v-else>
      <div class="header">
        PODCAST
      </div>
      <div  class="podcasts">

      <div class="controls">
        <div class="searchIcon"><SearchIcon/></div>
        <input class="underline text" v-model="searchText" placeholder="Search Podcasts" type="text">
        <div class="filters" @click="toggleFilters">
          <IconToggle :is-active="showFilters">
            <template #inactive>
              <TuneIcon/>
            </template>
            <template #active>
              <CloseIcon/>
            </template>
          </IconToggle>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="filter-section" :class="{ 'show-filters': showFilters }">
        <div class="filter-options">
          <div class="filter-group">
            <label class="filter-label">Tags:</label>
            <div class="tag-input-container">
              <input
                type="text"
                v-model="tagInput"
                placeholder="Type tags separated by commas..."
                class="tag-input"
                @keyup.enter="addTag"
              />
              <button @click="addTag" class="add-tag-button">Add</button>
            </div>
            <div class="tags-container" v-if="tagFilters.length > 0">
              <div class="tag" v-for="tag in tagFilters" :key="tag" @click="removeTag(tag)">
                {{ tag }}
                <span class="remove-tag">×</span>
              </div>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Sort By:</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="sortBy" value="newest" />
                Newest First
              </label>
              <label class="radio-label">
                <input type="radio" v-model="sortBy" value="oldest" />
                Oldest First
              </label>
              <label class="radio-label">
                <input type="radio" v-model="sortBy" value="name" />
                Title (A-Z)
              </label>
            </div>
          </div>

          <button @click="resetFilters" class="reset-button">Reset Filters</button>
        </div>
      </div>

      <div class="featuresWrap" v-if="!searchText && tagFilters.length === 0">
        <div class="title">Featured Podcasts</div>
        <div class="featuredGrid">
          <FeatureCard v-for="podcast in adaptedFeaturedPodcasts" :key="podcast.id" :data="podcast"/>
        </div>
      </div>

      <div class="podcastList">
        <div class="title2">All Podcasts</div>
        <PodcastCard v-for="podcast in adaptedFilteredPodcasts" :key="podcast.id" :data="podcast" @tag-click="handleTagClick"/>
      </div>

    </div>
    </template>
  </transition-group>



</template>

<style scoped lang="scss">

@import "../assets/Library";

.title{
  font-size: $fontMed;
  margin-bottom: 1rem;
  width: 80%;
  justify-self: center;
}

.title2{
  font-size: $fontMed;
  margin-bottom: 1rem;
}

.podcastList{
  width: 80%;
  align-self: center;
}

.featuredGrid{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 2rem;
  margin-bottom: 1rem;
  width: 80%;
  justify-self: center;
}

.searchIcon{
  position: absolute;
  display: flex;
  align-items: center;
  color: $secondary;
}

.header{
  background-position: 100% 60%;
  background-image: url("/podcast/podcast1.jpg");
}

.controls{
  padding: 2rem 0;
  width: 80%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  border-radius: 6px;
}

.filters{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  min-width: 45px;
  background-color: $secondary;
  color: $quaternary;
  border-radius: 6px;
  cursor: pointer;
}

.podcasts{
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: center;
}

input[type="text"] {
  padding-left: 24px !important;
  margin-right: 1vw;
}

input[type="radio"]{
  height: 24px !important;
}

.radio-group {
  display: flex;
  justify-content: space-between;
}

.filter-section {
  background-color: $primary;
  border-radius: 6px;
  width: 80%;
  align-self: center;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: all 1s ease;
  interpolate-size: allow-keywords;
}

.show-filters {
  max-height: fit-content; /* Adjust based on your content */
  opacity: 1;
  transition: all 1s ease;
  interpolate-size: allow-keywords;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 250px;
}

.filter-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $quaternary;
}

.tag-input-container {
  display: flex;
  margin-bottom: 1rem;
}

.tag-input {
  flex: 1;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid $secondary;
  background-color: $primary;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  margin-right: 0.5rem;

  &:focus {
    outline: none;
    border-color: $quaternary;
    box-shadow: 0 0 0 2px rgba($quaternary, 0.2);
  }
}

.add-tag-button {
  padding: 0.5rem 1rem;
  background-color: $quaternary;
  color: $primary;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  display: flex;
  align-items: center;
  margin-right: 1vw;
  padding: 1vw;
  height: 45px;
  border-radius: 45px;
  background-color: $secondary;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: darken($secondary, 5%);
  }
}

.remove-tag {
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.reset-button {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: $quaternary;
  border: 1px solid $quaternary;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  transition: all 0.3s;
  align-self: flex-end;

  &:hover {
    background-color: rgba($quaternary, 0.1);
  }
}

</style>
