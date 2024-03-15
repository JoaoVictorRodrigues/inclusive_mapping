<template>
  <div v-if="!showSideBar">
    <button id="showSideBarBtn" @click="handleSideBar()">MENU</button>
  </div>
  <div v-else id="sideBar">
    <div class="flexFull">
      <button id="hideSideBarBtn" @click="handleSideBar()">></button>
      <div id="sideBarContent" class="flexFull">
        <!-- Just to show some content inside the sidebar (demo-only) -->
        <DemoContainer :showDescription="true"></DemoContainer>
      </div>
    </div>
  </div>
</template>

<script>
import DemoContainer from './DemoContainer.vue'

export default {
  components: {
    DemoContainer
  },
  data() {
    return {
      showSideBar: false
    }
  },
  methods: {
    handleSideBar() {
      this.showSideBar = !this.showSideBar
    }
  }
}
</script>
