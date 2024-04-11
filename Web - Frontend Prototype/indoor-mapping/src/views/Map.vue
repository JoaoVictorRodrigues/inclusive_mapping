<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <div id="map"></div>
      <Sidebar></Sidebar>
    </div>
  </template>
  
  <script>
  import 'ol/ol.css'
  import Map from 'ol/Map'
  import View from 'ol/View'
  import { defaults as defaultControls, ScaleLine } from 'ol/control'
  import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
  import { OSM, Vector as VectorSource } from 'ol/source'
  
  import Sidebar from '../components/Sidebar.vue'
  
  export default {
    components: {
      Sidebar
    },
    data() {
      return {
        map: undefined
      }
    },
    async mounted() {
      await this.initiateMap()
    },
    methods: {
      initiateMap() {
        // create vector layer
        var source = new VectorSource()
        var vector = new VectorLayer({
          source: source
        })
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
          layers: [raster, vector],
          view: new View({
            projection: 'EPSG:4326',
            center: [-8.60763790178299, 41.178277376651764],
            zoom: 19
          })
        })
      }
    }
  }
  </script>
  