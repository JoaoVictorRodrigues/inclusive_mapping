<template>
  <form action="" class="flex flex-col">
    <p class="text-left">
      A <b>reset link</b> will be sent to your email, please <b>enter your email address below:</b>
    </p>
    <!-- Email -->
    <Field
      f_id="signIn_Email"
      f_label="Email"
      f_type="text"
      f_placeholder="Enter your email"
      f_icon="fa-envelope-o"
    ></Field>
  </form>
  <div>
    <button
      class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
      @click="passwordReset()"
    >
      Send Password Reset Link (Test)
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
    passwordReset() {
      this.$emit('passwordReset')
    },
    gotoSignUp() {
      this.$emit('gotoSignUp')
    }
  }
}
</script>
