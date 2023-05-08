<template>
    <div>
      
      <div class="patient-form-container">
        <h1 class="patient-form-title">Visualização de {{ patient.name }} </h1>
        <div class="invisible-container">
          <div class="form-field">
            <label for="name">Nome Completo do Paciente: </label>
            <span>{{ patient.name }}</span>
          </div>
          <div class="form-field">
            <label for="motherName">Nome Completo da Mãe: </label>
            <span>{{ patient.motherName }}</span>
          </div>
          <div class="form-field">
            <label for="birthdate">Data de Nascimento: </label>
            <span>{{ patient.birthdate }}</span>
          </div>
          <div class="form-field">
            <label for="cpf">CPF: </label>
            <span>{{ patient.cpf }}</span>
          </div>
          <div class="form-field">
            <label for="cns">CNS: </label>
            <span>{{ patient.cns }}</span>
          </div>
          <div class="form-field">
            <label for="cep">CEP: </label>
            <span>{{ patient.cep }}</span>
          </div>
          <div class="form-field">
            <label for="rua">Rua: </label>
            <span>{{ patient.address.street }}</span>
          </div>
          <div class="form-field">
            <label for="bairro">Bairro: </label>
            <span>{{ patient.address.neighborhood }}</span>
          </div>
          <div class="form-field">
            <label for="cidade">Cidade: </label>
            <span>{{ patient.address.city }}</span>
          </div>
          <div class="form-field">
            <label for="estado">Estado: </label>
            <span>{{ patient.address.state }}</span>
          </div>
        </div>
        <button @click="goBack" class="goBack-button">Voltar</button>
      </div>
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
      motherName: '',
      birthdate: '',
      cpf: '',
      cns: '',
      cep: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
      }
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
  
  <style scoped>
  .patient-form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 64px;
    margin: auto;
    margin-top: 16px;
    background-color: rgb(196, 196, 196);
    transition: box-shadow 0.3s;
    border-radius: 10px;
    border: 2px solid #9f002b;
    width: 90%;
    float: left;
  }

  .patient-form-container:hover {
    box-shadow: 0 2px 11px rgba(20, 20, 20, 0.2);
  }

  .patient-form-title {
    text-align: center;
    font-size: 24px;
    color: #9f002b;
    margin-bottom: 20px;
    font-weight: 800;
  }

  .patient-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .form-field {
    flex-basis: 48%;
    margin-bottom: 20px;
  }

  .form-field label {
    color: #9f002b;
  }

  .form-field span {
    font-weight: 600;
  }


  .invisible-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
 
  .goBack-button {
    padding: 10px 20px;
    background-color: #9f002b;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 16px;
    width: 100px;
  }

</style>
