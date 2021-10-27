<template>
  <div class="home">
    <h2>Hello {{ getUser.displayName }}</h2>
    <div class="inputContainer">
      <input type="text" v-model="projectName" id="inputProject"/>
      <button v-on:click="createProject">Create a Project</button>
    </div>
    <div v-for="project in projectList" :key="project.id" class="projectList">
      <router-link
        :to="{ name: 'ProjectPage', params: { id: project.projectId } }"
        class="projectelement">{{ project.projectId }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dashboard",
  data() {
    return {
      projectName: "",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    projectList() {
      return this.$store.state.projectList;
    },
  },

  mounted() {
    this.$store.dispatch("getProjectList");
  },

  beforeUnmount() {
    this.$store.dispatch("unsub");
  },

  methods: {
    createProject() {
      if (this.projectName.length >= 4) {
        this.$store.dispatch("createProject", this.projectName);
      } else {
        window.alert("Please enter a name with 4 caracters");
      }
    },
  },
};
</script>

<style scoped>
.home{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#inputProject {
margin: 15px;
}

.projectList {
  margin: 15px 0;
}

.projectelement{
  text-decoration: none;
  color: black;
  font-size: 25px;
}

.projectelement :hover {
  background-color: lightgray;
}

</style>
