<template>
  <div class="content-block">
    <h1>Отзывы трейдеров</h1>

    <h3>Всего {{ countReviews }} отзыв(-ов). Средний рейтинг 4.22</h3>
    <div class="btn-block">
      <default-button
        :type="'blue-button'"
        :label="'Оставить отзыв'"
        :click-event="handleOpenModal"
      />
    </div>
    <reviews :reviews-array="allReviews" />
    <modal-window class="restoreModal" @close="showWriteReview = false" />
  </div>
</template>

<script>
import DefaultButton from '@/components/default-button'
import reviews from '@/components/reviews'
import modalWindow from '@/components/modal'
import { CHANGE_SHOW_MODAL_FORM } from "@/modules/review/mutation-types"
import { GET_REVIEW } from "@/modules/review/actions-types";
import { GET_ALL_REVIEW, GET_COUNT_REVIEW } from "@/modules/review/getter-types";
export default {
  name: 'IndexPage',
  components: {
    'default-button': DefaultButton,
    'modal-window': modalWindow,
    reviews
  },
  computed: {
    allReviews () {
      return this.$store.getters[`reviews/${GET_ALL_REVIEW}`]
    },
    countReviews () {
      return this.$store.getters[`reviews/${GET_COUNT_REVIEW}`]
    }
  },
  /*async asyncData (context) {
    const ref = context.$fire.firestore.collection("reviews").doc("2PPj5e3NizFckZCAbBYe")
    let snap
    try {
      snap = await ref.get()
    } catch (e) {
      // TODO: error handling
      console.error(e)
    }

  },*/
  created() {
    this.$store.dispatch(`reviews/${GET_REVIEW}`)
  },
  data() {
    return {
      writeSuccessful: false,
      readSuccessful: false,
      text: ""
    }
  },
  methods: {
    handleOpenModal () {
      document.body.classList.add('overflow')
      this.$store.commit(`reviews/${CHANGE_SHOW_MODAL_FORM}`, true)
    },
    async readFromFirestore() {
      const ref = this.$fire.firestore.collection("reviews").doc("2PPj5e3NizFckZCAbBYe")
      let snap
      try {
        snap = await ref.get()
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      console.log(snap.data().text)
      this.text = snap.data().text
      this.readSuccessful = true
    }
  }
}
</script>
<style>
.content-block
{
  margin-top: 200px;
}

h1
{
  font-family: 'Roboto-Bold', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 120%;
  text-align: center;
  color: #000000;
  margin-bottom: 20px;
}

h3
{
  font-family: 'Roboto-Medium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 120%;
  text-align: center;
  color: #707070;
  margin-bottom: 50px;
}

.btn-block
{
  text-align: center;
  margin-bottom: 100px;
}

.overflow
{
  overflow: hidden;
}

@media (max-width: 992px) {
  .content-block
  {
    margin-top: 50px;
  }

  h1
  {
    font-size: 30px;
    line-height: 120%;
    margin-bottom: 20px;
  }

  h3
  {
    font-size: 17px;
    line-height: 160%;
    margin-bottom: 20px;
  }

  .content-block
  {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
