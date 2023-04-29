<template>
  <div class="patient-list">
    <div v-if="patient">
      <h3 class="patient-title" >{{ patient.patient_name }}</h3>
      <table class="patient-details">
        <tr>
          <th>Field</th>
          <th>Information</th>
        </tr>
        <tr>
          <td>Age</td>
          <td>{{ patient.age }}</td>
        </tr>
        <tr>
          <td>Diagnosis</td>
          <td>{{ patient.diagnosis }}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{{ patient.gender }}</td>
        </tr>
        <tr>
          <td>Doctor</td>
          <td>{{ patient.doctor_name }}</td>
        </tr>
        <tr>
          <td>Room Number</td>
          <td>{{ patient.room_number }}</td>
        </tr>
      </table>
    </div>
    <p v-else class="initial">Select a patient to view details.</p>
  </div>
</template>


<script>
export default {
  name: 'PatientInfo',
  props: {
    patient: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>

.initial {
  color: white
}

.patient-title {
  color: #fff; /* Set the font color of the title to white */
}

.patient-list {

  width: 50%; /* Increase the width of the output text box */
  margin: 0 auto; /* Center the output text box */
  margin-top: 40px;
  display: inline-block;
  border: 1px solid #c9b7a2;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #0b3d91;
}

.patient-details {
  width: 100%;
  color: #fff;
  border-collapse: collapse;
  margin-top: 20px;
}

.patient-details th,
.patient-details td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.patient-details th {
  background-color: #fff; /* Set the background color to white */
  font-weight: bold;
  color: #000; /* Set the font color to black */
}
</style>
