
# SberDevices Ad SDK

[Документация SberDevices Ad SDK](https://developers.sber.ru/docs/ru/salute/monetization/advertising)
## Запуск демо проекта

Перед началом работы создайте свой смартапп(canvas) в [SmartMarket Studio](https://smartapp-studio.sberdevices.ru/)

и скопируйте `.env.sample` в `.env`. Заполните необходимые переменные.

Демо-проект использует [vercel](https://vercel.com/) для поднятия локального сервера разработки;

```
npm ci 
npm start
```

После запуска поднимите тунель например с помощью `ngrok` на порт 3000 и пропишите в созданном ранее смартапе пути до тунеля:
 - Webhook смартапа: туннель+/api/hook
 - Frontend Endpoint: туннель

