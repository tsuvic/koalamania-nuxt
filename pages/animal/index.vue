<template>
      <div>
            <NuxtLayout>

                  <Head>
                        <Title>{{ title }}</Title>
                  </Head>
                  <div class="searchResult-container">

                        <div class="p-4 container-fluid">
                              <div class="row no-gutters">
                                    <div class="col-8 pr-4">
                                          <input type="checkbox" id="isMale" value="true" v-model="isMale"
                                                @keydown.enter.prevent="search">
                                          <label for="isMale">オス</label>
                                          <input type="checkbox" id="isFemale" value="true" v-model="isFemale"
                                                @keydown.enter.prevent="search">
                                          <label for="isFemale">メス</label>
                                          <input type="checkbox" id="isAlive" value="true" v-model="isAlive"
                                                @keydown.enter.prevent="search">
                                          <label for="isAlive">生</label>
                                          <input type="checkbox" id="isDead" value="true" v-model="isDead"
                                                @keydown.enter.prevent="search">
                                          <label for="isDead">死</label>
                                    </div>
                                    <ZooListModal :isSearch="isSearch" @closeModal='closeModal'
                                          :checkedZoo="checkedZoo" />
                                    <div class="col-4 btn btn-secondary" data-toggle="modal"
                                          data-target="#exampleModal">動物園</div>
                              </div>
                              <div class="row no-gutters">
                                    <div class="col-8  pr-4">
                                          <input class="form-control form-control form-control-borderless" type="text"
                                                name="keyword" placeholder="キーワード" id="keyword" v-model="keyword"
                                                @keydown.enter.prevent="pushSearchButton">
                                    </div>
                                    <button class="col-4 btn btn-success" type="submit" @click="pushSearchButton">検索</button>
                              </div>
                        </div>

                        <div class="searchResult_content">
                              <div class="results">
                                    <div class="koalaList">
                                          <div class="koalaItem" v-for="animal in animalList"
                                                v-bind:key="animal.animal_id" @click="navigateDetails(animal)">
                                                <!-- 
                                                      router.push() ・ navigateTo() ・NuxtLinkとの使い分けは？

                                                      router.push()はNuxt2での機能
                                                            https://uncle-javascript.com/vue-onclick-arguments
                                                            https://qlitre-weblog.com/nuxt3-microcms-blog-keyword-search/


                                                      NuxtLinkはリンクを作成するが・・navigateToとの違いは要確認
                                                      公式にはどちらの記載もある
                                                            <NuxtLink v-bind:to="animal.name">
                                                            https://note.com/yunp_q/n/n4e6f0d94121b
                                                -->
                                                
                                                <div class="koalaItem_header">
                                                      <div class="koalaItemName">
                                                            <img v-if="animal.sex == 1" src="@/assets/images/male.png">
                                                            <img v-else-if="animal.sex == 2"
                                                                  src="@/assets/images/female.png">
                                                            <img v-else src="@/assets/images/question.png">
                                                            <p>{{ animal.name }}</p>
                                                      </div>
                                                      <div class="koalaItemInfo">
                                                            <p>
                                                                  <a
                                                                        :href='`/zoo/detail/${animal.animalZooHistoryList[0].zoo.zoo_id}`'>{{
                                                                                    animal.animalZooHistoryList[0].zoo.zoo_name
                                                                        }}</a>
                                                            </p>
                                                      </div>
                                                </div>
                                                <div class="koalaItem_content">
                                                      <div class="koalaItem_image">
                                                            <a :href='`/detail/${animal.animal_id}`'>
                                                                  <img :src="animal.profileImagePath">
                                                            </a>
                                                      </div>
                                                      <div class="koalaItemData">
                                                            <div class="koalaItemDataList">

                                                                  <ul>
                                                                        <li><span
                                                                                    class="koalaItemDataList_icon birth">生年月日</span>
                                                                              <p>{{ customFormat(animal.birthdate) }}
                                                                              </p>
                                                                        </li>
                                                                        <li><span
                                                                                    class="koalaItemDataList_icon mother">母親</span>
                                                                              <p v-if="animal.motherAnimal !== null">
                                                                                    <a
                                                                                          :href='`/ detail / ${animal.motherAnimal.animal_id} `'>{{
                                                                                                      animal.motherAnimal.name
                                                                                          }}</a>
                                                                              </p>
                                                                              <p v-else>
                                                                                    不明
                                                                              </p>
                                                                        </li>
                                                                        <li><span
                                                                                    class="koalaItemDataList_icon father">父親</span>
                                                                              <p v-if="animal.fatherAnimal !== null">
                                                                                    <a
                                                                                          :href='`/ detail / ${animal.fatherAnimal.animal_id} `'>{{
                                                                                                      animal.fatherAnimal.name
                                                                                          }}</a>
                                                                              </p>
                                                                              <p v-else>
                                                                                    不明
                                                                              </p>
                                                                        </li>
                                                                  </ul>
                                                            </div>
                                                      </div>
                                                </div>
                                                
                                          </div>
                                    </div>
                              </div>
                              <div class="pagination" v-show="isPageShow">
                              <!-- <p class="total_counter"></p>-->
                              <p class="prev" @click = "pushPrev" v-if = "currentPage != 1">前へ</p>
                              <ul class="page_counter">
                                    <template v-for="page in totalPages">
                                          <li v-if = "page == currentPage" class="page_number active"  @click = "pushPageNumber(page)">{{page}}</li>
                                          <li v-else-if = "1 == page" class="page_number"  @click = "pushPageNumber(page)">{{page}}</li>
                                          <li v-else-if = "totalPages == page" class="page_number"  @click = "pushPageNumber(page)">{{page}}</li>
                                          <li v-else-if = "currentPage - 3 < page && page < currentPage + 3" class="page_number"  @click = "pushPageNumber(page)">{{page}}</li>
                                          <li v-else-if = "currentPage - 3 == page || page == currentPage + 3">...</li>           
                                    </template>
                              </ul>
                              <p class="next" @click = "pushNext" v-if = "currentPage != totalPages">次へ</p>
                        </div>
                        </div>
                  </div>
            </NuxtLayout>
      </div>
</template>

<script setup>
import axios from 'axios'

const title = ref('検索結果')
const keyword = ref('')
const isMale = ref(false)
const isFemale = ref(false)
const isAlive = ref(false)
const isDead = ref(false)
const route = useRoute();
const animalList = ref({})
const checkedZoo = ref([])
const isPageShow = ref(false)
const isSearch = false
const pageNumber = ref(1)
const everyPageConut = 15;
const currentPage = ref(1);
let totalCount = 0;
const totalPages = ref(0);

let zoo = [];

const closeModal = (zooSearch) => {
      zoo = zooSearch.value;
      checkedZoo.value = zooSearch.value;
}

const search = () => {
      animalList.value = {};
      axios.get('https://koalamania.herokuapp.com/api/animals', {
            params: {
                  // ここにクエリパラメータを指定する
                  keyword: keyword.value,
                  zoo: zoo.join(','),
                  isMale: isMale.value,
                  isFemale: isFemale.value,
                  isAlive: isAlive.value,
                  isDead: isDead.value,
                  page: currentPage.value
            }
      }).then((response) => {
            animalList.value = response.data.resource
            totalCount = response.data.count
            totalPages.value = Math.ceil(totalCount/everyPageConut)
            isPageShow.value = totalPages.value > 1
      })
}

const navigateDetails = (animal) => {
      return navigateTo({
            path: animal.name
      });
}
const customFormat = (customdate) => {
      let date = new Date(customdate);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

const pushPageNumber = (newPage) => {
      currentPage.value = newPage;
      search();
}

const pushPrev = (newPage) => {
      currentPage.value -= 1;
      search();
}

const pushSearchButton = () => {
      currentPage.value = 1;
      search();
}

const pushNext = (newPage) => {
      currentPage.value += 1;
      search();
}

checkedZoo.value = route.query.zoo;


onMounted(() => {
      keyword.value = route.query.keyword;
      if (route.query.zoo && route.query.zoo.includes(',')) {
            zoo = route.query.zoo.split(',');
      } else if (route.query.zoo && route.query.zoo.length > 0) {
            zoo.push(route.query.zoo);
      }
      search();
})

</script>

