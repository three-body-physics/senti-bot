<template lang="html">
  <div class="header">
    <div id="logo">
      <h3>Senti-Bot</h3>
    </div>
    <div id="menu">
      <ul>
        <li><input type="text" placeholder="keyword" v-model="searchTerm"><button class="btn btn-primary" type="button" @click="searchTwitter">Search</button></li>
        <li><a href="#">gitHub</a></li>
        <li></li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "header",
  data() {
    return {
        searchTerm: ""
    }
  },

  methods: {
    searchTwitter() {
      this.$emit("startStream", this.searchTerm);
    }
  }
}
</script>

<style lang="css">

.header {
  background: rgb(15, 10, 28);
  height: 50px;
  border-bottom: 1px solid grey;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  color: white;

}
#logo {
  flex-grow: 1;
}

#logo h3 {
  height: 100%;
  text-align: left;
  font-weight: bold;
  margin: 0 0 0 5%;
  padding: 0;
}

#menu {
  flex-grow: 2;
}

#menu ul {
  display: inline-block;
  list-style-type: none;
  margin: 0 5% 0 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
}

li {
  display: inline-block;
  margin: 0px 10px 0px 10px;
}

li a{
  text-decoration: none;
  color: white;
}
li input {
  color: black;
  height: 3em;
  width: 14em;
  margin: 1em;


}



</style>
