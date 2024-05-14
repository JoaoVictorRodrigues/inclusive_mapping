<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div class="mx-72 mt-24">
    <div class="flex justify-start mb-4">
      <h3>User Management</h3>
    </div>
    <!-- Add/Edit User -->
    <div class="py-4 px-12 bg-white rounded-md shadow-lg">
      <form action="" class="flex flex-row justify-between">
        <!-- Name -->
        <Field
          class="w-full mr-12"
          f_id="userM_Name"
          v-model:f_value="selected.name"
          f_label="Name"
          f_type="text"
          f_placeholder="Enter the user's name"
          f_icon="fa-user-circle"
        ></Field>
        <!-- Email -->
        <Field
          class="w-full"
          f_id="userM_Email"
          v-model:f_value="selected.email"
          f_label="Email"
          f_type="text"
          f_placeholder="Enter the user's email"
          f_icon="fa-envelope-o"
        ></Field>
      </form>
      <div class="flex flex-row justify-end">
        <!-- Add User Button -->
        <button
          class="w-36 rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
          @click="handleAddOrUpdate()"
        >
          {{ (selected.index === -1 ? 'Add' : 'Update') + ' User' }}
        </button>
        <button
          v-if="selected.index !== -1"
          class="w-24 rounded-md mt-8 p-2 ml-6 bg-gray-400 text-white font-bold"
          @click="resetSelected()"
        >
          Cancel
        </button>
      </div>
    </div>
    <!-- Users List -->
    <div class="my-8 mx-8 bg-white rounded-md shadow-md overflow-hidden">
      <!-- Header -->
      <div class="grid grid-cols-12 py-4 px-12 border border-gray-300 border-collapse">
        <b class="col-span-5 text-left">Name</b>
        <b class="col-span-5 text-left">Email</b>
        <b class="col-span-2">Actions</b>
      </div>
      <!-- Body -->
      <div>
        <div v-for="(u, uIndex) in users" :key="'user_row' + uIndex">
          <div
            class="grid grid-cols-12 py-6 px-12 border-t border-collapse border-gray-300 items-center"
          >
            <div class="col-span-5 text-left">{{ u.name }}</div>
            <div class="col-span-5 text-left">{{ u.email }}</div>
            <div class="col-span-2">
              <button class="p-1 text-gray-400 text-2xl mr-4" @click="handleEdit(uIndex)">
                <i class="fa fa-pencil"></i>
              </button>
              <button
                class="p-1 text-2xl"
                :class="selected.index !== -1 ? 'text-red-200' : 'text-red-700'"
                @click="handleDelete(uIndex)"
                :disabled="selected.index !== -1"
              >
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import Field from '../../components/Field.vue'
import api from '../API/api'

export default {
  components: {
    Field
  },
  data() {
    return {
      // TODO get users from API
      users: [],
      selected: {
        index: -1,
        name: '',
        email: ''
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    var users = this.users
    api
      .get('/users', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(function (response) {
        for (var i = 0; i < response.data.user.length; i++) {
          users.push(response.data.user[i])
        }
        //console.log(users)
      })
      .catch(function (error) {
        alert(error)
      })

    //this.users = users
  },
  methods: {
    resetSelected() {
      this.selected = {
        index: -1,
        name: '',
        email: ''
      }
    },
    handleAddOrUpdate() {
      //TODO add/edit user logic
      if (this.selected.index === -1) {
        this.users.push({ name: this.selected.name, email: this.selected.email })
      } else {
        this.users[this.selected.index] = {
          ...this.users[this.selected.index],
          name: this.selected.name,
          email: this.selected.email
        }
        const token = localStorage.getItem('token')
        var users = this.users
        var i = this.selected.index

        api
          .put(
            `/users/${users[i]._id}`,
            {
              name: users[i].name,
              email: users[i].email
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(function (res) {
            console.log(res.data.msg)
          })
          .catch(function (error) {
            alert(error)
          })
      }
      this.resetSelected()
    },
    handleEdit(i) {
      //TODO edit user logic
      this.selected.index = i
      this.selected.name = this.users[i].name
      this.selected.email = this.users[i].email
    },
    handleDelete(i) {
      var user = this.users[i]
      var token = localStorage.getItem('token')

      //TODO delete user logic
      this.users.splice(i, 1)

      console.log(user)
      api
        .delete(`/users/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(function (res) {
          console.log(res.data.message)
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>
