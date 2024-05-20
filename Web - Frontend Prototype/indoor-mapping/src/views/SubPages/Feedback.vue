<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div class="mx-72 mt-24">
    <div class="flex justify-start mb-4">
      <h3>Feedback</h3>
    </div>
    <div class="flex flex-row py-4 px-12 bg-white rounded-md justify-start items-center">
      <select id="feedOptions" class="bg-white border-none rounded-lg block p-2.5 text-xl">
        <option selected @click="allOption = true">All Feedback</option>
        <option @click="changeStatus(false)">Pending Resolution</option>
        <option @click="changeStatus(true)">Resolved Feedback</option>
      </select>
      <button
        class="w-10 h-full rounded-md p-2 text-black font-bold text justify-self-end"
        :class="ascend ? 'fa fa-sort-amount-desc' : 'fa fa-sort-amount-asc'"
        @click="changeSortingOrder()"
      ></button>
    </div>
    <!-- Feedback List -->
    <div class="bg-white rounded-md shadow-md overflow-hidden">
      <!-- Header -->
      <div class="grid grid-cols-12 py-4 px-12 border border-gray-300 border-collapse">
        <b class="col-span-2 text-left">Id</b>
        <b class="col-span-3 text-left">User</b>
        <b class="col-span-5 text-left">Comment</b>
        <b class="col-span-1 text-left">Resolved</b>
      </div>
      <!-- Body -->
      <div>
        <div v-for="(u, id) in sortFeedbackList()" :key="u.id">
          <div
            class="grid grid-cols-12 py-6 px-12 border-t border-collapse border-gray-300 items-center"
          >
            <div class="col-span-2 text-left underline text-blue-600">N{{ id }}</div>
            <div class="col-span-3 text-left">{{ getCommentUser(u.userID).name }}</div>
            <div class="col-span-5 text-left">{{ u.comment }}</div>
            <div class="col-span-1 text-left">{{ u.resolved ? 'Yes' : 'No' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../API/api'

export default {
  data() {
    return {
      // TODO get feedback from API
      feedback: [],
      users: [],
      allOption: true,
      resolved: true,
      ascend: true
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    var feedback = this.feedback
    var users = this.users

    await api
      .get('/userInput', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(function (response) {
        console.log(response.data)
        for (var i = 0; i < response.data.userInput.length; i++) {
          if (response.data.userInput[i].type === 'Feedback') {
            feedback.push(response.data.userInput[i])
          }
        }
      })
      .catch(function (error) {
        alert(error)
      })

    await api
      .get('/users', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(function (response) {
        console.log(response.data)
        for (var i = 0; i < response.data.user.length; i++) {
          users.push(response.data.user[i])
        }
      })
      .catch(function (error) {
        alert(error)
      })
  },
  methods: {
    searchFeedbackByStatus() {
      return this.allOption
        ? this.feedback
        : this.feedback.filter((feed) => feed.resolved === this.resolved)
    },
    sortFeedbackList() {
      var list = this.searchFeedbackByStatus()

      if (this.ascend) {
        return list.sort((a, b) => (a.weight < b.weight ? 1 : -1))
      } else {
        return list.sort((a, b) => (a.weight > b.weight ? 1 : -1))
      }
    },
    changeStatus(s) {
      this.allOption = false
      this.resolved = s
    },
    getCommentUser(id) {
      return this.users.find((user) => user.userID === id)
    },
    changeSortingOrder() {
      this.ascend = !this.ascend
    }
  }
}
</script>
