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
    <!--Acessibility level-->
    <div class="form-group">
      <label for="userAccessibilityLvl">Accessibility Level</label>
      <select
        class="form-control"
        name=""
        id="userAccessibilityLvl"
        v-model="input.AccessibilityLvl"
      >
        <option selected :value="0">No disability</option>
        <option :value="1">Visual disability</option>
        <option :value="2">Motor disability</option>
      </select>
    </div>
  </form>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
    <button class="w-full rounded-md mt-8 p-2 bg-red-700 text-white font-bold" @click="Register">
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
//import func from 'vue-editor-bridge'
import Field from '../../components/Field.vue'
import api from '../API/api'
//import LogIn from './LogIn.vue';

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
        passwordConfirm: '',
        AccessibilityLvl: 0
      },
      route_logIn: this.$router.options.routes.find((route) => route.name === 'LogIn')
    }
  },
  methods: {
    async Register() {
      console.log(this.input)
      if (
        this.input.name === '' ||
        this.input.email === '' ||
        this.input.password === '' ||
        this.input.passwordConfirm === ''
      )
        return alert('You need to fill up the form')

      if (this.input.password != this.input.passwordConfirm)
        return alert('Confirm Password is diferent from Password')

      console.log(this.input)

      var user = this.input
      var r = this
      await api
        .post(
          '/users/register',
          {
            name: user.name,
            email: user.email,
            password: user.password,
            AccessibilityLvl: user.AccessibilityLvl
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        )
        .then(async function (res) {
          console.log(res.data)
          r.login()
        })
        .catch(async function (error) {
          alert(error)
        })
    },
    async login() {
      var change = this.$emit
      var name = this.input.name
      var email = this.input.email

      await api
        .post(
          '/users/login',
          {
            email: this.input.email,
            password: this.input.password
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        )
        .then(async function (response) {
          localStorage.setItem('token', response.data.accessToken)
          localStorage.setItem('userID', response.data.id)
          localStorage.setItem('type', response.data.type)
          localStorage.setItem('username', name)
          localStorage.setItem('email', email)
          change('logIn')
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>
