<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div id="map" style="max-height: calc(100% - 4rem); max-width: 100%"></div>
  </div>
</template>

<script>
import 'ol/ol.css'
import Point from 'ol/geom/Point.js'
import { Icon, Style } from 'ol/style.js'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature.js'
import { defaults as defaultControls, ScaleLine } from 'ol/control'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'

import api from '../API/api'

export default {
  data() {
    return {
      map: undefined,
      beacons: []
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

    await this.initiateMap()
  },
  methods: {
    initiateMap() {
      const long = -8.60763790178299
      const lat = 41.178277376651764
      const extentMargin = 0.005
      const widthHeightRatio = window.innerWidth / window.innerHeight

      const mapFeatures = []

      for (let b of this.beacons) {
        console.log(b)
        const newBeacon = new Feature({
          geometry: new Point([b.position[0], b.position[1]])
        })

        newBeacon.setStyle(
          new Style({
            image: new Icon({
              color: '#fff',
              crossOrigin: 'anonymous',
              src: '/public/images/mapMarker.png',
              scale: 0.1
            })
          })
        )

        mapFeatures.push(newBeacon)
      }

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
    }
  }
}
</script>
