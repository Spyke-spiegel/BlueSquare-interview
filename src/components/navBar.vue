<template>
  <div class="container">
    <button v-on:click="signIn" v-if="!isUserAuth">Sign In</button>
    <div class="navRoute">
      <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      <router-link :to="{ name: 'Tache' }">Tache</router-link>
      <router-link :to="{ name: 'Ticket' }">Ticket</router-link>
    </div>
    <section v-if="isUserAuth" class="userInfo">
      <div class="columns">
        <div>
          <img :src="getUser.photo" alt="" class="userPics">
        </div>
        <div class="column is-half is-offset-one-quarter">
          Welcome {{ getUser.displayName }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "navBar",
  data() {
    return {
      connected: false,
    };
  },

  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },

  methods: {
    ...mapActions(["signInGoogle"]),
    signIn() {
      this.signInGoogle();
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.navRoute {
  padding: 25px;
}

.navRoute > * {
  padding: 0 25px;
  text-decoration: none;
  color: black
}

.userPics {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}


</style>
