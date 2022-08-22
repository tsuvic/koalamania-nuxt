<template>

  <div v-if="user" class="d-flex flex-column justify-content-center align-items-center m-1">
    <div class="text-center">
      <v-avatar size="120" class="mx-auto">
        <v-img cover :src="user.profileImagePath"></v-img>
      </v-avatar>
    </div>
    <div class="m-1 d-flex">
      <div class="m-1">
        {{ user.username }}
      </div>
      <!-- https://v3.nuxtjs.org/api/components/nuxt-link/#target-and-rel-attributes -->
      <!-- 動的なパスパラメータを持たせたNuxtLinkを貼ることができず、twitterLinkの変数で動的なリンクを生成し、v-bindする -->
      <NuxtLink v-if="user.twitterLinkFlag" v-bind:to="twitterLink">
        <img class="m-1 img-responsive" height="18" width="18" src="@/assets/images/2021-Twitter-logo-blue.png">
      </NuxtLink>
    </div>
    <div class="d-flex align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="m-1"
        viewBox="0 0 16 16">
        <path
          d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>
      <div class="fs-7 text-center">{{user.favoriteZoo}}</div>
    </div>
    <div id="profile" class="d-flex align-items-center m-3">
      <div class="profile-info text-center text-blue-grey-darken-1">
        {{ user.profile }}
      </div>
    </div>
    <v-btn large class="mb-5" th:if="${editFlag}"
      th:onclick="' location.href = \'' + @{/users/edit/{user_id}(user_id=*{user_id})} + ' \' '">
      <span class="fs-6">&nbsp;プロフィール編集&nbsp;</span>
    </v-btn>
  </div>

</template>


<script setup>
import axios from 'axios'

const route = useRoute();
const user = ref();
const posts = ref();
const comments = ref();
const images = ref();
const favorites = ref();
const twitterLink = ref();
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
      twitterLink.value = 'https://twitter.com/' + user.value.provider_adress;
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


