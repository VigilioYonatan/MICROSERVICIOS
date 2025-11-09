🪶 1️⃣ Crear tu dominio en DuckDNS

Entra a 👉 https://www.duckdns.org

Inicia sesión con GitHub, Google o Twitter.

miapp.duckdns.org
Copia tu token (clave personal), lo usarás más adelante si quieres autoactualizar la IP.

🌐 2️⃣ Configurar tu IP

DuckDNS automáticamente asocia tu dominio con tu IP pública actual.
Puedes cambiarla con la ip de tu servidor.

💡 Si usas un VPS (DigitalOcean, AWS, Contabo, etc.), no necesitas DDNS, la IP ya es fija.

🔐 2 Crear el archivo con tu token DuckDNS

Crea la carpeta y archivo secreto:

```bash
sudo mkdir -p /root/.secrets/certbot
sudo nano /root/.secrets/certbot/duckdns.ini
```

Agrega tu token:

dns_duckdns_token = TU_TOKEN_DE_DUCKDNS

Guarda y cierra.
Luego protege el archivo:

sudo chmod 600 /root/.secrets/certbot/duckdns.ini

⚙️ 3️⃣ Configurar Nginx

En tu servidor (por ejemplo Ubuntu):

```bash
sudo apt update
sudo apt install nginx -y

# apache
sudo apt install apache2 -y
```

Luego crea el archivo de configuración:

```bash
sudo nano /etc/nginx/sites-available/miapp.conf
# apache
sudo nano /etc/apache2/sites-available/000-default.conf
```

Y pega esto 👇

```nginx
server {
listen 80;
server_name miapp.duckdns.org;

    root /var/www/miapp;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

}
```

```apache
<VirtualHost *:80>
    ServerName vigilio.duckdns.org
    DocumentRoot /var/www/miapp

</VirtualHost>
```

Guarda y activa el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/miapp.conf /etc/nginx/sites-enabled/
sudo mkdir -p /var/www/miapp
echo "<h1>Hola desde DuckDNS + Nginx</h1>" | sudo tee /var/www/miapp/index.html
sudo systemctl restart nginx

# apache
sudo systemctl restart apache2
```

Ahora entra en tu navegador:
👉 http://miapp.duckdns.org

Deberías ver tu página HTML 😎

Si pasa algo raro

```bash
sudo systemctl status nginx
sudo systemctl restart nginx
```

🔒 4️⃣ (Opcional) Añadir SSL gratis con Let’s Encrypt

Instala Certbot:

```bash
sudo apt update
sudo apt install snapd -y
sudo systemctl enable --now snapd.socket
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
certbot --version
# certbot 5.1.0
```

Ejecuta:

```bash
sudo certbot --nginx -d miapp.duckdns.org
```

Esto:

-   Generará un certificado HTTPS gratis
-   Configurará Nginx automáticamente
-   Activará renovación automática

Ahora podrás entrar en:
👉 https://miapp.duckdns.org
🔐 Con candado verde y SSL válido

https://www.yougetsignal.com/tools/open-ports/
