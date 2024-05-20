<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <form action="" class="flex flex-col">
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
      @click="handleLogin()"
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
import api from '../API/api'
//import axios from 'axios'

export default {
  components: {
    Field
  },
  data() {
    return {
      input: {
        email: '',
        password: ''
      },
      route_SignUp: this.$router.options.routes.find((route) => route.name === 'SignUp'),
      route_PasswordReset: this.$router.options.routes.find(
        (route) => route.name === 'PasswordReset'
      )
    }
  },
  methods: {
    async handleLogin() {
      const email = this.input.email //'admin@email.com' //this.input.email
      const password = this.input.password //'Admin' //this.input.password
      //const change = this.$emit
      const getUserData = this.GetUserData

      console.log('Loading')
      //Cheack if fields are not empty
      if (email !== '' && password !== '') {
        await api
          .post(
            '/users/login',
            {
              email: email,
              password: password
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              }
            }
          )
          .then(async function (response) {
            //localStorage.clear()
            /* localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('userID', response.data.id)
            localStorage.setItem('type', response.data.type)
            localStorage.setItem('password', password)*/
            getUserData(response.data.accessToken, response.data.id, password)
            //change('logIn')
          })
          .catch(function (error) {
            alert(error)
          })
      } else {
        alert('Missing fields! Fill them all in!')
      }
      //Test login
      //teste@email.com
      //teste
    },
    async GetUserData(token, userID, password) {
      const change = this.$emit

      //Get user data
      await api
        .get(`/users/${userID}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(async function (res) {
          localStorage.setItem('token', token)
          localStorage.setItem('userID', res.data.user.id)
          localStorage.setItem('type', res.data.user.type)
          localStorage.setItem('password', password)
          localStorage.setItem('username', res.data.user.name)
          localStorage.setItem('email', res.data.user.email)
          change('logIn')
        })
    }
  }
}
</script>
