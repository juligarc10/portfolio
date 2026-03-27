---
title: "Denodo AAS API"
tagline: "Plataforma multi-tenant enterprise con Clean Architecture hexagonal"
description: "API RESTful que alimenta la oferta DaaS de Denodo. Gestiona organizaciones, suscripciones, aprovisionamiento de servidores e identidad (Keycloak + SCIM 2.0) con aislamiento completo por tenant. Arquitectura hexagonal en 7 módulos Gradle con tests de aceptación BDD (Cucumber) y CI/CD en Bitbucket Pipelines. La decisión de elegir arquitectura hexagonal sobre arquitectura en capas permite testar el dominio de forma completamente independiente del framework Spring."
role: "Full-Stack Engineer (Backend Lead)"
period: "2023 – actualidad"
image: "/images/projects/daas-api.png"
techs: ["Java 17", "Spring Boot", "MongoDB", "Keycloak", "SCIM 2.0", "Docker", "Gradle", "Cucumber", "Bitbucket Pipelines", "SonarQube"]
categories: ["backend", "devops"]
links:
  live: "https://community.denodo.com"
featured: true
order: 1
highlights:
  - "Aislamiento multi-tenant con jerarquía Organization → Subscription → Server"
  - "Aprovisionamiento SCIM 2.0 integrado con Keycloak para SSO enterprise"
  - "Arquitectura hexagonal en 7 módulos Gradle con cobertura BDD completa"
  - "CI/CD con Bitbucket Pipelines + quality gate SonarQube en producción"
  - "SCIM provisioning permite onboarding automatizado de miles de usuarios enterprise"
---
