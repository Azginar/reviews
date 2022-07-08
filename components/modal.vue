<template>
  <transition name="modal" v-if="showForm">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close-button" @click="handleCloseModal"><closeIc /></div>
          <h3>Добавление отзыва <span v-if="currentUser">{{ currentUser.displayName }}</span></h3>
          <p>Чтобы оставить свой отзыв, пожалуйста, авторизуйтесь, используя одну из следующих социальных сетей</p>
          <div id="firebaseui-auth-container"></div>
          <!--<div class="btn-block-modal">
            <default-button :type="'white-button-social'" :label="'Facebook'" :is-with-slot="true">
              <template v-slot:icon><facebookIc /></template>>
            </default-button>
            <default-button :type="'white-button-social'" :label="'Google'" :is-with-slot="true">
              <template v-slot:icon><googleIc /></template>>
            </default-button>
            <default-button :type="'white-button-social'" :label="'Twitter'" :is-with-slot="true">
              <template v-slot:icon><twitterIc /></template>>
            </default-button>
            <default-button :type="'white-button-social'" :label="'VK'" :is-with-slot="true">
              <template v-slot:icon><vkIc /></template>>
            </default-button>
          </div>-->
          <div v-if="errors" class="error-block">
            {{ errors }}
          </div>
          <div class="row-form">
            <label>Полное имя</label>
            <input-form :handle-input="handleFullName" :value="getFullName" />
          </div>
          <div class="row-form">
            <label>Оценка</label>
            <star-rating :star-size="43" inactive-color="#E0DDD8" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" />
            <!--<div class="stars-block">
              <star />
              <star />
              <star />
              <star />
              <star />
            </div>-->
            <div>
              <button @click="vkLogin">vkLogin</button>
              <button @click="vkLogout">vkLogout</button>
              <button @click="vkGetLoginStatus">vkGetLoginStatus</button>
              <button @click="vkRevokeGrants">vkRevokeGrants</button>
              <button @click="vkGetSession">vkGetSession</button>
              <button @click="vkApiMethodExample">vkApiMethodExample</button>
              <!-- VK Widget Example -->
              <div id="vk_contact_us"></div>
            </div>
          </div>
          <div class="row-form">
            <label>Отзыв</label>
            <textarea-form :handle-input="handleReview" />
          </div>
          <div class="btn-block">
            <default-button
              :type="'blue-button'"
              :label="'Добавить отзыв'"
              :click-event="handleSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue';
//import VKAuth from '@dyadikov/vue-vk-oauth2'
/*new Vue(VKAuth, {apiId: 8214015,
  widgets: [{
    widget: 'ContactUs',
    selector: 'vk_contact_us',
    props: {text: 'Задайте свой вопрос'}
  }]
})*/
import DefaultButton from '@/components/default-button'
import inputForm from '@/components/inputForm'
import textareaForm from '@/components/textareaForm'
import facebookIc from '../assets/images/facebook-ic.svg'
import googleIc from '../assets/images/google-ic.svg'
import twitterIc from '../assets/images/twitter-ic.svg'
import vkIc from '../assets/images/vk-ic.svg'
import closeIc from '../assets/images/close-ic.svg'
import star from '../assets/images/star.svg'
import { GET_ERRORS, GET_SHOW_MODAL_FORM, GET_FULL_NAME } from "@/modules/review/getter-types"
import { CHANGE_FULL_NAME, CHANGE_REVIEW, CHANGE_SHOW_MODAL_FORM } from "@/modules/review/mutation-types"
import { GET_REVIEW, SEND_REVIEW, AUTHENTICATION } from "@/modules/review/actions-types"
import VKAuth from "@dyadikov/vue-vk-oauth2";
export default {
  name: 'ModalWindow',
  computed: {
    showForm () {
      return this.$store.getters[`reviews/${GET_SHOW_MODAL_FORM}`]
    },
    errors () {
      return this.$store.getters[`reviews/${GET_ERRORS}`]
    },
    getFullName () {
      return this.$store.getters[`reviews/${GET_FULL_NAME}`]
    }
  },
  updated() {
    //this.auth()
    this.$store.dispatch(`reviews/${AUTHENTICATION}`)
  },
  /*mounted() {
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    const config = {
      signInOptions: [
        this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
        this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/',
      callbacks: {
        signInSuccessWithAuthResult() {
          console.log('Successfully signed in')
          window.location = '/'
        }
      }
    }
    ui.start('#firebaseui-auth-container', config)
  },*/
  components: {
    'default-button': DefaultButton,
    facebookIc,
    googleIc,
    twitterIc,
    vkIc,
    closeIc,
    star,
    'input-form': inputForm,
    'textarea-form': textareaForm,
    [process.browser && 'star-rating']: () => import('vue-star-rating'),
  },
  methods: {
    /*auth () {
      const firebaseui = require('firebaseui')
      require('firebaseui/dist/firebaseui.css')

      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(this.$fire.auth)

      const config = {
        signInOptions: [
          this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '/',
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult() {
            console.log('Successfully signed in')
            //window.location = '/'
          }
        }
      }
      ui.start('#firebaseui-auth-container', config)
    },*/
    handleCloseModal () {
      this.$store.commit(`reviews/${CHANGE_SHOW_MODAL_FORM}`, false)
      document.body.classList.remove('overflow')
    },
    handleFullName (event) {
      console.log(event)
      this.$store.commit(`reviews/${CHANGE_FULL_NAME}`, event.target.value)
    },
    handleReview (event) {
      this.$store.commit(`reviews/${CHANGE_REVIEW}`, event.target.value)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$store.dispatch(`reviews/${SEND_REVIEW}`)
      if(this.errors === ''){
        this.$store.dispatch(`reviews/${GET_REVIEW}`)
        this.$store.commit(`reviews/${CHANGE_SHOW_MODAL_FORM}`, false)
        document.body.classList.remove('overflow')
      }
    },
    currentUser(){
      return this.$store.state.user.displayName
    },
    vkLogin () {
      this.$vkAuth.login()
        .then(response => {
          console.log('vklogin', response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkLogout () {
      this.$vkAuth.logout()
        .then(response => {
          console.log('vklogout', response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkGetLoginStatus () {
      this.$vkAuth.getLoginStatus()
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkRevokeGrants () {
      this.$vkAuth.revokeGrants()
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkGetSession () {
      this.$vkAuth.getSession()
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkApiMethodExample () {
      this.$vkAuth.Api('users.get', {user_ids: VK_USER_ID, v: '5.73'})
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
<style>
    .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      overflow: hidden;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: table;
      transition: opacity 0.3s ease;
    }

    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }

    .modal-enter {
      opacity: 0;
    }

    .modal-leave-active {
      opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    .modal-container {
      background: #FFFFFF;
      padding: 40px;
      position: relative;
      text-align: left;
      max-width: 900px;
      height: 787px;
      overflow-x: auto;
      margin: 0 auto;
      transition: all 0.3s ease;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;

      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .modal-container h3
    {
      font-family: 'Roboto-Medium', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 36px;
      text-align: left;
      line-height: 140%;
      color: #000000;
      margin-bottom: 30px;
    }

    .modal-container h3 + p
    {
      font-family: 'Roboto-Medium', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 32px;
      color: #333333;
      margin-bottom: 20px;
    }

    .modal-container .btn-block-modal
    {
      display: flex;
      margin-bottom: 30px;
    }

    .modal-container .btn-block-modal > button
    {
      margin-right: 20px;
    }

    .modal-container .close-button
    {
      position: absolute;
      top: 40px;
      right: 40px;
      cursor: pointer;
    }

    .modal-container .row-form label
    {
      font-family: 'Roboto-Regular', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 100%;
      align-items: center;
      color: #333333;
      margin-bottom: 12px;
      display: block;
    }

    .modal-container .row-form
    {
      margin-bottom: 20px;
    }

    .modal-container .btn-block
    {
      margin-bottom: 0;
    }

    .modal-container .error-block
    {
      text-align: center;
      color: red;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid red;
    }

    .modal-wrapper .firebaseui-container {
      max-width: 100% !important;
    }

    .modal-wrapper .firebaseui-idp-list {
      width: 100%;
    }

    .modal-wrapper .firebaseui-idp-list {
      display: flex;
      margin: 0 -10px 30px;
    }

    .modal-wrapper .firebaseui-idp-list > li {
      margin: 0 10px;
    }

    .modal-wrapper .firebaseui-idp-button {
      color: #989898 !important;
      border: 2px solid #C2C2C2 !important;
      border-radius: 50px !important;
      font-size: 19px !important;
      font-family: 'Roboto-Regular', sans-serif !important;
      box-shadow: none !important;
      text-transform: uppercase !important;
      padding: 8px 40px 8px !important;
      height: 50px !important;
    }

    .modal-wrapper .firebaseui-idp-text.firebaseui-idp-text-long {
      display: none !important;
    }

    .modal-wrapper .firebaseui-idp-text.firebaseui-idp-text-short {
      display: table-cell !important;
      text-transform: uppercase;
      font-size: 16px !important;
      color: #757575;
    }

    .modal-wrapper .firebaseui-idp-icon-wrapper {
      display: none !important;
    }

    .modal-wrapper .firebaseui-idp-google {
      position: relative;
    }

    .modal-wrapper .firebaseui-idp-google:before {
      content: "";
      width: 16px;
      height: 16px;
      position: absolute;
      top: 15px;
      left: 30px;
      background: url('~assets/images/google-ic.png') no-repeat;
    }

    .modal-wrapper .firebaseui-idp-facebook {
      background: transparent !important;
    }

    .modal-wrapper .firebaseui-idp-facebook:before {
      content: "";
      width: 9px;
      height: 16px;
      position: absolute;
      top: 15px;
      left: 30px;
      background: url('~assets/images/facebook-ic.png') no-repeat;
    }

    .modal-wrapper .firebaseui-card-content {
      padding: 0;
    }

    .modal-wrapper .firebaseui-idp-google .firebaseui-idp-text {
      padding-left: 16px;
    }

    .modal-wrapper .firebaseui-idp-facebook .firebaseui-idp-text {
      padding-left: 12px;
    }

    @media (max-width: 992px) {
      .modal-container
      {
        max-width: 100%;
        height: 100%;
        padding: 60px 20px 130px;
        border-radius: 0;
        -moz-border-radius: 0;
        -webkit-border-radius: 0;
      }

      .modal-container h3
      {
        font-size: 30px;
        line-height: 120%;
        margin-bottom: 20px;
      }

      .modal-container h3 + p
      {
        font-size: 16px;
        line-height: 175.8%;
        margin-bottom: 20px;
      }

      .modal-container .row-form label
      {
        font-size: 16px;
        line-height: 100%;
      }

      .modal-container .close-button
      {
        top: 20px;
        right: 20px;
      }

      .modal-container .btn-block-modal
      {
        justify-content: center;
        margin-bottom: 40px;
      }

      .modal-container .btn-block-modal > button
      {
        margin-right: 0;
      }
    }

</style>
