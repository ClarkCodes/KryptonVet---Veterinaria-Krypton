<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Fidel Velásquez Mendoza">
        <meta name="creator" content="Grupo #2 - Desarrollo de Aplicaciones Web - SOF-S-MA-6-4">
        <meta name="description" content="Formulario de Contacto de la Veterinaria Krypton.">
        <meta name="keywords" content="contactenos, contacto, formulario">
        <link rel = "stylesheet" type="text/css" href="common/styles.css" />
        <link rel="icon" type="image/x-icon" href="common/icons/FAVICON_KryptonVet.ico">
        <script src="common/themes/themeCode.js"></script>
        <title>Contáctenos - KryptonVet</title>
    </head>
    <body>
        <div class="theme-switch-wrapper">
            <label class="theme-switch" for="theme-checkbox">
                <input type="checkbox" id="theme-checkbox" aria-label="auto" />
                <div class="slider round"></div>
                <svg class="sun-and-moon" id="sun-and-moon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
                    <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                    <g class="sun-beams" stroke="currentColor">
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                    <mask class="moon" id="moon-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <circle cx="24" cy="10" r="6" fill="black" />
                    </mask>
                </svg>
            </label>
        </div>
        <div class="DivHeaderClass">
            <iframe class="HeaderIFrameClass" src="common/header.html" scrolling = "no" title="HeaderFrame"></iframe>
        </div>
        <main>

            <?php 
                $names = $lastNames = $phone = $email = $consultingSubject = $city = "";
                $verifyAgain = ", verifique nuevamente por favor.";
                $acceptanceCheck = false;
                $errores = [];

                if ( $_SERVER[ "REQUEST_METHOD" ] == "POST" ) 
                {   // Validaciones y asignaciones
                    if ( empty( $_POST[ "names" ] ) ) 
                    {
                        $errores[] = "Debe llenar el campo de sus Nombres" . $verifyAgain;
                    }
                    else
                        $names = $_POST[ "names" ];

                    if ( empty( $_POST[ "lastNames" ] ) ) 
                    {
                        $errores[] = "Debe llenar el campo de sus Apellidos" . $verifyAgain;
                    }
                    else
                        $lastNames = $_POST[ "lastNames" ];

                    if ( empty( $_POST[ "phone" ] ) ) 
                    {
                        $errores[] = "Debe escribir un Número de Teléfono válido" . $verifyAgain;
                    }
                    else
                        $phone = $_POST[ "phone" ];

                    if ( empty( $_POST[ "email" ] ) ) 
                    {
                        $errores[] = "Debe escribir un Correo Electrónico válido" . $verifyAgain;
                    }
                    else
                        $email = $_POST[ "email" ];

                    if ( empty( $_POST[ "consultingSubject" ] ) ) 
                    {
                        $errores[] = "Debe escribir brevemente un Motivo de Consulta" . $verifyAgain;
                    }
                    else
                        $consultingSubject = $_POST[ "consultingSubject" ];

                    if ( $_POST[ "city" ] == "seleccione" ) 
                    {
                        $errores[] = "Debe seleccionar la Ciudad en la que desea tener la consulta." . $verifyAgain;
                    }
                    else
                        $city = $_POST[ "city" ];

                    $acceptanceCheck = $_POST[ "acceptance" ];
                }
            ?>

            <div class="ContentClass">
                <div class="ContactenosClass">
                    <br>
                    <h2>CONTÁCTENOS</h2>
                    <p>
                        No dude en comunicarse con nosotros, estaremos siempre dispuestos a atenderlo de la mejor manera,
                        con productos, servicios, una calidad de primera y los mejores profesionales de la medicina veterinaria,
                        agenda una cita para tu mascota, nos encantará recibirle.
                    </p>
                    <br>
                    <div id="formDivId">
                        <form name="contactenosForm" method="post">
                            <label for="txtNamesId" >Nombres *</label><br>
                            <input type="text" id="txtNamesId" name="names" placeholder="Escriba sus dos nombres..." value="<?php if ( !empty( $names ) ) echo htmlspecialchars( $names ); ?>" ><br>

                            <label for="txtLastNamesId" >Apellidos *</label><br>
                            <input type="text" id="txtLastNamesId" name="lastNames" placeholder="Escriba sus dos apellidos..." value="<?php if ( !empty( $lastNames ) ) echo htmlspecialchars( $lastNames ); ?>" ><br>

                            <label for="txtPhoneId" id="lblPhoneId">Teléfono *</label>
                            <label for="txtEmailId" >Correo Electrónico *</label><br>
                            <input type="tel" pattern="[0-9]*" id="txtPhoneId" name="phone" placeholder="Escriba su número de teléfono..." value="<?php if ( !empty( $phone ) ) echo htmlspecialchars( $phone ); ?>" >
                            <input type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" id="txtEmailId" name="email" placeholder="Escriba su correo electrónico..." value="<?php if ( !empty( $email ) ) echo htmlspecialchars( $email ); ?>" ><br>

                            <label for="txtMotivoId" >Motivo de la consulta *</label><br>
                            <input type="text" id="txtMotivoId" name="consultingSubject" placeholder="Describa brevemente el motivo por el cual requiere la consulta..." value="<?php if ( !empty( $consultingSubject ) ) echo htmlspecialchars( $consultingSubject ); ?>" ><br>
                        
                            <label for="cmbCitiesId">Ciudad *</label><br>
                            <select id="cmbCitiesId" name="city">
                                <option value="Guayaquil" <?php if ( $city == "Guayaquil" ) echo 'selected'; ?> >Guayaquil</option>
                                <option value="Quito" <?php if ( $city == "Quito" ) echo 'selected'; ?> >Quito</option>
                                <option value="Cuenca" <?php if ( $city == "Cuenca" ) echo 'selected'; ?> >Cuenca</option>
                                <option value="Ibarra" <?php if ( $city == "Ibarra" ) echo 'selected'; ?> >Ibarra</option>
                            </select><br>
                        
                            <label id="lblAcceptanceId">
                                <input type="checkbox" id="chkAcceptanceId" name="acceptance" <?php if ( $acceptanceCheck ) {echo 'checked';} else echo 'unchecked'; ?> required >    
                                Al aceptar, estás de acuerdo con nuestra Politica de Protección de Datos Personales.
                            </label><br>

                            <input type="submit" value="Enviar" id="submitButtonId" >
                        </form>
                    </div>

                </div>
                <div class="ResultadoClass">
                    <?php
                        if ( $_SERVER[ "REQUEST_METHOD" ] == "POST" ) 
                        {
                            if ( !empty( $errores ) ) 
                            {
                                echo "<h2 class=\"UnsuccessfulConfirmationTitle\">Faltó algo...</h2>";

                                foreach ( $errores as $error ) 
                                    echo "<p style='color:var( --kv-error-color );'>$error</p>";
                            } 
                            else 
                            {
                                echo "<script>alert( 'Datos Enviados Exitosamente.' );</script>";
                                echo "<h2 class=\"SuccessfulConfirmationTitle\">DATOS ENVIADOS</h2>";
                                echo "
                                    <p>Estimado Cliente, muchas gracias por enviarnos su solicitud, nos contactarémos con usted a la brevedad posible. Estos son los datos enviados.</p>
                                    <p><b>Nombres:</b> $names</p>
                                    <p><b>Apellidos:</b> $lastNames</p>
                                    <p><b>Teléfono:</b> $phone</p>
                                    <p><b>Correo Electrónico:</b> $email</p>
                                    <p><b>Motivo de la Consulta:</b> $consultingSubject</p>
                                    <p><b>Ciudad:</b> $city</p><br><br>";
                            }
                        }
                    ?>
                </div>
            </div>

        </main>
        <br>
        <div class="DivFooterClass">
            <iframe class="FooterIFrameClass" src="common/footer.html" scrolling = "no" title="FooterFrame"></iframe>
        </div>
    </body>
</html>