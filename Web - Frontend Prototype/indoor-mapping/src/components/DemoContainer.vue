<template>
  <div class="demoWrapper">
    <div v-for="(obj, i) in loremIpsumArray" :key="i" class="demoCards">
      <h1 class="font-black uppercase">{{ obj.title }}</h1>
      <p v-if="showDescription">{{ obj.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showDescription: Boolean
  },
  data() {
    return {
      loremIpsum: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod lacinia at quis risus. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Eu facilisis sed odio morbi quis. Non enim praesent elementum facilisis leo. Mauris commodo quis imperdiet massa. Maecenas ultricies mi eget mauris pharetra. Pellentesque habitant morbi tristique senectus. In massa tempor nec feugiat. Viverra vitae congue eu consequat ac felis donec. Sit amet aliquam id diam maecenas. Bibendum neque egestas congue quisque egestas diam in. Feugiat sed lectus vestibulum mattis ullamcorper velit. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Accumsan lacus vel facilisis volutpat. Quis commodo odio aenean sed adipiscing. Quam lacus suspendisse faucibus interdum posuere lorem. Sollicitudin ac orci phasellus egestas. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas sed tempus urna et pharetra pharetra massa. Vulputate odio ut enim blandit volutpat maecenas volutpat. Rutrum quisque non tellus orci ac auctor augue mauris. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Quis ipsum suspendisse ultrices gravida. Et malesuada fames ac turpis egestas sed tempus. Ullamcorper malesuada proin libero nunc consequat interdum varius. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.`
    }
  },
  computed: {
    loremIpsumArray() {
      let abc = function (arr, start, end) {
        let str = ``
        for (let i = start; i < end; i++) {
          str += arr[i] + ` `
        }
        return str
      }
      const regex = /[.,]/g
      let loremIpsumWords = this.loremIpsum.replaceAll(regex, '').split(` `)
      let loremIpsumObj = []
      for (let i = 0; i < loremIpsumWords.length - 25; i += 25) {
        loremIpsumObj.push({
          title: abc(loremIpsumWords, i, i + 4),
          description: abc(loremIpsumWords, i + 5, i + 24)
        })
      }
      return loremIpsumObj
    }
  }
}
</script>
