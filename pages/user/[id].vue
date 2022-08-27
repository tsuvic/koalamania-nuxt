<template>

  <!--プロフィール-->
  <div v-if="user" class="d-flex flex-column justify-content-center align-items-center m-1">
    <div class="text-center">
      <v-avatar size="120" class="mx-auto">
        <v-img cover :src="user.profileImagePath"></v-img>
      </v-avatar>
    </div>
    <div class="m-1 d-flex align-items-center">
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
      <div v-if="favoriteZoo">
        {{ favoriteZoo.zoo_name }}
      </div>
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

  <!--メニューバー-->
  <v-tabs grow v-model="menu" centered>
    <v-tab v-for="tab in tabs" :key="tab.key" :value="tab.value" @click="onTabClicked(tab.key)">
      {{ tab.value }}
    </v-tab>
  </v-tabs>

  <!-- コンテンツ -->
  <v-window v-model="menu">
    <v-window-item v-for="tab in tabs" :key="tab.key" :value="tab.value">

      <!-- 投稿 -->
      <v-card v-if="tab.value === '投稿'" class="mx-auto my-2" max-width="900">
        <v-card v-for="post in posts" class="my-2 py-2" :key="post">
          <v-img v-if="post.postImageList !== null" height="400" :src="post.postImageList[0].imageAddress" alt="">
          </v-img>
          <v-card-header class="py-1">
            <v-card-header-text>
              <v-card-title>
                {{ post.title }}
              </v-card-title>
              <v-card-subtitle class="py-0">
                {{ post.visitDate }}
              </v-card-subtitle>
              <!-- TODO リンク作成 -->
              <v-card-subtitle class="py-0">
                <a href="" v-if="post.postImageList !== null">
                  <!-- https://teratail.com/questions/351116 -->
                  {{ post.postImageList[0] && post.postImageList[0].animal &&
                      post.postImageList[0].animal.name
                  }}
                </a>
                <span>&nbsp;@&nbsp;</span>
                <a href="">
                  {{ post.zoo && post.zoo.zoo_name }}
                </a>
              </v-card-subtitle>
            </v-card-header-text>
          </v-card-header>
          <v-card-text class="py-1">
            <div>
              {{ post.contents }}
            </div>
            <div class="pt-1">
              <span class="text-medium-emphasis">Posted by </span>
              <a href="" class="text-medium-emphasis">
                {{ post.user.username }}
              </a>
            </div>
          </v-card-text>
          <v-container fluid class="py-1">
            <v-row justify="center">
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-star</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-comment</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card>

      <!-- コメント -->
      <v-card v-if="tab.value === 'コメント'" class="mx-auto my-2" max-width="748">
        <v-card v-for="comment in comments" :key="comment" class="my-2 py-2">
          <v-img v-if="comment.postImageList !== null" height="400" :src="comment.postImageList[0].imageAddress" alt="">
          </v-img>
          <v-card-header class="py-1">
            <v-card-header-text>
              <v-card-title>
                {{ comment.title }}
              </v-card-title>
              <v-card-subtitle class="py-0">
                {{ comment.visitDate }}
              </v-card-subtitle>
              <!-- TODO リンク作成 -->
              <v-card-subtitle class="py-0">
                <a href="" v-if="comment.postImageList !== null">
                  <!-- https://teratail.com/questions/351116 -->
                  {{ comment.postImageList[0] && comment.postImageList[0].animal &&
                      comment.postImageList[0].animal.name
                  }}
                </a>
                <span>&nbsp;@&nbsp;</span>
                <a href="">
                  {{ comment.zoo && comment.zoo.zoo_name }}
                </a>
              </v-card-subtitle>
            </v-card-header-text>
          </v-card-header>
          <v-card-text class="py-1">
            <div>
              {{ comment.contents }}
            </div>
            <div class="pt-1">
              <span class="text-medium-emphasis">Posted by </span>
              <a href="" class="text-medium-emphasis">
                {{ comment.user.username }}
              </a>
            </div>
          </v-card-text>
          <v-container fluid class="py-1">
            <v-row justify="center">
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-star</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-comment</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card>

      <!-- 写真用 -->
      <!-- :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`" -->
      <!-- :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`" -->
      <v-card v-if="tab.value === '写真'" class="mx-auto my-2" max-width="748">
        <v-row>
          <v-col v-for="image in images" :key="image" class="d-flex child-flex" cols="4">
            <v-img v-if="image.postImageList !== null" :src="image.postImageList[0].imageAddress" alt=""
              aspect-ratio="1" cover coverclass="bg-grey-lighten-2">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-5">
                  </v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card>

      <!-- お気に入り用 -->
      <v-card v-if="tab.value === 'お気に入り'" class="mx-auto my-2" max-width="748">
        <v-card v-for="favorite in favorites" class="my-2 py-2">
          <v-img v-if="favorite.postImageList !== null" height="400" :src="favorite.postImageList[0].imageAddress"
            alt=""></v-img>
          <v-card-header class="py-1">
            <v-card-header-text>
              <v-card-title>
                {{ favorite.title }}
              </v-card-title>
              <v-card-subtitle class="py-0">
                {{ favorite.visitDate }}
              </v-card-subtitle>
              <!-- TODO リンク作成 -->
              <v-card-subtitle class="py-0">
                <a href="" v-if="favorite.postImageList !== null">
                  <!-- https://teratail.com/questions/351116 -->
                  {{ favorite.postImageList[0] && favorite.postImageList[0].animal &&
                      favorite.postImageList[0].animal.name
                  }}
                </a>
                <span>&nbsp;@&nbsp;</span>
                <a href="">
                  {{ favorite.zoo && favorite.zoo.zoo_name }}
                </a>
              </v-card-subtitle>
            </v-card-header-text>
          </v-card-header>
          <v-card-text class="py-1">
            <div>
              {{ favorite.contents }}
            </div>
            <div class="pt-1">
              <span class="text-medium-emphasis">Posted by </span>
              <a href="" class="text-medium-emphasis">
                {{ favorite.user.username }}
              </a>
            </div>
          </v-card-text>
          <v-container fluid class="py-1">
            <v-row justify="center">
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-star</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-comment</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" class="py-1 d-flex justify-content-center">
                <v-btn icon color="grey" variant="plain">
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card>
    </v-window-item>
  </v-window>
</template>


<script setup>
import axios from 'axios'

const route = useRoute();
const user = ref();
const favoriteZoo = ref();
const menu = ref();
const posts = ref();
const comments = ref();
const images = ref();
const favorites = ref();
const contents = ref();
const twitterLink = ref();
const tabs = [
  { key: 1, value: '投稿' },
  { key: 2, value: 'コメント' },
  { key: 3, value: '写真' },
  { key: 4, value: 'お気に入り' },
];
const apiClient = axios.create({
  baseURL: 'https://koalamania.herokuapp.com/api/users/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

const onUserPageLoaded = () => {

  //ユーザー情報を取得・NuxtLinkでTwitterへのリンクを貼るためにtwitterLink（リアクティブオブジェクト）に値を格納
  apiClient.get(`${route.params.id}`)
    .then(res => {
      user.value = res.data
      twitterLink.value = 'https://twitter.com/' + user.value.provider_adress;
    })
    .catch(err => {
      console.log(err)
    })

  //お気に入り動物園情報を取得（ユーザー情報とエンドポイントが異なるため、個別にAPIコールする
  //ORMを用いたシンプルなSQLを発行することを目的として、バックエンドでエンティティの設計上、ユーザー情報にお気に入りの動物園名を持たせていないためである
  apiClient.get(`${route.params.id}/favoriteZoo`)
    .then(res => {
      favoriteZoo.value = res.data
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
      comments.value = toDateTime(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const onImagesClicked = () => {
  apiClient.get(`${route.params.id}` + '/images')
    .then(res => {
      images.value = toDateTime(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const onFavoritesClicked = () => {
  apiClient.get(`${route.params.id}` + '/favorites')
    .then(res => {
      favorites.value = toDateTime(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const toDateTime = (contents) => {
  for (const i in contents) {
    const date = new Date(contents[i].visitDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek]
    contents[i].visitDate = `${year}年${month}月${day}日（${dayOfWeekStr}）`;
  }
  return contents;
}

onMounted(() => {
  onUserPageLoaded();
  onPostsClicked();
})




</script>


