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
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
    <button
      class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
      @click="$emit('passwordReset')"
    >
      Send Password Reset Link (Test)
    </button>
    <p class="m-4">
      Don't have an account?
      <router-link class="text-red-800" :key="route_SignUp.path" :to="route_SignUp.path">
        Sign up
      </router-link>
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
    return {
      route_SignUp: this.$router.options.routes.find((route) => route.name === 'SignUp')
    }
  }
}
</script>
