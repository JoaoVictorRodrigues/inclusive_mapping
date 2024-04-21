<template>
  <div
    class="h-screen bg-cover bg-no-repeat bg-bottom bg-[url('../../public/images/ISEP_PortoAP9I0151-v3.jpg')]"
  >
    <!-- White Section -->
    <div
      class="flex flex-col justify-evenly top-0 float-right bg-white/90 h-full w-2/5 py-10 px-16 rounded"
    >
      <div class="w-full h-24 flex flex-row justify-between items-center">
        <div class="h-full flex flex-col justify-between items-start">
          <h1 class="text-left">{{ title }}</h1>
          <p v-if="!(pagePath === '/PasswordReset')">Never get lost when in ISEP</p>
        </div>
        <img
          class="w-36 object-cover h-full"
          src="../../../public/images/ISEP_redLogo.jpg"
          alt=""
        />
      </div>
      <router-view
        @signUp="handle_SignUp()"
        @logIn="handle_LogIn()"
        @passwordReset="handle_PasswordReset()"
      />
    </div>
  </div>
</template>

<script>
import Field from '../../components/Field.vue'
import SignUp from './SignUp.vue'
import LogIn from './LogIn.vue'
import PasswordReset from './PasswordReset.vue'

export default {
  components: {
    Field,
    SignUp,
    LogIn,
    PasswordReset
  },
  data() {
    return {}
  },
  beforeMount() {
    this.$router.push({ name: 'LogIn' })
  },
  computed: {
    pagePath() {
      return this.$router.currentRoute.value.fullPath
    },
    title() {
      switch (this.pagePath) {
        case '/':
          return 'Log in'
        case '/SignUp':
          return 'Sign up'
        case '/PasswordReset':
          return 'Reset Password'
        default:
          return ''
      }
    }
  },
  methods: {
    handle_SignUp() {
      // TODO: Sing Up logic here
      this.$emit('logIn')
    },
    handle_LogIn() {
      // TODO: Log In logic here
      this.$emit('logIn')
    },
    handle_PasswordReset() {
      // TODO: Password Reset logic here
      this.$emit('logIn')
    }
  }
}
</script>

<style scoped></style>
