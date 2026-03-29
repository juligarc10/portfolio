---
title: "Nexus"
tagline: "DDD · CQRS · Event Sourcing desde cero en TypeScript — sin magia de framework"
description: "Monorepo de aprendizaje arquitectónico: una plataforma SaaS multi-tenant construida en TypeScript puro para entender DDD, CQRS y Event Sourcing sin depender de abstracciones de framework. Cada patrón se implementa explícitamente — Unit of Work, Optimistic Locking, Result<T,E>, Outbox Pattern — con Testcontainers para tests de integración contra base de datos real. El objetivo: que los principios sean inseparables del código que los implementa."
role: "Autor (proyecto de aprendizaje)"
period: "2025 – actualidad"
image: "/images/projects/nexus.png"
techs:
  [
    "TypeScript",
    "Node.js",
    "Fastify",
    "PostgreSQL",
    "Testcontainers",
    "DDD",
    "CQRS",
    "Event Sourcing",
  ]
categories: ["backend"]
links:
  github: "https://github.com/juligarc10/nexus"
featured: true
order: 3
highlights:
  - "DDD táctico completo: Aggregates, Value Objects, Domain Events, Repositories"
  - "CQRS con separación explícita de comandos y queries sin librería externa"
  - "Event Sourcing con Outbox Pattern para garantías de consistencia eventual"
  - "Unit of Work + Optimistic Locking implementados manualmente sobre node-postgres"
  - "Testcontainers en cada test de integración — sin mocks de base de datos"
---
