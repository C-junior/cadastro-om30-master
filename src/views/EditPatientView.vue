<template>
    <div>
      
      <form @submit.prevent="updatePatient" class="patient-form-container">
        <h1 class="patient-form-title">Editar Paciente {{ patient.name }}</h1>
        <div class="invisible-container">
          <div class="form-field">
            <label for="name">Nome Completo do Paciente<span class="required-field">*</span>:</label>
            <input type="text" id="name" v-model="patient.name" required class="form-input">
          </div>
          <div class="form-field">
            <label for="motherName">Nome Completo da Mãe<span class="required-field">*</span>:</label>
            <input type="text" id="motherName" v-model="patient.motherName" required class="form-input">
          </div>
          <div class="form-field">
            <label for="birthdate">Data de Nascimento<span class="required-field">*</span>:</label>
            <input type="date" id="birthdate" v-model="patient.birthdate" required class="form-input">
          </div>
          <div class="form-field">
            <label for="cpf">CPF<span class="required-field">*</span>:</label>
            <input type="text" id="cpf" v-model="patient.cpf" required class="form-input">
          </div>
          <div class="form-field">
            <label for="cns">CNS<span class="required-field">*</span>:</label>
            <input type="text" id="cns" v-model="patient.cns" required v-mask="['###############']" class="form-input">
          </div>
          <div class="form-field">
            <label for="cep">CEP:</label>
            <input id="cep" type="text" v-model="patient.cep" placeholder="Digite o CEP" @blur="fetchAddress" v-mask="['#####-###']" class="form-input">
          </div>
          <div class="form-field">
            <label for="rua">Rua:</label>
            <input id="rua" type="text" v-model="patient.address.street" placeholder="Rua" class="form-input">
          </div>
          <div class="form-field">
            <label for="bairro">Bairro:</label>
            <input id="bairro" type="text" v-model="patient.address.neighborhood" placeholder="Bairro" class="form-input">
          </div>
          <div class="form-field">
            <label for="cidade">Cidade:</label>
            <input id="cidade" type="text" v-model="patient.address.city" placeholder="Cidade" class="form-input">
          </div>
          <div class="form-field">
            <label for="estado">Estado:</label>
            <input id="estado" type="text" v-model="patient.address.state" placeholder="Estado" class="form-input">
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-button">Salvar</button>
          <button @click="goBack" class="goBack-button">Voltar</button>
        </div>
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
      },
      updatePatient() {
        axios.put(`/api/patients/${this.$route.params.id}`, this.patient)
        // eslint-disable-next-line
          .then(response => {
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
  
  <style scoped>
  .patient-form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 64px;
    margin: auto;
    margin-top: 16px;
    background-color:#f5f5f5;
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

  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #9f002b;
    border-radius: 4px;
  }

  .button-group {
    margin-left: 20px;
    
  }

  .invisible-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
  .photo-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .photo-preview label {
    margin-bottom: 8px;
  }


  .submit-button,
  .goBack-button {
    padding: 10px 20px;
    background-color: #9f002b;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 16px;
  }

  .required-field {
    color: red;
  }
</style>
