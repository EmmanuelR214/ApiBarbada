import { transporter } from "../libs/mailConfig.js";

export const verifyMail = async(email, codigoSecreto) =>{
  await new Promise ((resolve,reject)=>{
    transporter.sendMail({
        from: '"Codigo de Verificación" <labarbada23@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Codigo de verificacion",// plain text body
        html: `
        <html>
        <head>
          <style>
            /* Estilos globales */
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #333333;
            }
            
            /* Estilos para contenedores */
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            
            /* Estilos para encabezados */
            h1, h2, h3 {
              margin-top: 0;
              margin-bottom: 20px;
            }
            
            /* Estilos para párrafos */
            p {
              margin-top: 0;
              margin-bottom: 20px;
            }
            
            /* Estilos para enlaces */
            a {
              color: #007bff;
              text-decoration: underline;
            }
            
            /* Estilos para botones */
            .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
            
            .warning{
              color: red;
            }
            
            /* Estilos para imágenes */
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Código de verificación de La Barbada</h1>
            <p>Este código es válido por un solo intento:</p>
            <p>Su código es: <strong>${codigoSecreto}</strong></p>
            <p class="warning" >Si usted no generó algún código de verificación, ignore este correo electrónico.</p>
          </div>
        </body>
      </html>
        `, // html body
    },(err,info)=>{
        if (err) {
            console.error(err);
            reject(err);
            return err
        } else {
            console.log(info);
            resolve(info);
            return info
        }
    })
}
);
}
