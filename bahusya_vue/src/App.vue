<template>
  <div id="app">
    <h1>Patient Information</h1>
    <PatientSelector :patients="patients" @select="selectPatient" />
    <PatientInfo :patient="selectedPatient" />
  </div>
</template>

<script>
import PatientSelector from './components/PatientSelector.vue';
import PatientInfo from './components/PatientInfo.vue';

export default {
  name: 'App',
  components: {
    PatientSelector,
    PatientInfo,
  },
  data() {
    return {
      patients: [],
      selectedPatient: null,
    };
  },
  async created() {
    await this.fetchPatients();
  },
  methods: {
    async fetchPatients() {
      const apiUrl = 'https://bahusya-node.onrender.com/api';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.patients = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    selectPatient(patient) {
      this.selectedPatient = patient;
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}


body {
  background-image: url("~@/assets/Hosp2.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


#app {
  font-family: Arial, Helvetica, sans-serif;
  color: #3d3a4a;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100%;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
}
</style>

