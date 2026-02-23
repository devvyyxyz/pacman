const TRANSLATIONS: Record<string, Record<string,string>> = {
  en: {
    settings_title: 'SETTINGS',
    settings_back: 'Back',
    settings_reset: 'Reset to defaults',
    send_crash: 'Send Crash Report',
    return_menu: 'Return To Menu',
    copy_details: 'Copy Details',
    coming_soon: 'Coming soon',
    setting_sound: 'Sound effects',
    setting_music: 'Music',
    setting_difficulty: 'Difficulty',
    setting_skin: 'Skin',
    setting_volume: 'Master Volume',
    setting_maxLives: 'Max Lives',
    setting_language: 'Language'
  }
  ,
  es: {
    settings_title: 'AJUSTES',
    settings_back: 'Volver',
    settings_reset: 'Restablecer',
    send_crash: 'Enviar informe',
    return_menu: 'Volver al menú',
    copy_details: 'Copiar detalles',
    coming_soon: 'Próximamente',
    setting_sound: 'Efectos de sonido',
    setting_music: 'Música',
    setting_difficulty: 'Dificultad',
    setting_skin: 'Apariencia',
    setting_volume: 'Volumen maestro',
    setting_maxLives: 'Vidas máximas',
    setting_language: 'Idioma'
  }
};

let LOCALE = 'en';

export function t(key: string){
  return TRANSLATIONS[LOCALE]?.[key] ?? key;
}

export function setLocale(loc: string){ LOCALE = loc; }

export default { t, setLocale };
