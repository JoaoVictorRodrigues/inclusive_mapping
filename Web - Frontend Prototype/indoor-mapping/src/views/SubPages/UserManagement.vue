<template>
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
          f_label="Name"
          f_type="text"
          f_placeholder="Enter the user's name"
          f_icon="fa-user-circle"
        ></Field>
        <!-- Email -->
        <Field
          class="w-full"
          f_id="userM_Email"
          f_label="Email"
          f_type="text"
          f_placeholder="Enter the user's email"
          f_icon="fa-envelope-o"
        ></Field>
      </form>
      <div class="flex flex-row justify-end">
        <!-- Add User Button -->
        <button
          class="w-48 rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
          @click="$emit('logIn')"
        >
          Add User (Test)
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
              <button class="p-1 text-gray-400 text-2xl mr-4" @click="handleEdit()">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="p-1 text-red-700 text-2xl" @click="handleDelete()">
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
import Field from '../../components/Field.vue'

export default {
  components: {
    Field
  },
  data() {
    return {
      // TODO get users from API
      users: [
        { name: 'FirstName User1 LastName', email: 'u1@email.com' },
        { name: 'FirstName User2 LastName', email: 'u2@email.com' },
        { name: 'FirstName User3 LastName', email: 'u3@email.com' },
        { name: 'FirstName User4 LastName', email: 'u4@email.com' },
        { name: 'FirstName User5 LastName', email: 'u5@email.com' },
        { name: 'FirstName User6 LastName', email: 'u6@email.com' }
      ]
    }
  },
  methods: {
    handleEdit() {
      //TODO edit user logic
    },
    handleDelete() {
      //TODO delete user logic
    }
  }
}
</script>
