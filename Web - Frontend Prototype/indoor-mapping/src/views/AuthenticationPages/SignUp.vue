<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <form action="" class="flex flex-col">
    <!-- Name -->
    <Field
      f_id="signIn_Name"
      v-model:f_value="input.name"
      f_label="Name"
      f_type="text"
      f_placeholder="Enter your name"
      f_icon="fa-user-circle"
    ></Field>
    <!-- Email -->
    <Field
      f_id="signIn_Email"
      v-model:f_value="input.email"
      f_label="Email"
      f_type="text"
      f_placeholder="Enter your email"
      f_icon="fa-envelope-o"
    ></Field>
    <!-- Password -->
    <Field
      f_id="signIn_Password"
      v-model:f_value="input.password"
      f_label="Password"
      f_type="password"
      f_placeholder="Enter your password"
      f_icon="fa-lock"
    ></Field>
    <!-- Confirm Password -->
    <Field
      f_id="signIn_ConfirmPassword"
      v-model:f_value="input.passwordConfirm"
      f_label="Confirm Password"
      f_type="password"
      f_placeholder="Confirm your password"
      f_icon="fa-lock"
    ></Field>
  </form>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
    <button
      class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
      @click="$emit('signUp')"
    >
      Sign Up (Test)
    </button>
    <p class="m-4">
      Already have an account?
      <router-link class="text-red-800" :key="route_logIn.path" :to="route_logIn.path">
        Log in
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
      input: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      route_logIn: this.$router.options.routes.find((route) => route.name === 'LogIn')
    }
  }
}
</script>
