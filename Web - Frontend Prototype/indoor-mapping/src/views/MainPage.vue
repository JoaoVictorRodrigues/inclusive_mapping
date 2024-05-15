<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div id="nav" class="w-full h-16 dark:bg-navbarBase flex flex-row">
    <!--NavBar Title-->
    <div class="basis-1/6 hidden sm:flex sm:flex-row">
      <img class="hidden sm:block w-32 object-cover h-full" src="/images/ISEP_redLogo.jpg" alt="" />
      <p class="hidden lg:block self-center text-white text-base font-bold ml-4">Indoor Mapping</p>
    </div>
    <!--NavBar Buttons-->
    <div class="basis-3/5 flex flex-row w-3/4 sm:w-3/5 items-center justify-start">
      <router-link
        v-for="(route, i) in routes"
        :key="route.link.path"
        :to="route.link.path"
        class="basis-auto border-r-2 border-navBarHover px-4 h-full"
        :class="(route.open ? 'w-60 bg-navBarHover' : 'w-20') + (i === 0 ? ' border-l-2' : '')"
        @click="closeButtonNav(route)"
      >
        <div class="relative flex flex-row items-center justify-center h-full w-full">
          <div class="flex flex-col h-full justify-center relative">
            <i :class="'fa ' + route.icon + ' text-white text-2xl'"></i>
            <i
              v-if="route.open"
              class="fa fa-caret-up text-white text-2xl absolute -bottom-3 w-full"
            ></i>
          </div>
          <p
            v-if="route.open"
            class="hidden sm:block justify-self-center text-white text-base font-bold ml-4"
          >
            {{ route.label }}
          </p>
        </div>
      </router-link>
    </div>
    <!--NavBar Profile-->
    <div
      class="basis-1/5 items-center justify-start"
      :class="profile.open ? 'bg-navBarHover' : 'bg-navbarBase'"
    >
      <router-link
        class="relative flex flex-row-reverse items-center justify-start h-full w-full"
        :to="profile.link.path"
        @click="closeRoutes()"
      >
        <!--Image-->
        <div class="flex flex-col h-full justify-center relative">
          <img
            class="w-12 h-12 p-1 rounded-full justify-self-center mx-2"
            src="/public/images/default_avatar.png"
            alt=""
          />
          <i
            v-if="profile.open"
            class="fa fa-caret-up text-white text-2xl absolute -bottom-3 w-full"
          ></i>
        </div>
        <p class="justify-self-center text-white text-base font-bold mr-4">
          Logged In {{ this.username }}
        </p>
      </router-link>
    </div>
  </div>
  <router-view />
</template>

<script>
import api from '../views/API/api'

export default {
  data() {
    return {
      routes: [
        {
          link: this.$router.options.routes.find((route) => route.name === 'Map'),
          label: 'Map Overview',
          icon: 'fa-map',
          open: false
        },
        {
          link: this.$router.options.routes.find((route) => route.name === 'PathManagement'),
          label: 'Path Management',
          icon: 'fork fa-code-fork',
          open: false
        },
        {
          link: this.$router.options.routes.find((route) => route.name === 'Beacons'),
          label: 'Beacon Management',
          icon: 'fa-podcast',
          open: false
        },
        {
          link: this.$router.options.routes.find((route) => route.name === 'UserManagement'),
          label: 'User Management',
          icon: 'fa-users',
          open: false
        },
        {
          link: this.$router.options.routes.find((route) => route.name === 'Feedback'),
          label: 'Feedback',
          icon: 'fa-comments',
          open: false
        }
      ],
      profile: {
        link: this.$router.options.routes.find((route) => route.name === 'UserProfile'),
        label: 'User Profile',
        icon: 'fa-users',
        open: false
      },
      username: ''
    }
  },
  methods: {
    closeButtonNav(route) {
      this.routes.forEach((element) => {
        if (element.label != route.label) {
          element.open = false
        } else {
          element.open = true
        }
      })
      this.profile.open = false
    },
    closeRoutes() {
      this.routes.forEach((element) => (element.open = false))
      this.profile.open = true
    },
    async getUserInfo() {
      const token = localStorage.getItem('token')
      const userID = localStorage.getItem('userID')
      const r = this

      await api
        .get(`/users/${userID}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(async function (response) {
          console.log(response.data)
          var name = response.data.user.name
          localStorage.setItem('username', response.data.user.name)
          localStorage.setItem('email', response.data.user.email)
          console.log(name)
          r.userName = response.data.user.name
        })
        .catch(async function (error) {
          alert(error)
        })
    }
  },
  beforeMount() {
    this.$router.push({ name: 'Map' })
    this.routes.find((route) => route.link.name === 'Map').open = true
  },
  mounted() {
    if (localStorage.getItem('username') === null || localStorage.getItem('email') === null) {
      this.getUserInfo()
    } else {
      this.username = localStorage.getItem('username')
    }
    //this.getUserInfo()
  },
  updated() {
    //this.username = localStorage.getItem('username')
  }
}
</script>
