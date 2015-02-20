#Cocos Demo

Para conectar con facebook y obtener la lista de amigos, hay que crear un aplicación en y establecer un Canvas URL seguro (https), para solventar esto, el sito esta alojado en dropbox, que provee una url segura y al tratarse de archivos estáticos, no representa ningún problema. Sin embargo para integrar la plataforma de pago PaymentWall, se necesitan algunos scripts en PHP, que no se pueden alojar en dropbox. Por esta razón, para probar el demo, hay 2 links:

Para la parte de Facebook: https://dl.dropboxusercontent.com/u/33999678/cocosDemo/index.html

Para la parte de PaymentWall: http://parmaia.com/cocosdemo/

El hosting que tengo en parmaia.com no me permite utilizar https, por esta razón he tenido que usar las dos direcciones.

La dirección del dropbox tarda un poco en cargar el sitio.

Notas:
* Al configurar el entorno de desarrollo con Cocos2D-js, no pude solucionar rápidamente un error al generar para Android, así que hay partes que solo funcionan en web, pero están los puntos de entrada para hacer que funcionen en plataformas nativas.
* Las interfaces son bastante sencillas y no muy adornadas, pero muestran la información relevante.
* Los scripts en php manejan un simple stock de productos comprados por usuarios, aunque en el código js el usuario esta fijo ("U001").
* En el ejemplo del listado de amigos de Facebook, quise mostrar la foto del perfil de los amigos, pero (hasta donde entendí según lo que mire por internet), por el modelo que utiliza Cocos2D-js, no se puede pedir una imagen (u otro recurso) desde un dominio distinto al dominio donde se aloja el script, una solución que proponían era obtener la imagen utilizando un script de php intermedio entre el javascript y facebook. Como el ejemplo de facebook esta alojado en Dropbox, no puedo colocar ese script de php.

