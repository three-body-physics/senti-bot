<template lang="html">
  <div class="header">
    <div id="logo">
      <h3>Senti-Bot</h3>
    </div>
    <div id="menu">
      <ul>
        <li><a href="#">gitHub</a></li>
        <li><button class="btn btn-primary">Log In</button></li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "header",
  data() {
    return {

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
  justify-content: flex-start;
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
  margin: 0;
  padding: 0;
  height: 100%;
}

li {
  display: inline-block;
  margin: 0px 10px 0px 10px;
}

li a{
  text-decoration: none;
  color: white;
}

</style>
