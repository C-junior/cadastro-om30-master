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
        server.create('patient', { name: "Test 1", motherName: "mom1", birthdate: "2023-05-13", cpf: "020.522.843-75", cns: "1233123", address: "JK" });
        server.create('patient', { name: "Test 2", motherName: "mom1", birthdate: "2023-05-13", cpf: "020.522.843-73", cns: "1233123", address: "JK" });
        server.create('patient', { name: "Test 3", motherName: "mom1", birthdate: "2023-05-13", cpf: "020.522.843-72", cns: "1233123", address: "JK" });
      server.create('patient', { name: "Test 4", motherName: "mom1", birthdate: "2023-05-13", cpf: "020.522.843-72", cns: "1233123", address: "JK" });
    },
  });

  return server;
}
