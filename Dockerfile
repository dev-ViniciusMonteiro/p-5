FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta da aplicação
EXPOSE 3030

# Comando para iniciar a aplicação
CMD ["npm", "start"]