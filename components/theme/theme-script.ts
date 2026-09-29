export const THEME_STORAGE_KEY = "xb-theme";

export type Theme = "light" | "dark";

/**
 * Runs in <head> before first paint. Only applies a *saved* choice; with no
 * saved choice there's no data-theme and the CSS follows the OS preference.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
