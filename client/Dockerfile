# Etapa de construcción
FROM node:18-alpine AS build
WORKDIR /app

# Copiar solo archivos de dependencias primero (cache)
COPY package*.json ./
RUN npm ci

# Copiar resto del código y compilar
COPY . .

ARG VITE_API_URL
ARG CLIENT_URL

ENV VITE_API_URL=$VITE_API_URL
ENV CLIENT_URL=$CLIENT_URL



RUN npm run build

# Etapa de producción: usar nginx para servir
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
