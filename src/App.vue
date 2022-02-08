<template>
  <div>
    <Layout></Layout>
    <MainImage></MainImage>
  </div>

</template>

<script>
import Layout from "@/components/Layout";
import MainImage from "@/components/MainImage";
export default {
  name: 'App',
  components: {
    MainImage,
    Layout
  }
}
</script>

<style>

</style>
