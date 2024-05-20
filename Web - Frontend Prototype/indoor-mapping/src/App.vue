<template>
  <div>
    <MainPage v-if="isSignedIn"></MainPage>
    <SignPage v-else @logIn="handler_LogIn()"></SignPage>
  </div>
</template>

<script>
import SignPage from './views/AuthenticationPages/SignPage.vue'
import MainPage from './views/MainPage.vue'

export default {
  components: {
    MainPage,
    SignPage
  },
  data() {
    return {
      isSignedIn: false
    }
  },
  methods: {
    handler_LogIn() {
      this.isSignedIn = true
    }
  }
}
</script>
