<template>
  <form action="" class="flex flex-col">
    <!-- Name -->
    <Field
      f_id="signIn_Name"
      f_label="Name"
      f_type="text"
      f_placeholder="Enter your name"
      f_icon="fa-user-circle"
    ></Field>
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
    <!-- Confirm Password -->
    <Field
      f_id="signIn_ConfirmPassword"
      f_label="Confirm Password"
      f_type="password"
      f_placeholder="Confirm your password"
      f_icon="fa-lock"
    ></Field>
  </form>
  <div>
    <button class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold" @click="signUp()">
      Sign Up (Test)
    </button>
    <p class="m-4">
      Already have an account? <a class="text-red-800" @click="gotoLogIn()">Log in</a>
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
    signUp() {
      this.$emit('signUp')
    },
    gotoLogIn() {
      this.$emit('gotoLogIn')
    }
  }
}
</script>
