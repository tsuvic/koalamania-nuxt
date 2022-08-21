<template>
    <div>

        <Head>
            <Title>{{ title }}</Title>
        </Head>
        <NuxtLayout>
            <!--未認証時：ログインボタン-->
            <div class="container">
                <div class="row animal-items-center justify-content-center">
                    <div class="mt-5 p-2 bd-highlight">
                        <button class="btn btn-info mx-2" type="button">認証中です...<span class="spinner-border"
                                role="status"></span></button>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
import axios from 'axios'
const route = useRoute();

const id = route.params.twitterId

const title = ref('認証中')

console.log(id)

axios.get('http://localhost:8080/api/users/checkLogin', {
    params: {
        // ここにクエリパラメータを指定する
        twitterId: id
    }
}).then((response) => {
    console.log(response.data)
    navigateTo({
        path: `/user/${response.data.user_id}`
    })
})

</script>