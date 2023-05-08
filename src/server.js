// src/server.js
import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      patient: Model,
    },

    routes() {
      this.namespace = 'api';

      this.get('/patients', (schema, request) => {
        const name = request.queryParams.name;
        if (name) {
          return schema.patients.where(patient => patient.name.toLowerCase().includes(name.toLowerCase()));
        }
        return schema.patients.all();
      });
      this.get('/patients/:id', (schema, request) => {
        const id = request.params.id;
        return schema.patients.find(id);
      });
      
      this.put('/patients/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
    
        // Find the patient with the given id
        const patient = schema.patients.find(id);
    
        if (!patient) {
          return new Response(404, {}, { message: 'Patient not found' });
        }
    
        // Update the patient record with the new attributes
        patient.update(attrs);
    
        // Return a response indicating the success of the update
        return {
          message: 'Patient updated successfully!',
        };
      });

      this.post('/patients', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.patients.create(attrs);
      });

      this.delete('/patients/:id', (schema, request) => {
        const id = request.params.id;
        return schema.patients.find(id).destroy();
      });
       // Pass through the request to ViaCEP API
       this.passthrough("https://viacep.com.br/ws/**");
    },

    seeds(server) {
      
      server.create('patient', {
        name: 'John Doe',
        motherName: 'Jane Doe',
        birthdate: '2023-05-13',
        cpf: '111.222.333-44',
        cns: '987654321098765',
        address: {
          street: '123 Main St',
          neighborhood: 'Downtown',
          city: 'New York',
          state: 'NY'
        }
      });
    
      server.create('patient', {
        name: 'Alice Smith',
        motherName: 'Carol Smith',
        birthdate: '2023-05-13',
        cpf: '555.666.777-88',
        cns: '543210987654321',
        address: {
          street: '456 Elm St',
          neighborhood: 'Suburbia',
          city: 'Los Angeles',
          state: 'CA'
        }
      });
    
      server.create('patient', {
        name: 'David Johnson',
        motherName: 'Susan Johnson',
        birthdate: '2023-05-13',
        cpf: '999.888.777-66',
        cns: '123456789098765',
        address: {
          street: '789 Oak Ave',
          neighborhood: 'Rural',
          city: 'Chicago',
          state: 'IL'
        }
      });
    
      server.create('patient', {
        name: 'Emily Wilson',
        motherName: 'Olivia Wilson',
        birthdate: '2023-05-13',
        cpf: '444.555.666-77',
        cns: '876543210987654',
        address: {
          street: '321 Pine Rd',
          neighborhood: 'Suburbia',
          city: 'San Francisco',
          state: 'CA'
        }
      });
    },
  });

  return server;
}
