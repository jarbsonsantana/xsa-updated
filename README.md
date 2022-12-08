# XSA APP
Aplicativo para banca de apostas esportivas que utilizam a plataforma GAMER da XSA Sports direcionando aos cambistas.

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>
## 🚀 Publicando

#### Build
- `cd` para pasta do projeto
```cmd
npx eas-cli login
```
```cmd
npx eas-cli build --platform android
```
- Após a compilação baixe o arquivo no site da EXPO.DEV (https://expo.dev/)

> 💡 Para gerar um arquivo *.apk você deve adicionar uma diretiva `android` no arquivo `eas.json`
```json
    "production": {    
      "android": {
        "buildType": "apk"
      }         
    }
```    

#### Modificando versão

- Altere no arquivo `/android/app/build.gradle` os campos: `versionCode` e `versionName`.

```json
android {
    compileSdkVersion rootProject.ext.compileSdkVersion

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    defaultConfig {
        applicationId 'br.com.xsasports.xsa'
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 7
        versionName "1.0.7"
    }
```

> 💡 Você deve verificar a ultima versão publicada e adicionar +1

## 📝 Notes

- [Expo TypeScript guide](https://docs.expo.dev/versions/latest/guides/typescript/)
