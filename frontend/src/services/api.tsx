// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Certifique-se que a porta está correta
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para debug (remover em produção)
api.interceptors.request.use(
  (config) => {
    console.log('Fazendo requisição para:', config.url);
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.data);
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', error);
    return Promise.reject(error);
  }
);

export default api;