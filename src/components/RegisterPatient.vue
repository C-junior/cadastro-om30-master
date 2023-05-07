<template>
  <div>
    <h1>Cadastro de Paciente</h1>
    <form @submit.prevent="savePatient">
      <div>
    <label for="photo">Foto do Paciente:</label>
    <input type="file" id="photo" name="photo" @change="handlePhotoUpload">
  </div>
 
    <!-- Photo preview -->
    <div v-if="photo">
      <label>Foto Preview:</label>
      <img :src="photoPreview" alt="Preview" width="200">
    </div>
    
      <div>
        <label for="name">Nome Completo do Paciente*:</label>
        <input type="text" id="name" name="name" v-model="name" required>
      </div>
      <div>
        <label for="motherName">Nome Completo da Mãe*:</label>
        <input type="text" id="motherName" name="motherName" v-model="motherName" required>
      </div>
      <div>
        <label for="birthdate">Data de Nascimento*:</label>
        <input type="date" id="birthdate" name="birthdate" v-model="birthdate" required>
      </div>
      <div>
        <label for="cpf">CPF*:</label>
        <input type="text" id="cpf" name="cpf" v-model="cpf" required>
      </div>
      <div>
        <label for="cns">CNS*:</label>
        <input type="text" id="cns" name="cns" v-model="cns" required>
      </div>
      <div>
        <label for="cep">CEP:</label>
        <input id="cep" type="text" v-model="cep" placeholder="Digite o CEP" @blur="fetchAddress" v-mask="['#####-###']">
      </div>     
      <div>
        <label for="rua">Rua:</label>
        <input id="rua" type="text" v-model="address.street" placeholder="Rua">
      </div>
      <div>
        <label for="bairro">Bairro:</label>
        <input id="bairro" type="text" v-model="address.neighborhood" placeholder="Bairro">
      </div>
      <div>
        <label for="cidade">Cidade:</label>
        <input id="cidade" type="text" v-model="address.city" placeholder="Cidade">
      </div>
      <div>
        <label for="estado">Estado:</label>
        <input id="estado" type="text" v-model="address.state" placeholder="Estado">
      </div>
      <button type="submit">Salvar</button>
      <button @click="goBack">Voltar</button>
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
      alert('Paciente cadastrado com sucesso!');
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