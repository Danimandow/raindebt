export default {
  common: { loading: "Loading...", error: "An error occurred", retry: "Retry", save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit", back: "Back", confirm: "Confirm", search: "Search" },
  auth: {
    login: { title: "Welcome Back", subtitle: "Sign in to monitor your properties", email: "Email", password: "Password", signIn: "Sign In", forgotPassword: "Forgot password?", noAccount: "Don't have an account?", signUp: "Sign Up" },
    register: { title: "Create Account", subtitle: "Start monitoring your properties today", fullName: "Full Name", email: "Email", password: "Password", confirmPassword: "Confirm Password", createAccount: "Create Account", hasAccount: "Already have an account?", signIn: "Sign In" },
  },
  dashboard: {
    greeting: "Good {{timeOfDay}}, {{name}}", morning: "morning", afternoon: "afternoon", evening: "evening",
    summary: { properties: "Properties", reports: "Reports", alerts: "Alerts" },
    emptyState: { title: "No Properties Yet", subtitle: "Add your first property to start climate monitoring", addButton: "Add Property" },
    card: { lastRain: "Last rain: {{days}}d ago", spi: "SPI: {{value}}", drought: "Drought {{days}}d", excess: "Excess rain {{days}}d", normal: "Normal", viewReport: "View Report" },
  },
  addProperty: {
    title: "Add Property", name: "Property Name", namePlaceholder: "e.g., Farm", area: "Area (hectares)", areaPlaceholder: "e.g., 45", municipality: "Municipality", state: "State", culture: "Main Crop",
    cultures: { soja: "Soybeans", milho: "Corn", cafe: "Coffee", cana: "Sugarcane", pastagem: "Pasture", outros: "Other" },
    location: "Location", useGPS: "Use My Location", latitude: "Latitude", longitude: "Longitude", submit: "Start Monitoring", success: "Property added! Monitoring has started.",
  },
  property: {
    spiGauge: { title: "SPI Index", current: "Current SPI" },
    precipitation: { title: "Precipitation (90 days)", daily: "Daily (mm)", historicalAvg: "Historical Average" },
    climate: { accumulated30d: "Accumulated 30d", historicalAvg: "Historical Avg.", tempMax: "Max Temp", tempMin: "Min Temp", deficit: "Deficit", surplus: "Surplus" },
    events: { title: "Detected Events", empty: "No climate events detected. Your property is being monitored 24/7.", drought: "Drought", excessRain: "Excess Rain", frost: "Frost" },
  },
  settings: { title: "Settings", profile: "Profile", language: "Language", notifications: "Notifications", about: "About", version: "Version", signOut: "Sign Out", signOutConfirm: "Are you sure you want to sign out?" },
  spiClassification: { extremely_wet: "Extremely Wet", very_wet: "Very Wet", moderately_wet: "Moderately Wet", near_normal: "Near Normal", moderately_dry: "Moderately Dry", severely_dry: "Severely Dry", extremely_dry: "Extremely Dry" },
  units: { mm: "mm", celsius: "\u00B0C", fahrenheit: "\u00B0F", hectares: "ha", days: "days" },
} as const;
