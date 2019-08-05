
//import { Module, VuexModule, Mutation, Action, MutationAction, getModule} from 'vuex-module-decorators'

import {
    SET_TOKEN,
    SET_NAME,
    SET_AVATAR,
    SET_INTRODUCTION,
    SET_ROLES
} from '../mutations.type'
import { getToken, setToken, removeToken } from '@/common/utils/token'
import {} from '@/apis/user'

interface UserState {
    token: string,
    name: string,
    avatar: string,
    introduction: string,
    roles: string[]  //Array<string>
}
const state: UserState = {
    token: getToken() || '',
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}
const getters = {
    token(state: UserState) {
        return state.token
    }
}
const mutations = {
    [SET_TOKEN](state: UserState, token: string) {
        state.token = token
        setToken(token)
    },
    [SET_NAME](state: UserState, name: string) {
        state.name = name
    }
}
const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}
