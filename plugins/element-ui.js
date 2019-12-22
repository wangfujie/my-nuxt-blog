import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/en'
// import infiniteScroll from 'vue-infinite-scroll'


export default () => {
  Vue.use(Element, { locale })
  // Vue.use(require(infiniteScroll));
}
