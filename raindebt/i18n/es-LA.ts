export default {
  common: { loading: "Cargando...", error: "Ocurri\u00F3 un error", retry: "Reintentar", save: "Guardar", cancel: "Cancelar", delete: "Eliminar", edit: "Editar", back: "Volver", confirm: "Confirmar", search: "Buscar" },
  auth: {
    login: { title: "Bienvenido", subtitle: "Inicia sesi\u00F3n para monitorear tus propiedades", email: "Correo electr\u00F3nico", password: "Contrase\u00F1a", signIn: "Iniciar Sesi\u00F3n", forgotPassword: "\u00BFOlvidaste tu contrase\u00F1a?", noAccount: "\u00BFNo tienes cuenta?", signUp: "Registrarse" },
    register: { title: "Crear Cuenta", subtitle: "Comienza a monitorear tus propiedades hoy", fullName: "Nombre Completo", email: "Correo electr\u00F3nico", password: "Contrase\u00F1a", confirmPassword: "Confirmar Contrase\u00F1a", createAccount: "Crear Cuenta", hasAccount: "\u00BFYa tienes una cuenta?", signIn: "Iniciar Sesi\u00F3n" },
  },
  dashboard: {
    greeting: "{{timeOfDay}}, {{name}}", morning: "Buenos d\u00EDas", afternoon: "Buenas tardes", evening: "Buenas noches",
    summary: { properties: "Propiedades", reports: "Informes", alerts: "Alertas" },
    emptyState: { title: "Sin Propiedades", subtitle: "Agrega tu primera propiedad para iniciar el monitoreo clim\u00E1tico", addButton: "Agregar Propiedad" },
    card: { lastRain: "\u00DAltima lluvia: {{days}}d", spi: "SPI: {{value}}", drought: "Sequ\u00EDa {{days}}d", excess: "Exceso {{days}}d", normal: "Normal", viewReport: "Ver Informe" },
  },
  addProperty: {
    title: "Agregar Propiedad", name: "Nombre de la Propiedad", namePlaceholder: "ej: Hacienda San Juan", area: "\u00C1rea (hect\u00E1reas)", areaPlaceholder: "ej: 45", municipality: "Municipio", state: "Estado/Provincia", culture: "Cultivo Principal",
    cultures: { soja: "Soja", milho: "Ma\u00EDz", cafe: "Caf\u00E9", cana: "Ca\u00F1a de az\u00FAcar", pastagem: "Pastizal", outros: "Otros" },
    location: "Ubicaci\u00F3n", useGPS: "Usar Mi Ubicaci\u00F3n", latitude: "Latitud", longitude: "Longitud", submit: "Iniciar Monitoreo", success: "\u00A1Propiedad agregada! El monitoreo ha comenzado.",
  },
  property: {
    spiGauge: { title: "\u00CDndice SPI", current: "SPI Actual" },
    precipitation: { title: "Precipitaci\u00F3n (90 d\u00EDas)", daily: "Diaria (mm)", historicalAvg: "Promedio Hist\u00F3rico" },
    climate: { accumulated30d: "Acumulado 30d", historicalAvg: "Prom. Hist\u00F3rico", tempMax: "Temp. M\u00E1xima", tempMin: "Temp. M\u00EDnima", deficit: "D\u00E9ficit", surplus: "Exceso" },
    events: { title: "Eventos Detectados", empty: "Ning\u00FAn evento clim\u00E1tico extremo detectado. Sus propiedades est\u00E1n siendo monitoreadas 24/7.", drought: "Sequ\u00EDa", excessRain: "Exceso de Lluvia", frost: "Helada" },
  },
  settings: { title: "Configuraci\u00F3n", profile: "Perfil", language: "Idioma", notifications: "Notificaciones", about: "Acerca de", version: "Versi\u00F3n", signOut: "Cerrar Sesi\u00F3n", signOutConfirm: "\u00BFEst\u00E1s seguro que deseas cerrar sesi\u00F3n?" },
  spiClassification: { extremely_wet: "Extremadamente H\u00FAmedo", very_wet: "Muy H\u00FAmedo", moderately_wet: "Moderadamente H\u00FAmedo", near_normal: "Cercano al Normal", moderately_dry: "Moderadamente Seco", severely_dry: "Severamente Seco", extremely_dry: "Extremadamente Seco" },
  units: { mm: "mm", celsius: "\u00B0C", fahrenheit: "\u00B0F", hectares: "ha", days: "d\u00EDas" },
} as const;
