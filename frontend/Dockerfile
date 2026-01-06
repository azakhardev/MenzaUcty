# --- 1. Stage: Build (Node.js) ---
FROM node:20-alpine AS build
WORKDIR /app

# Kopírování package.json a lock souboru (pro lepší cachování)
# Cesta je relativní k Dockerfile ve složce frontend -> menza-web
COPY menza-web/package.json menza-web/package-lock.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu
COPY menza-web/ .

# Build aplikace (vytvoří složku 'dist')
RUN npm run build

# --- 2. Stage: Serve (Nginx) ---
FROM nginx:alpine
# Zkopírování buildu z předchozí fáze do složky, odkud Nginx servíruje web
COPY --from=build /app/dist /usr/share/nginx/html

# Zkopírování naší konfigurace pro Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]