<template>
    <div>
        <NuxtLayout>
            <Head>
                <Title>{{ title }}</Title>
            </Head>
            <ZooListModal :isSearch="isSearch" @searchFromZoo='searchFromZoo' />
            <div class="masthead">
                <div class="masthead_content">
                    <div class="logo">
                        <img src="@/assets/images/title.png" alt="title">
                    </div>
                    <div class="copy">
                        <p>コアラのことがもっと好きになるデータベース</p>
                    </div>

                    <div class="topsearch">
                        <div class="container g-0">
                            <div class="row g-0 topsearch_tabs">
                                <div class="col-4 topsearch_tab first d-flex align-items-center justify-content-center">
                                    <a class="search tab_active">キーワードから探す</a>
                                </div>
                                <div
                                    class="col-4 topsearch_tab second js-modal-open-zoo d-flex align-items-center justify-content-center">
                                    <a class="search" data-toggle="modal" data-target="#exampleModal">動物園から探す</a>
                                </div>
                                <div
                                    class="col-4 topsearch_tab third js-modal-open-animal d-flex align-items-center justify-content-center">
                                    <a class="search" data-toggle="modal" data-target="#animalModal">動物から探す</a>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="isMale" name="isMale" value="false">
                        <input type="hidden" id="isFemale" name="isFemale" value="false">
                        <input type="hidden" id="isAlive" name="isAlive" value="false">
                        <input type="hidden" id="isDead" name="isDead" value="false">



                        <div class="topsearch_keyword">
                            <div class="formtext">
                                <input class="formtext" type="text" name="keyword" v-model="keyword"
                                    placeholder="コアラ・動物園名"  @keydown.enter.prevent="search">
                                <button class="topsearch_button text-white" @click="search">さがす</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = ref('トップページ')
const keyword = ref("")
const isSearch = true

const search = () => {

    return navigateTo({
        path: '/animal',
        query: {
            keyword: keyword.value
        }
    })
}

const searchFromZoo = (zooSearch) => {
    let str = zooSearch.value.length > 0 ? zooSearch.value.join(',') : null;
    return navigateTo({
        path: '/animal',
        query: {
            zoo: str
        }
    })
}

</script>