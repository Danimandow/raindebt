export default {
  common: { loading: "Carregando...", error: "Ocorreu um erro", retry: "Tentar novamente", save: "Salvar", cancel: "Cancelar", delete: "Excluir", edit: "Editar", back: "Voltar", confirm: "Confirmar", search: "Buscar" },
  auth: {
    login: { title: "Bem-vindo de Volta", subtitle: "Entre para monitorar suas propriedades", email: "Email", password: "Senha", signIn: "Entrar", forgotPassword: "Esqueceu a senha?", noAccount: "N\u00E3o tem conta?", signUp: "Criar Conta" },
    register: { title: "Criar Conta", subtitle: "Comece a monitorar suas propriedades hoje", fullName: "Nome Completo", email: "Email", password: "Senha", confirmPassword: "Confirmar Senha", createAccount: "Criar Conta", hasAccount: "J\u00E1 tem uma conta?", signIn: "Entrar" },
  },
  dashboard: {
    greeting: "{{timeOfDay}}, {{name}}", morning: "Bom dia", afternoon: "Boa tarde", evening: "Boa noite",
    summary: { properties: "Propriedades", reports: "Laudos", alerts: "Alertas" },
    emptyState: { title: "Nenhuma Propriedade", subtitle: "Adicione sua primeira propriedade para iniciar o monitoramento clim\u00E1tico", addButton: "Adicionar Propriedade" },
    card: { lastRain: "\u00DAltima chuva: {{days}}d", spi: "SPI: {{value}}", drought: "Seca h\u00E1 {{days}}d", excess: "Excesso h\u00E1 {{days}}d", normal: "Normal", viewReport: "Ver Laudo" },
  },
  addProperty: {
    title: "Adicionar Propriedade", name: "Nome da Propriedade", namePlaceholder: "ex: Fazenda S\u00E3o Jo\u00E3o", area: "\u00C1rea (hectares)", areaPlaceholder: "ex: 45", municipality: "Munic\u00EDpio", state: "Estado", culture: "Cultura Principal",
    cultures: { soja: "Soja", milho: "Milho", cafe: "Caf\u00E9", cana: "Cana-de-a\u00E7\u00FAcar", pastagem: "Pastagem", outros: "Outros" },
    location: "Localiza\u00E7\u00E3o", useGPS: "Usar Minha Localiza\u00E7\u00E3o", latitude: "Latitude", longitude: "Longitude", submit: "Iniciar Monitoramento", success: "Propriedade adicionada! O monitoramento foi iniciado.",
  },
  property: {
    spiGauge: { title: "\u00CDndice SPI", current: "SPI Atual" },
    precipitation: { title: "Precipita\u00E7\u00E3o (90 dias)", daily: "Di\u00E1ria (mm)", historicalAvg: "M\u00E9dia Hist\u00F3rica" },
    climate: { accumulated30d: "Acumulado 30d", historicalAvg: "M\u00E9dia Hist\u00F3rica", tempMax: "Temp. M\u00E1xima", tempMin: "Temp. M\u00EDnima", deficit: "D\u00E9ficit", surplus: "Excesso" },
    events: { title: "Eventos Detectados", empty: "Nenhum evento clim\u00E1tico extremo detectado. Suas propriedades est\u00E3o sendo monitoradas 24/7.", drought: "Seca", excessRain: "Excesso de Chuva", frost: "Geada" },
  },
  settings: { title: "Configura\u00E7\u00F5es", profile: "Perfil", language: "Idioma", notifications: "Notifica\u00E7\u00F5es", about: "Sobre", version: "Vers\u00E3o", signOut: "Sair", signOutConfirm: "Tem certeza que deseja sair?" },
  spiClassification: { extremely_wet: "Extremamente \u00DAmido", very_wet: "Muito \u00DAmido", moderately_wet: "Moderadamente \u00DAmido", near_normal: "Pr\u00F3ximo ao Normal", moderately_dry: "Moderadamente Seco", severely_dry: "Severamente Seco", extremely_dry: "Extremamente Seco" },
  units: { mm: "mm", celsius: "\u00B0C", fahrenheit: "\u00B0F", hectares: "ha", days: "dias" },
} as const;
