<template>
  <div class="hero is-medium is-bold">
    <div class="hero-body">
      <div class="container">
        <span class="title"> STAY FIT
        </span>
        <h2 class="subtitle">
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background: url("../../static/hero.png") no-repeat;
  background-size: cover;
  background-position: center;
  max-width: 100%;

  span {
    font-size: 100px !important;
    color: #fff;
    /* position: relative; */
    background-color: #150e0c;
  }
}

@media screen and (min-width: 1200px) {
  .hero {
    height: 900px;
  }
}

@media screen and (min-width: 500px) and (max-width: 1199px) {
  .hero {
    height: 600px;
    span {
      font-size: 60px !important;
      color: #fff;
      background-color: #150e0c;
    }
  }
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .hero {
    height: 300px;
    span {
      font-size: 30px !important;
      color: #fff;
      background-color: #150e0c;
    }
  }
}

h1,
h2 {
  color: #fff;
}
</style>
