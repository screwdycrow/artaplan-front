<template>
  <div>
       <span class="display-1" v-if="duration<60">
                {{ duration }} m
              </span>
    <span class="display-1" v-if="duration>=60">
                {{
        (duration / 60) | fixed
      }}hr {{ -(Math.floor(duration / 60) * 60 - duration) }}m
              </span>
  </div>
</template>

<script>
export default {
  name: "TimeLogDuration",
  props: {
    duration: {type: Number, default: null, required: false}
  }
}
</script>

<style scoped>

</style>
