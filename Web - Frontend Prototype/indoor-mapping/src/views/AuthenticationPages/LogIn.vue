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
    <p class="text-right text-red-800">
      <router-link :key="route_PasswordReset.path" :to="route_PasswordReset.path">
        Forgot your password?
      </router-link>
    </p>
  </form>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
    <button
      class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
      @click="$emit('logIn')"
    >
      Log in (Test)
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
      route_SignUp: this.$router.options.routes.find((route) => route.name === 'SignUp'),
      route_PasswordReset: this.$router.options.routes.find(
        (route) => route.name === 'PasswordReset'
      )
    }
  }
}
</script>
