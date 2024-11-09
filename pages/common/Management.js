
/* Selected Menu based on Current Page */
document.addEventListener( 'DOMContentLoaded', () => {
    const headerIframe = document.querySelector( '.DivHeaderClass iframe' );
    const currentPage = window.location.pathname.split('/').pop(); // Extracts the current page name

    headerIframe.addEventListener( 'load', () => {
        headerIframe.contentWindow.postMessage( currentPage );
    });
});