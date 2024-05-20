<template>
  <div class="mx-72 mt-24">
    <div class="flex justify-start mb-4">
      <h3>User Profile</h3>
    </div>
    <!-- Edit User -->
    <div class="py-4 px-12 bg-white rounded-md shadow-lg">
      <!--title-->
      <h4 class="text-left text-2xl border-b-2 mb-4 pb-1">Personal Information</h4>
      <!--Form-->
      <form action="" class="grid grid-cols-3 gap-x-12 justify-between items-center">
        <!--Image-->
        <div class="relative row-span-2 w-full h-full overflow-hiddenrounded-full">
          <img
            class="w-48 h-48 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            :src="hasImg ? this.img : this.defImg"
            alt=""
          />
        </div>
        <!-- Name -->
        <Field
          class="w-full mr-12"
          f_id="userM_Name"
          v-model:f_value="profileInfo.name"
          f_label="Full Name"
          f_type="text"
          f_placeholder="Enter the user's name"
          f_icon="fa-user-circle"
          :f_disabled="this.edit"
        ></Field>
        <!-- Email -->
        <Field
          class="w-full"
          f_id="userM_Email"
          v-model:f_value="profileInfo.email"
          f_label="Email Address"
          f_type="text"
          f_placeholder="Enter the user's email"
          f_icon="fa-envelope-o"
          :f_disabled="this.edit"
        ></Field>
        <!-- Password -->
        <Field
          f_id="signIn_Password"
          v-model:f_value="profileInfo.password"
          f_label="Password"
          f_type="password"
          f_placeholder="Enter your password"
          f_icon="fa-lock"
          :f_disabled="this.edit"
        ></Field>
      </form>
      <div class="flex flex-row justify-end">
        <!-- Add User Button -->
        <div v-if="this.edit">
          <button
            class="w-24 rounded-md mt-8 p-2 ml-6 bg-red-700 text-white font-bold"
            @click="startInfoChange"
          >
            Edit
          </button>
        </div>
        <div v-else>
          <button
            class="w-24 rounded-md mt-8 p-2 bg-gray-400 text-white font-bold"
            @click="cancelInfoChange"
          >
            Cancel
          </button>
          <button
            class="w-24 rounded-md mt-8 p-2 ml-6 bg-red-700 text-white font-bold"
            @click="saveUserChanges"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <!--Others-->
    <div class="grid grid-cols-2 gap-x-12 justify-between items-stretch">
      <!--Reset Password
      <div class="mt-12 py-4 px-12 bg-white rounded-md shadow-lg">
        title
        <h4 class="text-left text-2xl border-b-2 mb-4 pb-1">Reset Password</h4>
        Info
        <div class="flex flex-row justify-between items-start">
          <p class="basis-3/5 text-start">
            An email will be sent to your account with the link to change your password.
          </p>
          <button class="basis-2/5 w-24 rounded-md p-2 bg-red-700 text-white font-bold">
            Send link
          </button>
        </div>
      </div>-->
      <!--Delete User-->
      <div class="mt-12 py-4 px-12 bg-white rounded-md shadow-lg">
        <!--title-->
        <h4 class="text-left text-2xl border-b-2 mb-4 pb-1">Delete User</h4>
        <!--Info-->
        <div class="flex flex-row justify-between items-start">
          <p class="basis-3/5 text-start">
            Deleting your account permanently remove all your data and it cannot be reversed.
          </p>
          <div class="flex flex-row justify-between items-start">
            <button
              v-if="!this.deleteUser"
              class="basis-2/5 w-24 rounded-md p-2 bg-red-700 text-white font-bold text"
              @click="this.deleteUser = true"
            >
              Delete Account
            </button>
            <button
              v-if="this.deleteUser"
              class="basis-2/5 w-24 rounded-md p-2 bg-red-700 text-white font-bold text mr-6"
              @click="DeleteAcount"
            >
              Are You sure
            </button>
            <button
              v-if="this.deleteUser"
              class="basis-2/5 w-24 rounded-md p-2 bg-gray-700 text-black font-bold text"
              @click="this.deleteUser = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Field from '../../components/Field.vue'
import api from '../API/api'

export default {
  components: {
    Field
  },
  data() {
    return {
      hasImg: false,
      defImg: '/images/default_avatar.png',
      img: '',
      profileInfo: { name: '', email: '', password: '' },
      previousInfo: null,
      edit: true,
      deleteUser: false
    }
  },
  mounted() {
    this.profileInfo.name = localStorage.getItem('username')
    this.profileInfo.email = localStorage.getItem('email')
    this.profileInfo.password = localStorage.getItem('password')
  },
  methods: {
    startInfoChange() {
      this.edit = !this.edit
      this.previousInfo = JSON.parse(JSON.stringify(this.profileInfo))
    },
    cancelInfoChange() {
      this.edit = !this.edit
      this.profileInfo = JSON.parse(JSON.stringify(this.previousInfo))
    },
    async saveUserChanges() {
      if (
        this.previousInfo.name === '' ||
        this.previousInfo.email === '' ||
        this.previousInfo.password === '' ||
        this.previousInfo.name === ' ' ||
        this.previousInfo.email === ' '
      )
        return alert("You can't have empty fields.")

      if (JSON.stringify(this.previousInfo) !== JSON.stringify(this.profileInfo)) {
        var response = await this.saveUser()
        console.log(response)

        localStorage.setItem('email', this.profileInfo.email)
        localStorage.setItem('username', this.profileInfo.name)

        this.edit = !this.edit
      } else {
        alert('Same values!!')
      }
    },
    async saveUser() {
      const token = localStorage.getItem('token')
      const userID = localStorage.getItem('userID')

      await api
        .put(
          `/users/${userID}`,
          {
            name: this.profileInfo.name,
            email: this.profileInfo.email
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(function (response) {
          console.log(response)
          return response.data.msg
        })
        .catch(function (error) {
          return alert(error)
        })
    },
    async DeleteAcount() {
      //Variables
      const id = localStorage.getItem('userID')
      const token = localStorage.getItem('token')

      //Call api
      await api
        .delete(`/users/${id}`, {
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
          return alert(error)
        })

      localStorage.clear()
      //this.$router.push('/')
      window.location.href = '/'
    }
  }
}
</script>
