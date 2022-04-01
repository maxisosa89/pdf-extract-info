## Objetivo

Desarrollar una app que permita arrastrar un archivo PDF dentro de una caja, previsualizarlo y extraer de su contenido las direcciones de email y urls.

##### Front:
Usé React y el widget de https://uploadcare.com/ para carga de archivos.
El usuario puede arrastrar el archivo a la caja azul.
De no ser un pdf, se le indicará con un alert.
En caso de ser pdf, se cargará en uploadcare y se enviará una petición con la url donde se cargó el archivo.
El back responde con la lista de emails y urls que contiene el pdf, los cuales se renderizan junto con la previzualización del pdf.

##### Back:
Usé Node y la libreria "crawler-request" para obtener el archivo con la url enviada por el front y extraer el texto.
Finalmente se obtienen los emails y urls mediante el uso de expresiones regulares.

##### Deploy
https://pdf-extract-info-maxisosa89.vercel.app/
