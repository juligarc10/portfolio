---
title: "Submerge"
tagline: "Extensión de Chrome para aprender idiomas viendo Netflix y YouTube"
description: "Extensión de Chrome que convierte cualquier sesión de Netflix o YouTube en una clase de idiomas: al pasar el ratón por las palabras de los subtítulos aparece la traducción instantánea, se pueden guardar palabras con su contexto y se hace seguimiento del progreso diario con un sistema de streaks. Construida con React, Chrome Manifest V3 y la API de MyMemory."
role: "Autor (proyecto personal)"
period: "2025"
image: "/images/projects/submerge.png"
techs:
  [
    "React",
    "TypeScript",
    "Chrome Extension",
    "Manifest V3",
    "Vite",
    "CRXJS",
  ]
categories: ["frontend"]
links:
  live: "https://chromewebstore.google.com/detail/submerge/cmhidojdmmclgddkihamijpnggfpaljb"
featured: false
order: 9
highlights:
  - "Content scripts que interceptan y modifican los subtítulos de Netflix y YouTube en tiempo real"
  - "Arquitectura de extensión con service worker, content script y popup UI comunicándose por message passing"
  - "Sistema de vocabulario con contexto de la frase y streak de días consecutivos de estudio"
  - "Detección de plataforma para manejar los diferentes selectores DOM de Netflix vs YouTube"
---
