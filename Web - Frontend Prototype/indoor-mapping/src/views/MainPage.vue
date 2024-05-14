<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div id="nav" class="w-full h-16 dark:bg-navbarBase flex flex-row">
    <!--NavBar Title-->
    <div class="basis-1/6 hidden sm:flex sm:flex-row">
      <img class="hidden sm:block w-32 object-cover h-full" src="/images/ISEP_redLogo.jpg" alt="" />
      <p class="hidden lg:block self-center text-white text-base font-bold mr-2">Indoor Mapping</p>
    </div>
    <!--NavBar Buttons-->
    <div class="basis-3/5 flex flex-row w-3/4 sm:w-3/5 items-center justify-start">
      <router-link
        v-for="route in routes"
        :key="route.link.path"
        :to="route.link.path"
        class="basis-auto mx-4 border-x-4 border-navBarHover px-4 h-full"
        :class="route.open ? 'w-60 bg-navBarHover' : 'w-20'"
        @click="closeButtonNav(route)"
      >
        <div class="relative flex flex-row items-center justify-start h-full w-full">
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
        <img
          class="w-12 h-12 p-1 rounded-full justify-self-center mr-2"
          src="/images/default_avatar.png"
          alt=""
        />
        <p class="justify-self-center text-white text-base font-bold mr-4">Name</p>
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
        icon: 'fa-users',
        open: false
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
      this.profile.open = false
    },
    closeRoutes() {
      this.routes.forEach((element) => (element.open = false))
      this.profile.open = true
    }
  },
  beforeMount() {
    this.$router.push({ name: 'Map' })
    this.routes.find((route) => route.link.name === 'Map').open = true
  }
}
</script>
