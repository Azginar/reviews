import get from 'lodash/get'
import { generateString } from '@/services/generateIDtoFirebase.js'
import {
  SHOW_MODAL_FORM,
  FULL_NAME,
  REVIEW,
  ALL_REVIEW,
  ERRORS,
  AVATAR
} from '@/modules/review/constants'

import {
  GET_SHOW_MODAL_FORM,
  GET_ALL_REVIEW,
  GET_ERRORS,
  GET_COUNT_REVIEW,
  GET_FULL_NAME
} from '@/modules/review/getter-types'

import {
  CHANGE_SHOW_MODAL_FORM,
  CHANGE_FULL_NAME,
  CHANGE_REVIEW,
  CHANGE_ALL_REVIEW,
  CHANGE_ERRORS,
  CHANGE_AVATAR
} from '@/modules/review/mutation-types'

import {
  SEND_REVIEW,
  GET_REVIEW,
  AUTHENTICATION
} from '@/modules/review/actions-types'

export const state = () => ({
  [SHOW_MODAL_FORM]: false,
  [FULL_NAME]: '',
  [REVIEW]: '',
  [ALL_REVIEW]: [],
  [ERRORS]: '',
  user: false
})

export const getters = {
  [GET_SHOW_MODAL_FORM] (state) {
    return state[SHOW_MODAL_FORM]
  },
  [GET_ALL_REVIEW] (state) {
    return state[ALL_REVIEW]
  },
  [GET_ERRORS] (state) {
    return state[ERRORS]
  },
  [GET_COUNT_REVIEW] (state) {
    return state[ALL_REVIEW].length
  },
  [GET_FULL_NAME] (state) {
    return state[FULL_NAME]
  },
}

export const mutations = {
  [CHANGE_SHOW_MODAL_FORM] (state, value) {
    state[SHOW_MODAL_FORM] = value
  },
  [CHANGE_FULL_NAME] (state, value) {
    state[FULL_NAME] = value
  },
  [CHANGE_REVIEW] (state, value) {
    state[REVIEW] = value
  },
  [CHANGE_AVATAR] (state, value) {
    state[AVATAR] = value
  },
  [CHANGE_ALL_REVIEW] (state, value) {
    state[ALL_REVIEW] = value
  },
  [CHANGE_ERRORS] (state, value) {
    state[ERRORS] = value
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (authUser) {
      const { uid, email, displayName } = authUser
      state.user = { uid, email, displayName }
    } else {
      state.user = false
    }
  }
}

export const actions = {
  [SEND_REVIEW] ({ commit, state }) {
    if(state[FULL_NAME].length > 0 && state[REVIEW].length > 0) {
      commit(CHANGE_ERRORS, '')
      const now = new Date();
      try{
        this.$fire.firestore.collection("reviews").
        doc(generateString(15)).set({
          name: state[FULL_NAME],
          review: state[REVIEW],
          avatar: state[AVATAR],
          createdAt: now
        })
        commit(CHANGE_FULL_NAME, '')
        commit(CHANGE_REVIEW, '')
      } catch (err) {
        console.log(err)
      }
    } else {
      commit(CHANGE_ERRORS, 'Пожалуйста заполните все поля')
    }
  },

  [CHANGE_SHOW_MODAL_FORM] ({ commit }, page) {
    commit(CHANGE_SHOW_MODAL_FORM, { page })
  },
  async [GET_REVIEW]({ commit }) {
    // Given object
    const ref = this.$fire.firestore.collection("reviews")
    let snap
    let reviews = [];
    try {
      snap = await ref.get().then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          reviews.push({
            name: doc.data().name,
            review: doc.data().review,
            avatar: doc.data().avatar,
            createdAt: doc.data().createdAt,
          })
        })
        reviews.sort((a, b) => get(b, 'createdAt.seconds') - get(a, 'createdAt.seconds'))
      })
      commit(CHANGE_ALL_REVIEW, reviews)
    } catch (e) {
      // TODO: error handling
      console.error(e)
    }
    console.log(snap)
  },
  [AUTHENTICATION] ({ commit, state, authUser }) {
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    const config = {
      signInOptions: [
        this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
        this.$fireModule.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult() {
          console.log('Successfully signed in')
        }
      }
    }
    ui.start('#firebaseui-auth-container', config)
    this.$fireModule.auth().onAuthStateChanged(user => {
      if(user) {
        commit(CHANGE_FULL_NAME, user.displayName)
        commit(CHANGE_AVATAR, user.photoURL)
      }
    });
  },
}
