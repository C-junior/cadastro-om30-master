<template>
    <div>
      <h1>View Patient</h1>
      <div>
        <label for="name">Name:</label>
        <span>{{ patient.name }}</span>
      </div>
      <div>
        <label for="cpf">CPF:</label>
        <span>{{ patient.cpf }}</span>
      </div>
      <div>
        <label for="birthdate">Birthdate:</label>
        <span>{{ patient.birthdate }}</span>
      </div>
      <button @click="goBack">Go Back</button>
    </div>
  </template>
  
  <script>
  
  import axios from 'axios';
  
  export default {
    name: 'ViewPatientView',
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
      }
    },
    created() {
      // Fetch patient data from the API and populate the view
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
  