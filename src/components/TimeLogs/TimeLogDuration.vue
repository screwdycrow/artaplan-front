<template>
  <div>
    <strong>
       <span class="display-0" v-if="duration<60">
                {{ duration }}m
              </span>
    <span class="display-0" v-if="duration>=60">
                {{
         Math.floor(duration/ 60)
      }}hr {{ duration % 60 }}m
              </span>
    </strong>
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
