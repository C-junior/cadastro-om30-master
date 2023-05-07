<template>
    <div>
      <h1>Lista de Pacientes</h1>
      <input type="text" v-model="searchName" placeholder="Buscar por nome">
      <button @click="searchPatients">Buscar</button>
      <router-link to="/register">Cadastrar Paciente </router-link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="patient in patients" :key="patient.id">
        <td>{{ patient.name }}</td>
        <td>{{ patient.cpf }}</td>
        <td>{{ patient.birthdate }}</td>
  <td>
    <button @click="viewPatient(patient)">Visualizar</button>
    <button @click="editPatient(patient)">Editar</button>
    <button @click="deletePatient(patient)">Excluir</button>
  </td>
</tr>

        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PatientList',
    data() {
      return {
        patients: [],
        searchName: '',
      };
    },
    methods: {
      searchPatients() {
        const url = this.searchName
          ? `/api/patients?name=${this.searchName}`
          : '/api/patients';
  
        axios.get(url)
          .then(response => {
            this.patients = response.data.patients;
            
          })
          .catch(error => {
            console.log(error);
          });
      },
      editPatient(patient) {
        this.$router.push({ name: 'EditPatient', params: { id: patient.id } });
      },      
    viewPatient(patient) {
      // Navigate to the view page passing the patient ID as a parameter
      this.$router.push({ name: 'ViewPatient', params: { id: patient.id } });
    },
      deletePatient(patient) {
        axios.delete(`/api/patients/${patient.id}`)
          .then(response => {
            const index = this.patients.findIndex(p => p.id === patient.id);
            this.patients.splice(index, 1);
            alert('Paciente excluído com sucesso!');
          })
          .catch(error => {
            console.log(error);
            alert('Erro ao excluir paciente!');
          });
      },
    },
    mounted() {
      this.searchPatients();
    },
  };
  </script>
  