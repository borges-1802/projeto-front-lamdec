# Projeto de Front-End para LAMDEC UFRJ

## Entregas Esperadas

- O código-fonte completo da API (pode ser só um arquivo).
- O código-fonte completo do dashboard (frontend).
- Um arquivo README.md explicando:
 -> Como rodar o projeto por completo (backend e frontend);
 -> Qualquer dependência ou passo adicional necessário.



## Resumo do Projeto

Explicação do que fiz com o pequeno passo a passo do que fazer.

### Backend

Comecei criando a pasta `backend` na minha máquina usando a WSL Debian, e logo após, coloquei os arquivos `.json` nela.
E para começar a codar, criei um ambiente virtual com o pyhton3 utilzando: `python -m  venv venv`, e entrei nesse ambiente com: `source venv/bin/activate` (no windows a maneira é diferente).

Após isso, instalei a `fastapi` e `uvicorn` através do `pip`, e salvei as dependencias em `requirements.txt`.

Com isso, implementei (com um pouco de dificuldade), a API no arquivo `main.py`.

**Para rodar a API(back-end): `uvicorn main:app --reload`** (lembrando que se estiver dentro da máquina virtual, precisa rodar lá, se estiver fora, as bibliotecas não serão reconhecidas globalmente).

E aí é só acessar: http://localhost:8000/

*Lembre sempre de estar na pasta do backend.

### Frontend (React)

Para o Frontend utilizei `React + TS`.

Criei a pasta frontend com o template do React e separei a `/src` com alguns diretórios para facilitar a navegação das páginas: `assets`, `components`, `pages`, `routes`, `services` e `utils`.

No diretório `/frontend`, não esqueça de dar `npm install` para instalar as bibliotecas do node, e as bibliotecas do projeto: `styled-components`, `axios`, `recharts` `react-router-dom` `lucide-react` `react-chartjs-2`. (não necessariamente todas estão no protótipo final).

Bom esclarecer que quando fui abrir o react, estava dando um bug local e usei `npm install --save-dev ajv@^7` que consegui usar o "code live".

**Para rodar o front-end: `npm start`**

Você pode passear pelas páginas `home` e `dashboard`, no qual terá o dashboard na primeira (não consegui implementar do jeito que queria por problemas diretos na API) e consultas diretas no dashboard, sendo possível entrar na pagina no botão de pesquisa.

## Pontos Extras (Diferenciais)

- Responsividade: A aplicação se adapta bem a (alguns) diferentes tamanhos de tela.
- Design: A aplicação é visualmente agradável e intuitiva.
- Frameworks: Foi utlizado React.
- Git: O projeto está disponível no github: https://github.com/borges-1802/projeto-front-lamdec

### Considerações

Agradeço a oportunidade e espero encontrar vocês na entrevista!
João.