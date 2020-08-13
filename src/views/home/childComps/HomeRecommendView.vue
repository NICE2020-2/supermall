<template>
  <div class="recommends">
    <div v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.recommends {
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommends {
  flex: 1;
}
.recommends img {
  width: 85%;
}
</style>