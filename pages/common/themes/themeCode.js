// Light/Dark Theme Toogling Script
let isThemeDark = false;
const storageKey = 'theme-preference';

const reflectPreference = () => {
    if ( isThemeDark && !document.body.classList.contains( 'dark-mode' ) )
    {
        document.body.classList.toggle('dark-mode');
        
        if( !document.querySelector( '#theme-checkbox' ).checked )
        {
            document.querySelector( '#theme-checkbox' ).checked = true;
        }
    }
    else if ( !isThemeDark && document.body.classList.contains( 'dark-mode' ) )
    {
        document.body.classList.toggle('dark-mode');
        
        if( document.querySelector( '#theme-checkbox' ).checked )
        {
            document.querySelector( '#theme-checkbox' ).checked = false;
        }
    }

    document.querySelector( '#theme-checkbox' )?.setAttribute( 'aria-label', theme.value );
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

    if ( themePreference === null )
        themePreference = window.matchMedia( '( prefers-color-scheme: dark )' ).matches ? 'dark' : 'light';

    updateThemeIndicator( themePreference );
    return themePreference;
}

const theme = {
    value: getColorPreference(),
}

window.onload = () => {
    // Set on load so stored preference can be loaded and screen readers can get the latest value on the checkbox
    reflectPreference();
  
    // Now this script can find and listen for the change event on the control
    document.querySelector( '#theme-checkbox' ).addEventListener( 'change', onChange );

    // Update on system theme color preference change
    window.matchMedia( '( prefers-color-scheme: dark )' ).addEventListener( 'change', ( {matches:isDark} ) => {
        theme.value = isDark ? 'dark' : 'light';
        setPreference()
    } );
}