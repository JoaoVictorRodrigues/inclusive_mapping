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
          <p v-if="!(page === 'passwordReset')">Never get lost when in ISEP</p>
        </div>
        <img
          class="w-36 object-cover h-full"
          src="../../../public/images/ISEP_redLogo.jpg"
          alt=""
        />
      </div>
      <SignUp
        v-if="page === 'signUp'"
        @signUp="this.$emit('signIn')"
        @gotoLogIn="page = 'logIn'"
      ></SignUp>
      <LogIn
        v-else-if="page === 'logIn'"
        @logIn="this.$emit('signIn')"
        @gotoPasswordReset="page = 'passwordReset'"
        @gotoSignUp="page = 'signUp'"
      ></LogIn>
      <PasswordReset
        v-else-if="page === 'passwordReset'"
        @passwordReset="this.$emit('signIn')"
        @gotoSignUp="page = 'signUp'"
      ></PasswordReset>
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
    return {
      page: 'signUp'
    }
  },
  computed: {
    title() {
      switch (this.page) {
        case 'signUp':
          return 'Sign up'
        case 'logIn':
          return 'Log in'
        case 'passwordReset':
          return 'Reset password'
        default:
          return ''
      }
    }
  },
  methods: {
    signIn() {
      this.$emit('signIn')
    }
  }
}
</script>

<style scoped></style>
