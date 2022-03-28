# architecture

[![Docker CI/CD](https://github.com/SebastienLeonce/architecture/actions/workflows/docker_ci_cd.yml/badge.svg)](https://github.com/SebastienLeonce/architecture/actions/workflows/docker_ci_cd.yml)

## test

```bash
yarn test
```

## dev

```bash
yarn dev
```

## prod

```bash
yarn prod
```

- grafana : [https://grafana.localhost](https://grafana.localhost)
- prometheus : [https://prometheus.localhost](https://prometheus.localhost)
- api docs : [https://api.localhost](https://api.localhost)
- cadvisor : [https://cadvisor.localhost](https://cadvisor.localhost)
- traefik : [https://traefik.localhost](https://traefik.localhost)
- db-ui : [https://db-ui.localhost](https://db-ui.localhost)
- blog : [https://localhost](https://localhost)
- rabbitmq : [https://rabbitmq.localhost](https://rabbitmq.localhost)
- sonarqube : [https://sonarqube.localhost](https://sonarqube.localhost)

# HTTPS

- sudo snap install --classic certbot
- sudo certbot certonly -d \*.architecture.sleonce.dev --manual
