<template>
  <div>
    <Map v-if="isSignedIn"></Map>
    <SignPage v-else @signIn="signInHandler()"></SignPage>
  </div>
</template>

|
<script>
import Map from './views/Map.vue'
import SignPage from './views/SignPage.vue'

export default {
  components: {
    Map,
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
