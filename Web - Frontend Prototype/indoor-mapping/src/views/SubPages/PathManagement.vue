<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div>
    <div class="mx-72 mt-24">
      <div class="flex justify-start mb-4">
        <h3>Path Management</h3>
      </div>
      <!-- Add/Edit Path -->
      <div class="py-4 px-12 bg-white rounded-md shadow-lg">
        <form action="" class="flex flex-row justify-between">
          <!-- Name -->
          <Field
            class="w-full mr-12"
            f_id="pathM_Name"
            v-model:f_value="selected.name"
            f_label="Name"
            f_type="text"
            f_placeholder="Enter the path's name"
            f_icon="fa-tag"
          ></Field>
          <!-- Start Beacon -->
          <Field
            class="w-full mr-12"
            f_id="pathM_StartBeacon"
            v-model:f_value="selected.startBeacon"
            f_label="Start Beacon"
            f_type="text"
            f_placeholder="Enter the start beacon"
            f_icon="fa-map-marker"
          ></Field>
          <!-- End Beacon -->
          <Field
            class="w-full"
            f_id="pathM_EndBeacon"
            v-model:f_value="selected.endBeacon"
            f_label="End Beacon"
            f_type="text"
            f_placeholder="Enter the end beacon"
            f_icon="fa-map-marker"
          ></Field>
        </form>
        <div class="flex flex-row justify-end">
          <!-- Add Path Button -->
          <button
            class="rounded-md mt-8 p-2 px-6 mr-4 bg-red-700 text-white font-bold"
            @click="showPathMap()"
          >
            {{ (showMap ? 'Hide' : 'Manage') + ' intermediate beacons' }}
          </button>
          <button
            class="w-36 rounded-md mt-8 p-2 bg-red-700 text-white font-bold"
            @click="handleAddOrUpdate()"
          >
            {{ (selected.index === -1 ? 'Add' : 'Update') + ' Path' }}
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

      <!-- Paths List -->
      <div v-if="!showMap" class="my-8 mx-8 bg-white rounded-md shadow-md overflow-hidden">
        <!-- Header -->
        <div class="grid grid-cols-12 py-4 px-12 border border-gray-300 border-collapse">
          <b class="col-span-2 text-left">Name</b>
          <b class="col-span-2 text-left">Start</b>
          <b class="col-span-2 text-left">End</b>
          <b class="col-span-2 text-left">Num of Beacons</b>
          <b class="col-span-2 text-left">Status</b>
          <b class="col-span-2">Actions</b>
        </div>
        <!-- Body -->
        <div>
          <div v-for="(p, uIndex) in paths" :key="'path_row' + uIndex">
            <div
              class="grid grid-cols-12 py-6 px-12 border-t border-collapse border-gray-300 items-center"
            >
              <div class="col-span-2 text-left">{{ p.name }}</div>
              <div class="col-span-2 text-left">{{ p.beacons[0] }}</div>
              <div class="col-span-2 text-left">{{ p.beacons[p.beacons.length - 1] }}</div>
              <div class="col-span-2 text-left">{{ p.beacons.length }}</div>
              <div class="col-span-2 text-left">{{ p.status }}</div>
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
    <div id="map" style="max-height: 50%; max-width: 70%" class="mx-72 my-8 self-center"></div>
  </div>
</template>

<script>
import Field from '../../components/Field.vue'

import 'ol/ol.css'
import Point from 'ol/geom/Point.js'
import { Icon, Style } from 'ol/style.js'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature.js'
import { defaults as defaultControls, ScaleLine } from 'ol/control'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'

export default {
  components: {
    Field
  },
  data() {
    return {
      // TODO get paths from API
      paths: [
        { name: 'Hallway_B1', beacons: ['B1F-001', 'B1F-002'], status: true },
        { name: 'Hallway_B2', beacons: ['B2F-001', 'B2F-002'], status: true },
        { name: 'Hallway_B3', beacons: ['B3F-001', 'B3F-002'], status: false },
        { name: 'Hallway_B4', beacons: ['B4F-001', 'B4F-002'], status: true },
        { name: 'Hallway_H1', beacons: ['H1F-001', 'H1F-002'], status: true },
        { name: 'Hallway_H2', beacons: ['H2F-001', 'H2F-002'], status: false },
        { name: 'Hallway_H3', beacons: ['H3F-001', 'H3F-002'], status: true },
        { name: 'Hallway_H4', beacons: ['H4F-001', 'H4F-002'], status: true }
      ],
      selected: {
        index: -1,
        name: '',
        startBeacon: '',
        endBeacon: ''
      },
      showMap: false
    }
  },
  methods: {
    resetSelected() {
      this.selected = {
        index: -1,
        name: '',
        startBeacon: '',
        endBeacon: ''
      }
    },
    handleAddOrUpdate() {
      //TODO add/edit path logic
      if (this.selected.index === -1) {
        this.paths.push({
          name: this.selected.name,
          beacons: [this.selected.startBeacon, this.selected.endBeacon],
          status: false
        })
      } else {
        this.paths[this.selected.index].name = this.selected.name
        this.paths[this.selected.index].beacons[0] = this.selected.startBeacon
        this.paths[this.selected.index].beacons[
          this.paths[this.selected.index].beacons.length - 1
        ] = this.selected.endBeacon
      }
      this.resetSelected()
    },
    handleEdit(i) {
      //TODO edit path logic
      this.selected.index = i
      this.selected.name = this.paths[i].name
      this.selected.startBeacon = this.paths[i].beacons[0]
      this.selected.endBeacon = this.paths[i].beacons[this.paths[i].beacons.length - 1]
    },
    handleDelete(i) {
      //TODO delete path logic
      this.paths.splice(i, 1)
    },
    initiateMap() {
      const long = -8.60763790178299
      const lat = 41.178277376651764
      const extentMargin = 0.005
      const widthHeightRatio = window.innerWidth / window.innerHeight

      const mapFeatures = []

      const mockBeacon = new Feature({
        geometry: new Point([long, lat])
      })

      mockBeacon.setStyle(
        new Style({
          image: new Icon({
            color: '#fff',
            crossOrigin: 'anonymous',
            src: '/public/images/mapMarker.png',
            scale: 0.1
          })
        })
      )

      mapFeatures.push(mockBeacon)

      // create title layer
      var raster = new TileLayer({
        source: new OSM()
      })

      // create map with 2 layer
      this.map = new Map({
        controls: defaultControls().extend([
          new ScaleLine({
            units: 'degrees'
          })
        ]),
        target: 'map',
        layers: [
          raster,
          new VectorLayer({
            source: new VectorSource({
              features: mapFeatures
            })
          })
        ],
        view: new View({
          projection: 'EPSG:4326',
          center: [long, lat],
          zoom: 19,
          extent: [
            long - extentMargin,
            lat - extentMargin / widthHeightRatio,
            long + extentMargin,
            lat + extentMargin / widthHeightRatio
          ]
        })
      })
    },
    showPathMap() {
      if (!this.showMap) {
        this.showMap = true
        this.initiateMap()
      } else {
        this.showMap = false
      }
    }
  }
}
</script>
