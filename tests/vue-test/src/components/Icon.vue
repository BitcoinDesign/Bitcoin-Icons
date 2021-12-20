<template>
  <component :is="currentIconStyle" :icon="currentIcon" :style="style"></component>
</template>

<script>
import IconOutline from './IconOutline'
import IconFilled from './IconFilled'

export default {
  name: 'Icon',
  components: {
    IconOutline,
    IconFilled
  },
  data(){
    return {
      currentIcon: this.icon,
      currentIconStyle: this.version === 'outline' ? 'IconOutline' : 'IconFilled'
    }
  },
  props: {
    style: String,
    version: String
  }
}
</script>
