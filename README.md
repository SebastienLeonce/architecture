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

- grafana : [http://grafana.localhost](http://grafana.localhost)
- prometheus : [http://prometheus.localhost](http://prometheus.localhost)
- api docs : [http://api.localhost](http://api.localhost)
- cadvisor : [http://cadvisor.localhost](http://cadvisor.localhost)
- traefik : [http://traefik.localhost](http://traefik.localhost)
- db-ui : [http://db-ui.localhost](http://db-ui.localhost)

# HTTPS

- sudo snap install --classic certbot
- sudo certbot certonly -d *.architecture.sleonce.dev --manual
