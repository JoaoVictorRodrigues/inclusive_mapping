<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div class="mx-72 mt-24">
    <div class="flex justify-start mb-4">
      <h3>Beacon Management</h3>
    </div>
    <!-- Add/Edit Beacon -->
    <div class="py-4 px-12 bg-white rounded-md shadow-lg">
      <form action="" class="flex flex-row justify-between">
        <!-- Location -->
        <Field
          class="w-48"
          f_id="beaconM_Location"
          v-model:f_value="selected.locationType"
          f_label="Location"
          f_type="text"
          f_placeholder="Hallway / Stairs / Elevator"
        ></Field>
        <!-- Cordenadas X -->
        <Field
          class="w-48"
          f_id="beaconM_PositionX"
          v-model:f_value="selected.position[0]"
          f_label="Coordinates X"
          f_type="number"
          f_placeholder="0"
        ></Field>
        <!-- Cordenadas Y -->
        <Field
          class="w-48"
          f_id="beaconM_PositionY"
          v-model:f_value="selected.position[1]"
          f_label="Coordinates Y "
          f_type="number"
          f_placeholder="0"
        ></Field>
        <!-- Floor -->
        <Field
          class="w-12"
          f_id="beaconM_Floor"
          v-model:f_value="selected.floor"
          f_label="Floor"
          f_type="number"
        ></Field>
        <!-- in Door-->
        <div class="form-group flex flex-col">
          <label for="beacon_InDoor">In Door</label>
          <select class="form-control" name="" id="beacon_InDoor" v-model="selected.inDoor">
            <option selected :value="false">out side</option>
            <option :value="true">Inside</option>
          </select>
        </div>
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
        <b class="col-span-3 text-left">Location</b>
        <b class="col-span-4 text-left">Coordenates</b>
        <b class="col-span-2 text-left">floor</b>
        <b class="col-span-2 text-left">In Door</b>
        <b class="col-span-1">Actions</b>
      </div>
      <!-- Body -->
      <div>
        <div v-for="(u, uIndex) in beacons" :key="'beacon_row' + uIndex">
          <div
            class="grid grid-cols-12 py-6 px-12 border-t border-collapse border-gray-300 items-center"
          >
            <div class="col-span-3 text-left">{{ u.locationType }}</div>
            <div class="col-span-4 text-left">{{ u.position[0] + ' ' + u.position[1] }}</div>
            <div class="col-span-2 text-left">{{ u.floor }}</div>
            <div class="col-span-2 text-left">{{ u.inDoor }}</div>
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
import api from '../API/api'
export default {
  components: {
    Field
  },
  data() {
    return {
      // TODO get beacons from API
      beacons: [],
      selected: {
        index: -1,
        _id: '',
        position: [0, 0],
        floor: 0,
        locationType: '',
        inDoor: false
      }
    }
  },

  async mounted() {
    const token = localStorage.getItem('token')
    var beacons = this.beacons

    await api
      .get('/beacons', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(async function (response) {
        for (var i = 0; i < response.data.beacon.length; i++) {
          beacons.push(response.data.beacon[i])
        }
      })
      .catch(async function (error) {
        alert(error)
      })

    console.log(this.beacons)
  },
  methods: {
    resetSelected() {
      this.selected = {
        index: -1,
        _id: '',
        position: [0, 0],
        floor: 0,
        locationType: '',
        inDoor: false
      }
    },
    async handleAddOrUpdate() {
      const token = localStorage.getItem('token')
      var id = ''

      if (this.selected.locationType === '') return alert('Beacon Location needs to be fill')

      //TODO add/edit beacon logic
      if (this.selected.index === -1) {
        //this.beacons.push({ name: this.selected.name, email: this.selected.email })

        await api
          .post(
            '/beacons',
            {
              position: this.selected.position,
              floor: this.selected.floor,
              locationType: this.selected.locationType,
              inDoor: this.selected.inDoor
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
            id = response.data.URL.replace('/beacon/', '')
          })
          .catch(async function (error) {
            alert(error)
          })

        if (id != '')
          this.beacons.push({
            _id: id,
            position: this.selected.position,
            floor: this.selected.floor,
            locationType: this.selected.locationType,
            inDoor: this.selected.inDoor
          })
      } else {
        this.beacons[this.selected.index] = {
          ...this.beacons[this.selected.index],
          _id: this.selected._id,
          position: this.selected.position,
          floor: this.selected.floor,
          locationType: this.selected.locationType,
          inDoor: this.selected.inDoor
        }

        const beacon = this.beacons[this.selected.index]

        await api
          .put(
            `/beacons/${beacon._id}`,
            {
              position: beacon.position,
              floor: beacon.floor,
              locationType: beacon.locationType,
              inDoor: beacon.inDoor
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
            console.log(response.data.msg)
          })
          .catch(async function (error) {
            alert(error)
          })
      }
      this.resetSelected()
    },
    handleEdit(i) {
      //TODO edit beacon logic
      this.selected.index = i
      this.selected._id = this.beacons[i]._id
      this.selected.locationType = this.beacons[i].locationType
      this.selected.position = this.beacons[i].position
      this.selected.floor = this.beacons[i].floor
      this.selected.inDoor = this.beacons[i].inDoor
    },
    async handleDelete(i) {
      const token = localStorage.getItem('token')

      console.log(`/beacons/${this.beacons[i]._id}`)
      await api
        .delete(`/beacons/${this.beacons[i]._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(async function (response) {
          console.log(response.data.message)
        })
        .catch(async function (error) {
          alert(error)
        })

      //TODO delete beacon logic
      this.beacons.splice(i, 1)
    }
  }
}
</script>
