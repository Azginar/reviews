import { CHANGE_FULL_NAME } from "@/modules/review/mutation-types";

export const state = () => ({
  user: false
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims, commit }) => {
    if (authUser) {
      const { uid, email, displayName } = authUser
      state.user = { uid, email, displayName }
    } else {
      state.user = false
    }
  }
}
