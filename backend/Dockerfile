FROM node:18-alpine
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm ci

# Copiar el resto del código de la aplicación
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Copiar y dar permisos de ejecución al script de entrada
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponer el puerto y configurar el entrypoint
ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]
