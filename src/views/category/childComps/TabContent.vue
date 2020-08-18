<template>
  <div>
    <div class="category-right" v-for="(item,index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tabcontent",
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.category-right {
  width: 25%;
  display: inline-block;
  margin: 10px;
  font-size: 13px;
  /* display: flex; */
  /* flex: 1; */
  padding: 4px;
}
.category-right img {
  width: 100%;
}
p {
  text-align: center;
  margin-top: 12px;
}
</style>