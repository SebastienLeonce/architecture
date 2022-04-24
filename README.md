---
title: "README"
subtitle: "A brief description of our project"
summary: "This is the README"
author: ['Sebastien LEONCE', 'Alexis DA COSTA']
date: "2022-04-24"
numbersections : true
---
# Architecture

[![Docker CI/CD](https://github.com/SebastienLeonce/architecture/actions/workflows/docker_ci_cd.yml/badge.svg)](https://github.com/SebastienLeonce/architecture/actions/workflows/docker_ci_cd.yml)

## How to run it ?
### Running tests

```bash
yarn test
```

### Running in dev environment 

```bash
yarn dev
```

### Running in prod environment

```bash
yarn prod
```

## List of services 
### Local
- **grafana** : [https://grafana.localhost](https://grafana.localhost) -  *Metrics observability dashboard*
- **prometheus** : [https://prometheus.localhost](https://prometheus.localhost) - *System monitoring and alerting*
- **blog-api** : [https://api.localhost](https://api.localhost) - API for blog management
- **notification-sender-ms** : [https://api.localhost/docs](https://api.localhost/docs) - *Microservice for sending notifications, using Cloudmailme for mail sending*
- **cadvisor** : [https://cadvisor.localhost](https://cadvisor.localhost) - *Usage resources monitoring*
- **traefik** : [https://traefik.localhost](https://traefik.localhost) - *Edge router to publish microservices*
- **db-ui** : [https://db-ui.localhost](https://db-ui.localhost) - *Database management UI*
- **blog-mf** : [https://localhost](https://localhost) - *Blog microfrontend*
- **rabbitmq** : [https://rabbitmq.localhost](https://rabbitmq.localhost) - *RabbitMQ management UI*
- **sonarqube** : [https://sonarqube.localhost](https://sonarqube.localhost) - *Code quality monitoring and analysis*
- **loki** - *Logging service used on a grafana dashboard.*
- **promtail** - *Logging service need by Loki for grafana dashboard.*
### Production
- **grafana** : [https://grafana.architecture.sleonce.dev](https://grafana.architecture.sleonce.dev) -  *Metrics observability dashboard*
- **prometheus** : [https://prometheus.architecture.sleonce.dev](https://prometheus.architecture.sleonce.dev) - *System monitoring and alerting*
- **blog-api** : [https://api.architecture.sleonce.dev](https://api.architecture.sleonce.dev) - API for blog management
- **notification-sender-ms** : [https://api.architecture.sleonce.dev/docs](https://api.architecture.sleonce.dev/docs) - *Microservice for sending notifications*
- **cadvisor** : [https://cadvisor.architecture.sleonce.dev](https://cadvisor.architecture.sleonce.dev) - *Usage resources monitoring*
- **traefik** : [https://traefik.architecture.sleonce.dev](https://traefik.architecture.sleonce.dev) - *Edge router to publish microservices*
- **db-ui** : [https://db-ui.architecture.sleonce.dev](https://db-ui.architecture.sleonce.dev) - *Database management UI*
- **blog-mf** : [https://architecture.sleonce.dev](https://architecture.sleonce.dev) - *Blog microfrontend*
- **rabbitmq** : [https://rabbitmq.architecture.sleonce.dev](https://rabbitmq.architecture.sleonce.dev) - *RabbitMQ management UI*
- **sonarqube** : [https://sonarqube.architecture.sleonce.dev](https://sonarqube.architecture.sleonce.dev) - *Code quality monitoring and analysis*
- **loki** - *Logging service used on a grafana dashboard.*
- **promtail** - *Logging service need by Loki for grafana dashboard.*

## API documentation

- [Swagger UI blog-api on dev environment](https://api.architecture.sleonce.dev/docs) 
- [Swagger UI blog-api on production environment](https://api.localhost/docs) 