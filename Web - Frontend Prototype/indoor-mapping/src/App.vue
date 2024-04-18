<template>
  <div>
    <MainPage v-if="isSignedIn"></MainPage>
    <SignPage v-else @signIn="signInHandler()"></SignPage>
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
    signInHandler() {
      this.isSignedIn = true
    }
  }
}
</script>
