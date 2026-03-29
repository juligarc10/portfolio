---
title: "Plataforma SAAS"
tagline: "Plataforma multi-tenant enterprise con Clean Architecture hexagonal"
description: "Gestiona organizaciones, suscripciones, aprovisionamiento de servidores e identidad (Keycloak + SCIM 2.0) con aislamiento completo por tenant. Arquitectura hexagonal en 7 módulos Gradle con tests de aceptación (Cucumber) y CI/CD en Bitbucket Pipelines. La decisión de elegir arquitectura hexagonal sobre arquitectura en capas permite testar el dominio de forma completamente independiente del framework Spring."
role: "Full-Stack Engineer"
period: "2023 – actualidad"
image: "/images/projects/daas-api.png"
techs:
  [
    "Java 17",
    "Spring Boot",
    "MongoDB",
    "Keycloak",
    "SCIM 2.0",
    "Docker",
    "Gradle",
    "GraphQL",
    "Cucumber",
    "Bitbucket Pipelines",
    "SonarQube",
  ]
categories: ["backend", "frontend", "devops"]
featured: true
order: 1
highlights:
  - "Aislamiento multi-tenant con jerarquía Organization → Subscription → Server"
  - "Aprovisionamiento SCIM 2.0 integrado con Keycloak para SSO enterprise"
  - "Arquitectura hexagonal en 7 módulos Gradle con cobertura BDD completa"
  - "CI/CD con Bitbucket Pipelines + quality gate SonarQube en producción"
  - "SCIM provisioning permite onboarding automatizado de miles de usuarios enterprise"
---
