<template>
  <div>
    <MainPage v-if="isSignedIn"></MainPage>
    <SignPage v-else @signIn="signInHandler()"></SignPage>
  </div>
</template>


<script>
import MainPage from './views/MainPage.vue'
import SignPage from './views/SignPage.vue'

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
