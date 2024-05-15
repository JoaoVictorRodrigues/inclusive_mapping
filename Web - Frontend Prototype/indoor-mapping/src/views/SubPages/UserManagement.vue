<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div class="mx-72 mt-24">
    <div class="flex justify-start mb-4">
      <h3>User Management</h3>
    </div>
    <!-- Add/Edit User -->
    <div class="py-4 px-12 bg-white rounded-md shadow-lg">
      <form action="" class="flex flex-col justify-between">
        <!-- Row 1-->
        <div class="flex flex-row justify-between mb-6">
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
            class="w-full mr-12"
            f_id="userM_Email"
            v-model:f_value="selected.email"
            f_label="Email"
            f_type="text"
            f_placeholder="Enter the user's email"
            f_icon="fa-envelope-o"
          ></Field>
          <!-- Password -->
          <Field
            class="w-full"
            f_id="userM_Password"
            v-model:f_value="selected.password"
            f_label="Password"
            f_type="password"
            f_placeholder="Enter the user's password"
            f_icon="fa-lock"
          ></Field>
        </div>
        <!-- Row 2 -->
        <div class="flex flex-row">
          <div class="form-group flex flex-col mr-12" v-if="selected.index !== -1">
            <label for="">User Type</label>
            <select
              class="custom-select w-full bg-white rounded-md shadow-lg"
              name=""
              id="userS_Type"
              v-model="selected.type"
            >
              <option selected value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div class="form-group flex flex-col mr-12" v-if="selected.index !== -1">
            <label for="">Active User</label>
            <select
              class="custom-select w-full bg-white rounded-md shadow-lg"
              name=""
              id="userS_Active"
              v-model="selected.active"
            >
              <option selected :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </div>
          <div class="form-group flex flex-col">
            <label for="">Accessibility level</label>
            <select
              class="custom-select w-full bg-white rounded-md shadow-lg"
              name=""
              id="userS_AccessibilityLvl"
              v-model.number="selected.AccessibilityLvl"
            >
              <option selected :value="0">0</option>
              <option :value="1">1</option>
              <option :value="2">2</option>
            </select>
          </div>
        </div>
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
        <b class="col-span-2 text-left">Name</b>
        <b class="col-span-3 text-left">Email</b>
        <b class="col-span-1 text-left">User Type</b>
        <b class="col-span-2 text-left">Active</b>
        <b class="col-span-2 text-left">Accessibility Level</b>
        <b class="col-span-2">Actions</b>
      </div>
      <!-- Body -->
      <div>
        <div v-for="(u, uIndex) in users" :key="'user_row' + uIndex">
          <div
            class="grid grid-cols-12 py-6 px-12 border-t border-collapse border-gray-300 items-center"
          >
            <div class="col-span-2 text-left">{{ u.name }}</div>
            <div class="col-span-3 text-left">{{ u.email }}</div>
            <div class="col-span-1 text-left">{{ u.type }}</div>
            <div class="col-span-2 text-left">{{ u.active }}</div>
            <div class="col-span-2 text-left">{{ u.AccessibilityLvl }}</div>
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
        _id: '',
        name: '',
        email: '',
        password: '',
        image: '',
        type: 'user',
        active: true,
        AccessibilityLvl: 0
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    var users = this.users
    await api
      .get('/users', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(async function (response) {
        for (var i = 0; i < response.data.user.length; i++) {
          users.push(response.data.user[i])
        }
        console.log(users[0])
      })
      .catch(async function (error) {
        alert(error)
      })

    //this.users = users
  },
  methods: {
    resetSelected() {
      this.selected = {
        index: -1,
        _id: '',
        name: '',
        email: '',
        password: '',
        image: '',
        type: 'user',
        active: true,
        AccessibilityLvl: 0
      }
    },
    async handleAddOrUpdate() {
      const token = localStorage.getItem('token')
      //TODO add/edit user logic
      if (this.selected.index === -1) {
        var id = ''

        if (this.selected.name == '' || this.selected.email == '' || this.selected.password == '') {
          return alert(
            'Missing fields! Name field, Email field and password field need to be filled.'
          )
        }

        await api
          .post(
            `/users/register`,
            {
              name: this.selected.name,
              email: this.selected.email,
              password: this.selected.password,
              AccessibilityLvl: this.selected.AccessibilityLvl
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(async function (response) {
            console.log(response.data)
            id = response.data.URL.replace('/user/', '')
            console.log(id)
          })
          .catch(async function (error) {
            console.error(error)
            alert(error)
          })

        console.log(id)
        if (id !== '') {
          const user = {
            _id: id,
            name: this.selected.name,
            email: this.selected.email,
            password: this.selected.password,
            image: '',
            type: 'user',
            active: true,
            AccessibilityLvl: this.selected.AccessibilityLvl
          }
          console.log(user)
          this.users.push(user)
        }
      } else {
        if (this.selected.name == '' || this.selected.email == '') {
          return alert('Missing fields! Name field and Email field field need to be filled.')
        }

        this.users[this.selected.index] = {
          ...this.users[this.selected.index],
          _id: this.selected._id,
          name: this.selected.name,
          email: this.selected.email,
          password:
            this.selected.password != ''
              ? this.selected.password
              : this.users[this.selected.index].password,
          image: this.users[this.selected.index].image,
          type: this.selected.type,
          active: this.selected.active,
          AccessibilityLvl: this.selected.AccessibilityLvl
        }

        var users = this.users
        var i = this.selected.index

        await api
          .put(
            `/users/${users[i]._id}`,
            {
              name: users[i].name,
              email: users[i].email,
              password: users[i].password,
              image: users[i].image,
              type: users[i].type,
              active: users[i].active,
              AccessibilityLvl: users[i].AccessibilityLvl
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(async function (res) {
            console.log(res.data.msg)
            console.log(users[i])
          })
          .catch(async function (error) {
            alert(error)
          })
      }
      this.resetSelected()
    },
    handleEdit(i) {
      //TODO edit user logic
      this.selected.index = i
      this.selected._id = this.users[i]._id
      this.selected.name = this.users[i].name
      this.selected.email = this.users[i].email
      this.selected.password = '' //this.users[i].password
      this.selected.image = this.users[i].image
      this.selected.type = this.users[i].type
      this.selected.active = this.users[i].active
      this.selected.AccessibilityLvl = this.users[i].AccessibilityLvl

      console.log(this.users[i].password)
    },
    async handleDelete(i) {
      var user = this.users[i]
      var token = localStorage.getItem('token')

      //TODO delete user logic
      this.users.splice(i, 1)

      await api
        .delete(`/users/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(async function (res) {
          console.log(res.data.message)
        })
        .catch(async function (error) {
          alert(error)
        })
    }
  }
}
</script>
