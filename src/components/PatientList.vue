<template>
  <div class="patient-list-container">
    <h1 class="patient-list-title">Lista de Pacientes</h1>
    <div class="search-container">
      <input type="text" v-model="searchName" placeholder="Buscar por nome" class="search-input">
      <button @click="searchPatients" class="search-button">Buscar</button>
    </div>
    <router-link to="/register" class="register-link">Cadastrar Paciente</router-link>
    <table class="patient-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nome da Mãe</th>
          <th>Data de Nascimento</th>
          <th>CPF</th>
          <th>CNS</th>
          <th>Rua</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">     
          <td>{{ patient.name }}</td>
          <td>{{ patient.motherName }}</td>
          <td>{{ patient.birthdate }}</td>
          <td>{{ patient.cpf }}</td>
          <td>{{ patient.cns }}</td>
          <td>{{ patient.address.street }}</td>
          <td>{{ patient.address.neighborhood }}</td>
          <td>{{ patient.address.city }}</td>
          <td>{{ patient.address.state }}</td>
          <td class="td-action"> 
            <button @click="viewPatient(patient)" class="action-button">Visualizar</button>
            <button @click="editPatient(patient)" class="action-button">Editar</button>
            <button @click="deletePatient(patient)" class="action-button">Excluir</button>
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
        axios.delete(`/api/patients/${patient.id}`)// eslint-disable-next-line
          .then(response => {
            const index = this.patients.findIndex(p => p.id === patient.id);
            this.patients.splice(index, 1);
          
          })
          .catch(error => {
            console.log(error);
          
          });
      },
    },
    mounted() {
      this.searchPatients();
    },
  };
  </script>
  <style scoped>
  button{
    border-radius: 8px;
  }
  .patient-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 16px;
    background-color: #f5f5f5;
    transition: box-shadow 0.3s;
    border-radius: 10px;
    border: 2px solid  #9f002b;
    float: left;
  }
  
  .patient-list-container:hover {
    box-shadow: 0 2px 11px rgba(20, 20, 20, 0.2);
  }
  
  .td-action{
    width: 96px;
  }
  .patient-list-title {
    font-size: 24px;
    color:  #9f002b;
    margin-bottom: 20px;
    font-weight: 800;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 60%;
  }
  
  .search-input {
    padding: 10px;
    border: 1px solid   #9f002b;
    border-radius: 4px;
    width: 90%;
  }
  
  .search-button {
    padding: 10px 20px;
    background-color:   #9f002b;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .register-link {
    font-size: 16px;
    color:#c7bfc1;
    margin-bottom: 20px;
    padding: 8px 16px;
    text-decoration: none;
    background-color: #9f002b;
    justify-self: flex-end;
    border-radius: 8px;
  }
  
  .patient-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .patient-table th,
  .patient-table td {
    padding: 10px;
    border: 1px solid   #9f002b;
  }
  
  .action-button {
    padding: 8px 16px;
    width: 90px;
    background-color: #9f002b;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    margin: 6px;
    text-align: center;
  }
  </style>