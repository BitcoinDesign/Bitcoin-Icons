<template>
  <h1>Vue Icons Test</h1>
  <h2>Filled Icons</h2>
  <ul class="icons">
    <li v-for="icon in icons" v-bind:key="icon">
      <Icon :icon="icon.id + 'Icon'" version="filled" style="width: 100px; height: 100px; color: #ff9500;" />
      <p v-html="icon.name"></p>
      <code v-html="icon.id + 'Icon'"></code>
    </li>
  </ul>

  <h2>Outline Icons</h2>
  <ul class="icons">
    <li v-for="icon in icons" v-bind:key="icon">
      <Icon :icon="icon.id + 'Icon'" version="outline" style="width: 100px; height: 100px; color: #ff9500;" />
      <p v-html="icon.name"></p>
      <code v-html="icon.id + 'Icon'"></code>
    </li>
  </ul>
</template>

<script>
import Icons from './icons.json'
import Icon from './components/Icon'

export default {
  name: 'App',
  components: {
    Icon
  },
  data(){
    return {
      icons: Icons
    }
  },
  created(){
    console.log(this.icons)
  },
  iconsData(){
    let myIconsData = Icons
    console.log(Icons)
    console.log(myIconsData)
  }
}
</script>

<style>
#app {
  display: block;
  margin: auto;
  width: 75%;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.icons {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.icons li {
  text-align: center;
  padding: 1rem;
  flex-basis: 16rem;
  border: 1px solid #ccc;
}
</style>
