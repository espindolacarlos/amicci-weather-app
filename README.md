# 🌦️ Amicci Weather App

Aplicação web simples de previsão do tempo, construída com **React**, **TypeScript**, **Vite** e **SCSS**. Ela consome dados meteorológicos de APIs externas e exibe informações como temperatura atual, sensação térmica, condição do tempo e mais, de forma intuitiva.

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- SCSS
- ESLint (com configurações para React e TS)

## 🧩 Funcionalidades

- Busca por localização com auto-complete do Google
- Exibição de dados como: temperatura, umidade, sensação térmica e condição atual
- Design limpo com responsividade via TailwindCSS

🎨 Design
O design da aplicação foi baseado neste arquivo Figma:

👉 [Amicci Weather App](https://www.figma.com/design/bbboXvvSEyfphFdjy1R6zT/Amicci-Weather-App?node-id=21-4392&p=f&t=rhNNJLZHWzrcNfxC-0)


🔻 Prints da Interface
<div align="center"> 
  <img src="/src/assets/prints/Desktop Example-1.png" width="400" alt="Print da interface 1"/>
  <img src="/src/assets/prints/Desktop Example.png" width="400" alt="Print da interface 2"/> 
  <img src="/src/assets/prints/iPhone 16 - 1.png" width="400" alt="Print da interface 3"/> 
</div>

## ⚙️ Configuração

Antes de iniciar, é necessário configurar variáveis de ambiente com suas chaves de API:

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key 
REACT_APP_OPENWEATHER_API_KEY=your_openweather_key
```

## 🛠️ Instalação

```bash
git clone https://github.com/espindolacarlos/amicci-weather-app.git
cd amicci-weather-app
pnpm install
pnpm dev
```

## 🧪 Scripts Disponíveis

```bash
pnpm run dev — Executa o app em modo de desenvolvimento.

pnpm run test — Executa os testes.

pnpm run build — Compila o app para produção.
```

## ✅ Testes
O projeto utiliza Vitest para testes:

```bash
pnpm test
```
## 📁 Estrutura

```bash
src/
  components/    # Componentes reutilizáveis
  services/      # Comunicação com APIs
  styles/        # Estilização global
  App.tsx        # Componente principal
```