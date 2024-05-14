<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div class="mx-72 mt-24">
    <div class="flex justify-start mb-4">
      <h3>Beacon Management</h3>
    </div>
    <!-- Add/Edit Beacon -->
    <div class="py-4 px-12 bg-white rounded-md shadow-lg">
      <form action="" class="flex flex-row justify-between">
        <!-- Name -->
        <Field
          class="w-64"
          f_id="beaconM_Name"
          v-model:f_value="selected.name"
          f_label="Name"
          f_type="text"
          f_placeholder="Beacon's name"
          f_icon="fa-tag"
        ></Field>
        <!-- Building -->
        <Field
          class="w-12"
          f_id="beaconM_Building"
          v-model:f_value="selected.email"
          f_label="Building"
          f_type="text"
        ></Field>
        <!-- Floor -->
        <Field
          class="w-12"
          f_id="beaconM_Floor"
          v-model:f_value="selected.email"
          f_label="Floor"
          f_type="text"
        ></Field>
        <!-- Location -->
        <Field
          class="w-48"
          f_id="beaconM_Location"
          v-model:f_value="selected.email"
          f_label="Location"
          f_type="text"
          f_placeholder="Hallway / Stairs / Elevator"
        ></Field>
        <!-- Number -->
        <Field
          class="w-24"
          f_id="beaconM_Number"
          v-model:f_value="selected.email"
          f_label="Number"
          f_type="text"
        ></Field>
        <!-- Coords -->
        <Field
          class="w-64"
          f_id="beaconM_Coords"
          v-model:f_value="selected.email"
          f_label="Coordinates"
          f_type="text"
          f_placeholder="41.17XXXX, -8.60XXXX"
          f_icon="fa-map-marker"
        ></Field>
        <!-- Generated ID -->
        <Field
          class="w-36"
          f_id="beaconM_GeneratedID"
          v-model:f_value="selected.email"
          f_label="Generated ID"
          f_type="text"          
          f_placeholder="YXF-W00X"
          f_icon="fa-lock"
        ></Field>
      </form>
      <div class="flex flex-row justify-end">
        <!-- Add Beacon Button -->
        <button
          class="w-36 rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
          @click="handleAddOrUpdate()"
        >
          {{ (selected.index === -1 ? 'Add' : 'Update') + ' Beacon' }}
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
    <!-- Beacons List -->
    <div class="my-8 mx-8 bg-white rounded-md shadow-md overflow-hidden">
      <!-- Header -->
      <div class="grid grid-cols-12 py-4 px-12 border border-gray-300 border-collapse">
        <b class="col-span-3 text-left">Name</b>
        <b class="col-span-2 text-left">ID</b>
        <b class="col-span-1 text-left">Building</b>
        <b class="col-span-2 text-left">Location</b>
        <b class="col-span-2 text-left">Status</b>
        <b class="col-span-1">Actions</b>
      </div>
      <!-- Body -->
      <div>
        <div v-for="(u, uIndex) in beacons" :key="'beacon_row' + uIndex">
          <div
            class="grid grid-cols-12 py-6 px-12 border-t border-collapse border-gray-300 items-center"
          >
            <div class="col-span-3 text-left">{{ u.name }}</div>
            <div class="col-span-2 text-left">{{ "B1F_S001" }}</div>
            <div class="col-span-1 text-left">{{ "B" }}</div>
            <div class="col-span-2 text-left">{{ "Stairs" }}</div>
            <div class="col-span-2 text-left">{{ "Active" }}</div>
            <div class="col-span-1">
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
import Field from '../../components/Field.vue'

export default {
  components: {
    Field
  },
  data() {
    return {
      // TODO get beacons from API
      beacons: [
        { name: 'FirstName Beacon1 LastName', email: 'u1@email.com' },
        { name: 'FirstName Beacon2 LastName', email: 'u2@email.com' },
        { name: 'FirstName Beacon3 LastName', email: 'u3@email.com' },
        { name: 'FirstName Beacon4 LastName', email: 'u4@email.com' },
        { name: 'FirstName Beacon5 LastName', email: 'u5@email.com' },
        { name: 'FirstName Beacon6 LastName', email: 'u6@email.com' }
      ],
      selected: {
        index: -1,
        name: '',
        email: ''
      }
    }
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
      //TODO add/edit beacon logic
      if (this.selected.index === -1) {
        this.beacons.push({ name: this.selected.name, email: this.selected.email })
      } else {
        this.beacons[this.selected.index] = {
          ...this.beacons[this.selected.index],
          name: this.selected.name,
          email: this.selected.email
        }
      }
      this.resetSelected()
    },
    handleEdit(i) {
      //TODO edit beacon logic
      this.selected.index = i
      this.selected.name = this.beacons[i].name
      this.selected.email = this.beacons[i].email
    },
    handleDelete(i) {
      //TODO delete beacon logic
      this.beacons.splice(i, 1)
    }
  }
}
</script>
