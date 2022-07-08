<template>
  <div class="reviews-wrapper">
    <div class="review-block" v-for="row in reviewsArray" :key="row.id">
      <div class="avatar-block">
        <div v-if="row.avatar" class="avatar">
          <img :src="row.avatar" />
        </div>
        <div v-else class="avatar">
          <img src="../assets/images/avatar.png" />
        </div>
        <div class="like-block">
          <likeSvg />
          <span>45</span>
        </div>
      </div>
      <div class="info-block">
        <h3>{{ row.name }}</h3>
        <p>{{ row.review }}</p>
        <div class="welcome-block">
          <span>Полезный отзыв?</span>
          <default-button :type="'white-button'" :label="'Да, СПАСИБО'" :is-with-slot="true">
            <template v-slot:icon><likeSvg /></template>>
          </default-button>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import likeSvg from '../assets/images/like.svg'
import DefaultButton from '@/components/default-button'
export default {
  name: 'reviews',
  components: {
    'default-button': DefaultButton,
    likeSvg
  },
  props: {
    reviewsArray: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style>
.reviews-wrapper
{
  max-width: 700px;
  margin: 0 auto;
}

.review-block
{
  display: flex;
  margin-bottom: 100px;
}

.review-block .avatar-block
{
  flex-shrink: 0;
}

.review-block .avatar-block .avatar
{
  width: 150px;
  height: 150px;
  margin-right: 20px;
  margin-bottom: 13px;
  overflow: hidden;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}

.review-block .avatar-block img
{
  max-width: 100%;
  width: 100%;
  height: auto;
}

.review-block .avatar-block .like-block
{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.review-block .avatar-block .like-block svg
{
  margin-right: 7px;
}

.review-block .avatar-block .like-block span
{
  font-family: 'Roboto-Medium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #C2C2C2;
}

.review-block .info-block h3
{
  font-family: 'Roboto-Medium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 140%;
  color: #000000;
  margin-bottom: 10px;
  text-align: left;
}

.review-block .info-block p
{
  font-family: 'Roboto-Regular', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #333333;
  margin-bottom: 20px;
}

.review-block .welcome-block > span
{
  font-family: 'Roboto-Regular', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #333333;
  display: inline-block;
  margin-right: 10px;
}

@media (max-width: 992px) {
  .review-block
  {
    display: block;
    text-align: center;
    margin-bottom: 50px;
  }

  .review-block .avatar-block .avatar
  {
    margin-right: auto;
    margin-left: auto;
  }

  .review-block .info-block h3
  {
    text-align: center;
  }

  .review-block .welcome-block > span
  {
    display: block;
  }

  .review-block .avatar-block .like-block
  {
    margin-bottom: 20px;
  }

  .review-block .info-block h3
  {
    font-size: 24px;
    line-height: 120%;
    margin-bottom: 10px;
  }

  .review-block .welcome-block > span
  {
    margin-right: 0;
  }

  .review-block .info-block p
  {
    font-size: 16px;
    line-height: 175.8%;
  }

  .review-block .welcome-block > span
  {
    font-size: 16px;
    line-height: 140%;
  }
}
</style>
