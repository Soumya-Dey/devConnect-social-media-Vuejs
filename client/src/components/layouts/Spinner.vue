<template>
  <div>
    <img class="spinner-gif" src="./loading.gif" alt="Loading..." />
  </div>
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style scoped>
.spinner-gif {
  width: 100px;
  margin: 80px auto;
  display: block;
}
</style>