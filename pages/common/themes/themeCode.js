// Light/Dark Theme Toogling Script
const storageKey = 'theme-preference';
let isThemeDark = false;
let theme;

const reflectPreference = () => {
    if ( isThemeDark && !document.body.classList.contains( 'dark-mode' ) ) {
        if( !document.querySelector( '#theme-checkbox' ).checked )
            document.querySelector( '#theme-checkbox' ).checked = true;

        document.body.classList.add( 'dark-mode' );
        document.querySelector( '.FooterIFrameClass' ).contentDocument?.body.classList.add( 'dark-mode' );
    }
    else if ( !isThemeDark && document.body.classList.contains( 'dark-mode' ) ) {   
        if( document.querySelector( '#theme-checkbox' ).checked )
            document.querySelector( '#theme-checkbox' ).checked = false;

        document.body.classList.remove( 'dark-mode' );
        document.querySelector( '.FooterIFrameClass' ).contentDocument?.body.classList.remove( 'dark-mode' );
    }

    document.querySelector( '#theme-checkbox' ).setAttribute( 'aria-label', theme.value );
}

const updateThemeIndicator = ( themeValue ) => {
    isThemeDark = themeValue === 'dark';
}

const setPreference = () => {
    localStorage.setItem( storageKey, theme.value );
    updateThemeIndicator( theme.value );
    reflectPreference();
}

const onChange = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
}

const getColorPreference = () => {
    let themePreference = localStorage.getItem( storageKey );

    if ( themePreference === null ) // Update on system theme color preference change if it is the first time the site visited and this has not been set before
        themePreference = window.matchMedia( '( prefers-color-scheme: dark )' ).matches ? 'dark' : 'light';
   
    updateThemeIndicator( themePreference );
    return themePreference;
}

window.onload = () => {
    // Set on load the stored preference if exists, so it can be loaded and screen readers can get the latest value on the checkbox
    theme = {
        value: getColorPreference(),
    }

    reflectPreference();

    // Find and listen for the change event on the theme checkbox
    document.querySelector( '#theme-checkbox' ).addEventListener( 'change', onChange );
} 