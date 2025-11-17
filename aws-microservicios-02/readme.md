1. Scaffold the mono-repo

```bash
npm i -g @nestjs/cli
mkdir nest-micro-full && cd nest-micro-full

# three independent apps
nest new math-service --strict
nest new string-service --strict
nest new api-gateway --strict

# install the micro-services package in every app
for d in math-service string-service api-gateway; do
cd $d && npm i @nestjs/microservices && cd ..
done

```
