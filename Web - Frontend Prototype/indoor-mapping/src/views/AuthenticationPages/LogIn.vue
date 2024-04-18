<template>
  <form action="" class="flex flex-col">
    <!-- Email -->
    <Field
      f_id="signIn_Email"
      f_label="Email"
      f_type="text"
      f_placeholder="Enter your email"
      f_icon="fa-envelope-o"
    ></Field>
    <!-- Password -->
    <Field
      f_id="signIn_Password"
      f_label="Password"
      f_type="password"
      f_placeholder="Enter your password"
      f_icon="fa-lock"
    ></Field>
    <a class="text-right text-red-800" @click="gotoPasswordReset()">Forgot your password?</a>
  </form>
  <div>
    <button class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold" @click="logIn()">
      Log in (Test)
    </button>
    <p class="m-4">
      Don't have an account? <a class="text-red-800" @click="gotoSignUp()">Sign up</a>
    </p>
  </div>
</template>

<script>
import Field from '../../components/Field.vue'

export default {
  components: {
    Field
  },
  data() {
    return {}
  },
  methods: {
    logIn() {
      this.$emit('logIn')
    },
    gotoPasswordReset() {
      this.$emit('gotoPasswordReset')
    },
    gotoSignUp() {
      this.$emit('gotoSignUp')
    }
  }
}
</script>
