<template>
  <!-- <v-card class="mx-auto" max-width="374" height="1422"> -->
  <div v-if="user" class="d-flex flex-column justify-content-center align-items-center m-1">
    <div class="text-center">
      <v-avatar size="120" class="mx-auto">
        <v-img cover :src="user.profileImagePath"></v-img>
      </v-avatar>
    </div>
    <div class="m-1 d-flex align-items-center">
      <div class="fs-4 fw-bold text-center">
        {{ user.username }}
      </div>
      <div v-if="user.twitterLinkFlag" @click="navigateToTwitter">
        <img class="m-2 img-responsive" height="18" width="18" src="@/assets/images/2021-Twitter-logo-blue.png">
      </div>
    </div>
  </div>
  <!-- </v-card> -->
</template>


<script setup>
import axios from 'axios'

const route = useRoute();
const user = ref();
const posts = ref();
const comments = ref();
const images = ref();
const favorites = ref();
const apiClient = axios.create({
  baseURL: 'https://koalamania.herokuapp.com/api/users/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
})

const onUserPageLoaded = () => {
  apiClient.get(`${route.params.id}`)
    .then(res => {
      user.value = res.data
    })
    .catch(err => {
      console.log(err)
    })
}

const onTabClicked = (key) => {
  switch (key) {
    case 1:
      onPostsClicked();
      break;
    case 2:
      onCommentsClicked();
      break;
    case 3:
      onImagesClicked();
      break;
    case 4:
      onFavoritesClicked();
      break;
  }
}

const onPostsClicked = () => {
  apiClient.get(`${route.params.id}` + '/posts')
    .then(res => {
      posts.value = toDateTime(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const onCommentsClicked = () => {
  apiClient.get(`${route.params.id}` + '/comments')
    .then(res => {
      comments = toDateTime(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const onImagesClicked = () => {
  apiClient.get(`${route.params.id}` + '/images')
    .then(res => {
      images = toDateTime(response.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const onFavoritesClicked = () => {
  apiClient.get(`${route.params.id}` + '/favorites')
    .then(res => {
      favorites = toDateTime(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const toDateTime = (posts) => {
  for (const i in posts) {
    const date = new Date(posts[i].visitDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek]
    posts[i].visitDate = `${year}年${month}月${day}日（${dayOfWeekStr}）`;
  }
  return posts;
}

onMounted(() => {
  onUserPageLoaded();
  onPostsClicked();
})




</script>


