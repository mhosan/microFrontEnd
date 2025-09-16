## Instalar libreria native-federation:
```bash
npm i @angular-architects/native-federation -D
```
## Configurar el proyecto para federación nativa
### Remote. Cuidado con el puerto y el tipo de proyecto

```bash
ng add @angular-architects/native-federation:init --project mfe2 --port 4202 --type remote
```
### Host. Cuidado con el puerto y el tipo de proyecto

```bash
ng add @angular-architects/native-federation:init --project host --port 4200 --type dynamic-host
```
En el contexto de @angular-architects/native-federation, el comando ng add se encargará de:

- Instalar el paquete como dependencia
- Configurar los archivos necesarios para native federation
- Establecer la configuración de microfrontend remoto
- Configurar el puerto especificado
- Crear los archivos de configuración necesarios (como federation.config.js)
