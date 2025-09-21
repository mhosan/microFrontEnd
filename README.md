## Instalar libreria native-federation:
```bash
npm i @angular-architects/native-federation -D
```
## Configurar el proyecto para federación nativa
### Remote. Cuidado con el puerto y el tipo de proyecto

- proyecto nuevo:
```bash
ng g @angular-architects/native-federation:init --project mfe2 --port 4202 --type remote
```
- proyecto existente:
```bash
ng add @angular-architects/native-federation:init --project mfe2 --port 4202 --type remote
```

### Host. Cuidado con el puerto y el tipo de proyecto

```bash
ng g @angular-architects/native-federation:init --project host --port 4200 --type dynamic-host
```

## Arranque local (host + microfrontends)

Pasos mínimos para levantar el entorno de desarrollo en Windows (PowerShell):

1. Instalar dependencias en la raíz y en cada microfrontend (si no están instaladas):

2. Iniciar cada aplicación en terminales separados (puertos por convención):

```powershell
# Host
cd C:\Users\Usuario\Desktop\desa\angular\microfrontend\host
ng serve --port 4200

# mfe1
cd ..\mfe1
ng serve --port 4201

# mfe2
cd ..\mfe2
ng serve --port 4202

# mfe3
cd ..\mfe3
ng serve --port 4203

# mfe4
cd ..\mfe4
ng serve --port 4204
```

3. Verificar manifests (remoteEntry.json)

En el navegador comprobar que cada remoto devuelve su manifest:
- http://localhost:4201/remoteEntry.json
- http://localhost:4202/remoteEntry.json
- http://localhost:4203/remoteEntry.json
- http://localhost:4204/remoteEntry.json

```powershell
Invoke-RestMethod -Uri http://localhost:4201/remoteEntry.json
Invoke-RestMethod -Uri http://localhost:4202/remoteEntry.json
Invoke-RestMethod -Uri http://localhost:4203/remoteEntry.json
Invoke-RestMethod -Uri http://localhost:4204/remoteEntry.json
```

4. Verificar que en todos los manifests las versiones de `@angular/*` coincidan (idealmente la misma versión en host y todos los remotos).

## Problemas comunes y soluciones

- NG0203: "inject() must be called from an injection context"
	- Causa: el remote necesita un EnvironmentInjector del host al usar APIs que emplean `inject()` (standalone components o providers) o hay incompatibilidad entre artefactos/versions.
	- Solución:
		1. Asegurar que el host crea componentes remotos pasando el environment injector:
			 - `viewContainerRef.createComponent(remote.App, { environmentInjector: this.environmentInjector })`
		2. Alinear la versión de Angular entre host y remotos (package.json) y volver a instalar y reconstruir.
		3. Limpiar caché del navegador (Ctrl+F5) para evitar artefactos JS antiguos.

- Versiones mismatched / runtime errors relacionados con shared.strictVersion
	- Causa: los manifests (`remoteEntry.json`) indican `requiredVersion` y `version`; si difieren entre host y remoto con `strictVersion: true` puede fallar en runtime.
	- Solución:
		1. En `package.json` de host y remotos, alinea `@angular/*` a la misma versión (por ejemplo `20.3.1`).
		2. Ejecutar `npm install --legacy-peer-deps` si npm bloquea por peerDependencies.
		3. Rebuild de cada remoto: `ng build` o `ng serve` y volver a comprobar `remoteEntry.json`.

- `npm install` falla con ERESOLVE
	- Solución: `npm install --legacy-peer-deps` o limpiar `node_modules` y `package-lock.json` y volver a instalar.

- `remoteEntry.json` vs `remoteEntry.js`
	- En desarrollo el plugin `@angular-architects/native-federation` puede exponer `remoteEntry.json` (manifest) y servir dinámicamente módulos. Si falla el host al cargar `.js` directo probar usar `remoteEntry.json` en la configuración de carga mientras se desarrolla.

## Scripts y sugerencias útiles

- Para evitar abrir muchas terminales, se puede usar `concurrently` o un script PowerShell que lance los `ng serve` en ventanas separadas.
- Mantener un archivo con los puertos mapeados para referencias rápidas (host:4200, mfe1:4201, mfe2:4202, mfe3:4203, mfe4:4204).

## Contacto y notas

Si aparece un error nuevo, copiar la traza completa de la consola del navegador y el log de `ng serve` del microfrontend que falla y pégarla aquí para diagnóstico.

En el contexto de @angular-architects/native-federation, el comando ng add (proyecto nuevo)  o ng g (agregar microfrontends a un proyecto existente) se encargará de:

- Instalar el paquete como dependencia
- Configurar los archivos necesarios para native federation
- Establecer la configuración de microfrontend remoto
- Configurar el puerto especificado
- Crear los archivos de configuración necesarios (como federation.config.js)

# PRIMER SETUP (proyecto nuevo)
npm i @angular-architects/native-federation -D
ng add @angular-architects/native-federation --project host --port 4200 --type dynamic-host
ng add @angular-architects/native-federation --project mfe1 --port 4201 --type remote

# AGREGAR MÁS MICROFRONTENDS (proyecto existente)
ng g @angular-architects/native-federation:init --project mfe2 --port 4202 --type remote
ng g @angular-architects/native-federation:init --project mfe3 --port 4203 --type remote