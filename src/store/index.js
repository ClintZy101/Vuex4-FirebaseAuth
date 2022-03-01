import { createStore } from 'vuex'
// firebase imports
import { auth } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

const store = createStore({
    state: {
        user: null,
        // isLoggedIn
        authIsReady: false,
    },
    mutations: {
        // A payload is simply the data passed to our mutation from the component committing the mutation.
        // cannot use asynchronous method in here ; all should be synchronous
        setUser(state, payload) {
            state.user = payload
            console.log('user state changed:', state.user)
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        }
    },
    actions: {
        // inside here use async code like fetch, authentication. Actions can commit many mutations
        // destructure payload because it is an object from signup form
        async signUp(context, { email, password }) {
            console.log('signup action')
            // async code
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error('could not complete sign up')
            }
        },
        async login(context, { email, password }) {
            console.log('login action')
            // async code
            const res = await signInWithEmailAndPassword(auth, email, password)
            if (res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error('could not complete login')
            }
        },
        async logout(context){
            console.log('logout action')
            await signOut(auth)
            context.commit('setUser', null)
        }
    }
})

const unsub = onAuthStateChanged(auth, (user)=> {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    unsub()
})

export default store