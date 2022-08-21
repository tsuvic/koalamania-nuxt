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
                            <button class="btn btn-info mx-2" type="button" @click="login">Twitterアカウントでログイン</button>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = ref('ログイン')

const login = () => {
        window.location.href = "http://localhost:8080/twiiter/login"
    }


</script>