<template>
  <div id="nav" class="w-full h-16 dark:bg-navbarBase flex flex-row">
    <!--NavBar-->
    <div class="flex flex-row">
      <img class="w-32 object-cover h-full" src="../../public/images/ISEP_redLogo.jpg" alt="" />
      <p class="self-center text-white text-base font-bold mr-2">Indoor Mapping</p>
    </div>
    <!--NavBar Buttons-->
    <div class="flex flex-row w-2/4">
      <router-link
        v-for="route in routes"
        :key="route.link.path"
        :to="route.link.path"
        class="mx-5 border-x-4 border-navBarHover px-4 h-full"
      >
        <p class="text-white text-base font-bold">{{ route.label }}</p>
      </router-link>
    </div>
  </div>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          link: this.$router.options.routes.find((route) => route.name === 'Map'),
          label: 'Map Overview'
        },
        {
          link: this.$router.options.routes.find((route) => route.name === 'PathManagement'),
          label: 'Path Management'
        },
        {
          link: this.$router.options.routes.find((route) => route.name === 'Beacons'),
          label: 'Beacon Management'
        },
        {
          link: this.$router.options.routes.find((route) => route.name === 'UserManagement'),
          label: 'User Management'
        }
      ]
    }
  },
  beforeMount() {
    this.$router.push({ name: 'Map' })
  }
}
</script>
