<template>
  <div class="bodyDiv">
      <Header/>
      <div>
        <Aside/>
        <nuxt />
        <BackToTop/>
      </div>
      <Gitter/>
      <Footer/>
  </div>
</template>

<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Aside from '~/components/aside.vue'
import BackToTop from '~/components/backToTop.vue'
import Gitter from '~/components/gitter.vue'

export default {
    name: 'blog',
    components: {
        Header,
        Footer,
        Aside,
        BackToTop,
        Gitter
    }
}
</script>