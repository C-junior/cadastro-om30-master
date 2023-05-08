<template>
  <div>
  
    <form @submit.prevent="savePatient">
      <div class="patient-form-container">
        <h1 class="patient-form-title">Cadastro de Paciente</h1>
        <div class="form-field">
          <label for="photo">Foto do Paciente:</label>
          <input type="file" id="photo" name="photo" @change="handlePhotoUpload">
        </div>

        <!-- Photo preview -->
        <div v-if="photo" class="photo-preview">
          <label>Foto Preview:</label>
          <img :src="photoPreview" alt="Preview" width="200">
        </div>

        <div class="invisible-container">
          <div class="form-field">
            <label for="name">Nome Completo do Paciente<span class="required-field">*</span>:</label>
            <input type="text" id="name" name="name" v-model="name" required class="form-input">
          </div>

          <div class="form-field">
            <label for="motherName">Nome Completo da Mãe<span class="required-field">*</span>:</label>
            <input type="text" id="motherName" name="motherName" v-model="motherName" required class="form-input">
          </div>

          <div class="form-field">
            <label for="birthdate">Data de Nascimento<span class="required-field">*</span>:</label>
            <input type="date" id="birthdate" name="birthdate" v-model="birthdate" required class="form-input">
          </div>

          <div class="form-field">
            <label for="cpf">CPF<span class="required-field">*</span>:</label>
            <input type="text" id="cpf" name="cpf" v-model="cpf" required class="form-input">
          </div>

          <div class="form-field">
            <label for="cns">CNS<span class="required-field">*</span>:</label>
            <input type="text" id="cns" name="cns" v-model="cns" required v-mask="['###############']" class="form-input">
          </div>

          <div class="form-field">
            <label for="cep">CEP:</label>
            <input id="cep" type="text" v-model="cep" placeholder="Digite o CEP" @blur="fetchAddress" v-mask="['#####-###']" class="form-input">
          </div>

          <div class="form-field">
            <label for="rua">Rua:</label>
            <input id="rua" type="text" v-model="address.street" placeholder="Rua" class="form-input">
          </div>

          <div class="form-field">
            <label for="bairro">Bairro:</label>
            <input id="bairro" type="text" v-model="address.neighborhood" placeholder="Bairro" class="form-input">
          </div>

          <div class="form-field">
            <label for="cidade">Cidade:</label>
            <input id="cidade" type="text" v-model="address.city" placeholder="Cidade" class="form-input">
          </div>

          <div class="form-field">
            <label for="estado">Estado:</label>
            <input id="estado" type="text" v-model="address.state" placeholder="Estado" class="form-input">
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-button">Salvar</button>
          <button @click="goBack" class="goBack-button">Voltar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUpPage',
  data() {
    return {
      photo: '',
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
    };
  },
  computed: {
    photoPreview() {
      return this.photo ? URL.createObjectURL(this.photo) : null;
    },
  },
    methods: { 
      goBack() {
        // Navigate back to the patient list
        this.$router.push('/patient');
      },
      
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Perform additional checks or validations if needed

        this.photo = file;
      }
    },
      validateCNS(cns) {
      const validaTamanho = cns.length === 15;
      const validaInicio = ['1', '2', '7', '8', '9'].includes(cns[0]);

      if (validaTamanho && validaInicio) {
        if (['7', '8', '9'].includes(cns[0])) {
          const soma = cns.split('').reduce((total, value, index) => total + value * (15 - index), 0);
          return soma % 11 === 0;
        } else {
          const pis = cns.substring(0, 11);
          const soma = pis.split('').reduce((total, value, index) => total + value * (15 - index), 0);
          const resto = soma % 11;
          const dv = resto === 0 ? 0 : 11 - resto;
          const resultado = dv === 10 ? `${pis}001${11 - ((soma + 2) % 11)}` : `${pis}000${dv}`;
          return resultado === cns;
        }
      }

      return false;
    },

    validateCNSProv(cns) {
      const validaTamanho = cns.length === 15;
      const validaInicio = ['1', '2', '7', '8', '9'].includes(cns[0]);

      if (validaTamanho && validaInicio) {
        const soma = cns.split('').reduce((total, value, index) => total + value * (15 - index), 0);
        return soma % 11 === 0;
      }

      return false;
    },

    savePatient() {
     // Validate CNS
     const isValidCNS = this.validateCNS(this.cns);
      const isValidCNSProv = this.validateCNSProv(this.cns);

      if (!isValidCNS && !isValidCNSProv) {
        alert('CNS inválido! Por favor, verifique o número do CNS e tente novamente.');
        return;
      }


  const patient = {
    photo: this.photo,
    name: this.name,
    motherName: this.motherName,
    birthdate: this.birthdate,
    cpf: this.cpf,
    cns: this.cns,
    address: {
      street: this.address.street,
      neighborhood: this.address.neighborhood,
      city: this.address.city,
      state: this.address.state
    }
  };
  this.$router.push('/patient');

  axios.post('./api/patients', patient)
    .then(response => {
      (response.data);
      // Reset the form fields
      this.name = '';
      this.motherName = '';
      this.birthdate = '';
      this.cpf = '';
      this.cns = '';
      this.cep = '';
      this.address = {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
      };
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao cadastrar paciente!');
    });
},
fetchAddress() {
  if (this.cep.length === 9) {
    const cepWithMask = this.cep;

    fetch(`https://viacep.com.br/ws/${cepWithMask}/json/`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { logradouro, bairro, localidade, uf } = data;
        this.address.street = logradouro;
        this.address.neighborhood = bairro;
        this.address.city = localidade;
        this.address.state = uf;
      })
      .catch(error => {
        console.error(error);
      });
  }
},
}
      }
    
  
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

  .photo-preview img {
    width: 200px;
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
