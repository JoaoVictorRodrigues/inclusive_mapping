<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div class="mx-72 mt-24">
    <div class="flex justify-start mb-4">
      <h3>Feedback</h3>
    </div>
    <div class="py-4 px-12 bg-white rounded-md shadow-lg">
      <select id="feedOptions" class="bg-white border-none rounded-lg block p-2.5 text-xl">
        <option selected @click="(allOption = true)">All Feedback</option>
        <option @click="changeStatus(false)">Pending Resolution</option>
        <option @click="changeStatus(true)">Resolved Feedback</option>
      </select>
    </div>
    <!-- Feedback List -->
    <div class="bg-white rounded-md shadow-md overflow-hidden">
      <!-- Header -->
      <div class="grid grid-cols-12 py-4 px-12 border border-gray-300 border-collapse">
        <b class="col-span-2 text-left">Id</b>
        <b class="col-span-3 text-left">User</b>
        <b class="col-span-6 text-left">Mensage</b>
      </div>
      <!-- Body -->
      <div>
        <div v-for="u in searchFeedbackByStatus()" :key="u.id">
          <div
            class="grid grid-cols-12 py-6 px-12 border-t border-collapse border-gray-300 items-center"
          >
            <div class="col-span-2 text-left">{{ u.id }}</div>
            <div class="col-span-3 text-left">{{ u.username }}</div>
            <div class="col-span-6 text-left">{{ u.mensage }}</div>
          </div>
        </div>
      </div>
    </div>
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
      // TODO get feedback from API
      feedback: [
        { id: '#B006', username: 'u1@username.com', mensage: 'sda', status: true },
        { id: '2', username: 'u2@username.com', mensage: 'sadasdas', status: true },
        { id: '4', username: 'u4@username.com', mensage: 'asdasdasdasdasdasdasdasdasdasdasdas', status: false },
        { id: '5', username: 'u5@username.com', mensage: 'sadassdasd', status: false },
        { id: '3', username: 'u3@username.com', mensage: 'asdasdasd', status: true },
        { id: '6', username: 'u6@username.com', mensage: 'asda', status: true }
      ],
      allOption: true,
      status: true
    }
  },
  methods: {
    searchFeedbackByStatus() {
      return this.allOption
        ? this.feedback
        : this.feedback.filter((feed) => feed.status === this.status)
    },
    changeStatus(s) {
      this.allOption = false
      this.status = s
    }
  }
}
</script>
