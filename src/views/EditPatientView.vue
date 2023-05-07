<template>
    <div>
      <h1>Edit Patient</h1>
      <form @submit.prevent="updatePatient">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="patient.name" required>
        </div>
        <div>
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="patient.cpf" required>
        </div>
        <div>
          <label for="birthdate">Birthdate:</label>
          <input type="text" id="birthdate" v-model="patient.birthdate" required>
        </div>
        <button type="submit">Save</button>
        <button @click="goBack">Voltar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditPatientView',
    data() {
      return {
        patient: {
          name: '',
          cpf: '',
          birthdate: ''
        }
      };
    },
    methods: {
        goBack() {
        // Navigate back to the patient list
        this.$router.push('/patient');
      },
      updatePatient() {
        axios.put(`/api/patients/${this.$route.params.id}`, this.patient)
          .then(response => {
            alert('Patient updated successfully!');
            // Redirect back to the patient list
            this.$router.push('/patient');
          })
          .catch(error => {
            console.log(error);
            alert('Error updating patient!');
          });
      }
    },
    created() {
  // Fetch patient data from the API and populate the form
  axios.get(`/api/patients/${this.$route.params.id}`)
    .then(response => {
      this.patient = response.data.patient;
    })
    .catch(error => {
      console.log(error);
      alert('Error fetching patient data!');
    });
}

  };
  </script>
  