<template>
  <div
    class="h-screen bg-cover bg-no-repeat bg-bottom bg-[url('../../public/images/ISEP_PortoAP9I0151-v3.jpg')]"
  >
    <!-- White Section -->
    <div class="flex flex-col justify-evenly top-0 float-right bg-white/90 h-full w-2/5 py-10 px-16 rounded">
      <div class="w-full h-20 flex flex-row justify-between items-center">
        <div class="h-full flex flex-col justify-between items-start">
          <h1>Sign up</h1>
          <p>Never get lost when in ISEP</p>
        </div>
        <img class="w-36 object-cover h-full" src="../../public/images/ISEP_redLogo.jpg" alt="" />
      </div>
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
        <button
          class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
          @click="signIn()"
        >
          Sign In (Test)
        </button>
        <p class="m-4">Already have an account? Sign in</p>
      </div>
    </div>
  </div>
</template>

<script>
import Field from '../components/Field.vue'

export default {
  components: {
    Field
  },
  data() {
    return {}
  },
  methods: {
    signIn() {
      this.$emit('signIn')
    }
  }
}
</script>

<style scoped></style>
