<template>
  <div class="hero is-medium is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
        </h1>
        <h2 class="subtitle">
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background: url("../../static/hero.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  max-width: 100%;
}

@media screen and (min-width: 1200px) {
  .hero {
    height: 900px;
  }
}

@media screen and (min-width: 500px) and (max-width: 1199px) {
  .hero {
    height: 600px;
  }
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .hero {
    height: 300px;
  }
}

h1,
h2 {
  color: #fff;
}
</style>
