<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div id="nav" class="w-full h-16 dark:bg-navbarBase flex flex-row">
    <!--NavBar-->
    <div class="flex flex-row">
      <img
        class="hidden sm:block w-32 object-cover h-full"
        src="../../public/images/ISEP_redLogo.jpg"
        alt=""
      />
      <p class="hidden lg:block self-center text-white text-base font-bold mr-2">Indoor Mapping</p>
    </div>
    <!--NavBar Buttons-->
    <div class="flex flex-row w-3/4 sm:w-3/5">
      <router-link
        v-for="route in routes"
        :key="route.link.path"
        :to="route.link.path"
        class="basis-auto mx-4 border-x-4 border-navBarHover px-4 h-full"
        :class="route.open ? 'w-60' : 'w-20'"
        @click="closeButtonNav(route)"
      >
        <div class="relative flex flex-row items-center h-full w-full">
          <i :class="'fa ' + route.icon + ' fieldIcon '"></i>
          <p
            v-if="route.open"
            class="hidden sm:block justify-self-center text-white text-base font-bold ml-10"
          >
            {{ route.label }}
          </p>
        </div>
      </router-link>
    </div>
    <!--NavBar Profile-->
    <div class="flex flex-row justify-self-end">
      <router-link :to="profile.link.path" @click="closeRoutes()">
        <div class="relative flex flex-row items-center h-full w-full">
          <i class="fa fa-user-circle fieldIcon"></i>
          <p class="hidden sm:block justify-self-center text-white text-base font-bold ml-10">
            {{ profile.label }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
</template>

<script>
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
        }
      ],
      profile: {
        link: this.$router.options.routes.find((route) => route.name === 'UserProfile'),
        label: 'User Profile',
        icon: 'fa-users'
      }
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
    },
    closeRoutes() {
      this.routes.forEach((element) => (element.open = false))
    }
  },
  beforeMount() {
    this.$router.push({ name: 'Map' })
    this.routes.find((route) => route.link.name === 'Map').open = true
  }
}
</script>
