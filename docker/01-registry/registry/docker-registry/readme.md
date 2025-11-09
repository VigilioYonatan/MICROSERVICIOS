⚙️ 1. Crear usuario para el registry

Primero, crea la carpeta y el archivo de autenticación:

```
/docker-registry
├── docker-compose.yml
├── auth/htpasswd
├── data/
└── nginx/
    └── conf.d/
        └── registry.conf

```

```bash
mkdir -p /docker-registry/auth /docker-registry/data
docker run --rm --entrypoint htpasswd httpd:2 -Bbn register-vigilio 123456 > auth/htpasswd

```

✅ 6. Probar desde otra máquina

```bash
docker login registry.miempresa.com

# Username: admin

# Password: 123456

```

Luego prueba subir y bajar una imagen:

```bash
docker pull nginx
docker tag nginx registry.miempresa.com/nginx
docker push registry.miempresa.com/nginx
docker pull registry.miempresa.com/nginx
```

🔒 7. Seguridad adicional (opcional)

Puedes:

-   Limitar IPs en el bloque nginx.conf
-   Agregar fail2ban o firewall (ufw)
-   Renovar certificados automáticamente con un cron:

```bash
certbot renew --quiet
```

docker-compose run --rm certbot \
 certbot certonly \
 --webroot \
 --webroot-path=/var/lib/letsencrypt \
 -d vigilio.duckdns.org \
 --email yonatanvigiliolavado09@gmail.com \
 --agree-tos \
 --no-eff-email
