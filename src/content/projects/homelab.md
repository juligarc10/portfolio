---
title: "Homelab Server"
tagline: "PC reciclado convertido en servidor de producción con k3s y Cloudflare Tunnel"
description: "Conversión de un PC personal antiguo en un servidor de producción real: orquestación de contenedores con k3s (Kubernetes ligero), despliegue continuo desde GitHub Actions, y exposición segura de servicios a internet sin IP pública ni puertos abiertos gracias a Cloudflare Tunnel. Este mismo portfolio — y todos los proyectos que contiene — corren sobre esa infraestructura. El hecho de que estés leyendo esto es la prueba."
role: "Autor (proyecto personal)"
period: "2025"
image: "/images/projects/homelab.png"
techs:
  [
    "k3s",
    "Kubernetes",
    "Docker",
    "GitHub Actions",
    "Cloudflare Tunnel",
    "Nginx",
    "Linux",
  ]
categories: ["devops"]
links:
  live: "https://jgp-server.com"
featured: true
order: 7
highlights:
  - "Clúster k3s single-node sobre hardware reciclado — coste cero en infraestructura cloud"
  - "Cloudflare Tunnel para exposición segura sin abrir puertos ni necesitar IP pública"
  - "CI/CD con GitHub Actions: push de tag → build → deploy automático en el servidor"
  - "Multi-servicio con routing por dominio: portfolio, RAG frontend, RAG backend en el mismo nodo"
  - "Imágenes Docker importadas directamente en el runtime de containerd de k3s"
---
