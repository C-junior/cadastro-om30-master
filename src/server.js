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
