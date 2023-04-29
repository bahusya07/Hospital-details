<template>
  <div class="search-bar">
    <button
      v-for="patient in patients"
      :key="patient._id"
      @click="handleClick(patient)"
      class="patient-button"
      :class="{ selected: isSelected(patient) }"
    >
      {{ patient.patient_name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'PatientSelector',
  props: {
    patients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedPatient: null,
    };
  },
  methods: {
    handleClick(patient) {
      this.selectedPatient = patient;
      this.$emit('select', patient);
    },
    isSelected(patient) {
      return this.selectedPatient === patient;
    },
  },
};
</script>






<style scoped>
.search-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.patient-button {
  background-color: #0b3d91; /* Dark blue */
  border: 2px solid #0b3d91;
  color: #ffffff;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
  box-shadow: 0 0 5px #c9b7a2;
  outline: none;


  transition-duration: 0.4s;
}

.patient-button:hover,
.patient-button.selected {
  background-color: #034a04; /* Lighter shade of blue */
  color: #ffffff;
}
</style>
