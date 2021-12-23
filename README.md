
# SberDevices Ad SDK

* [Создание смартапа](#создание-смартапа)
* [Установка Ad SDK](#установка-ad-sdk)
* [Использование](#использование)
* [Инициализация](#инициализация)
* [Альтернативные способы инициализации](#альтернативные-способы-инициализации)
* [Запуск демо проекта](#запуск-демо-проекта)

## Создание смартапа

Создайте проект в [SmartApp Studio](https://developers.sber.ru/docs/ru/salute/studio/project/create):

1. В качестве Хостинг фронтенда укажите ссылку на свой клиентский код.
2. Укажите Webhook.

> **ВАЖНО:** Для работы рекламы необходим виртуальный ассистент, для получения данных о пользователе, **Webhook для смартапа обязателен**.

Можно использовать готовый webhook: `https://smartapp-code.sberdevices.ru/chatadapter/chatapi/webhook/sber_nlp2/akvMhQEy:73931a63e07450a5260600c7f9f6e6d6a992578b`

Либо собственный webhook, который будет присылать данные для инициализации по [данному](./api/hook.js) примеру;

## Установка Ad SDK

Подключите [assistantClient](https://github.com/sberdevices/assistant-client#%D0%B0%D0%BB%D1%8C%D1%82%D0%B5%D1%80%D0%BD%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5)
> **ВАЖНО:** `assistantClient` обязательно должен быть подключен до инициализации `AD-SDK`.

Подключите AD-SDK через тег `<script>` в ваше приложение:

```html
    <script src="https://cdn-app.sberdevices.ru/shared-static/0.0.0/js/@sberdevices/ad-sdk/ad-sdk.min.js"></script>
```

## Использование

Два шага:
1. Инициализация - sdk получит данные о пользователе через `assistantClient`. Инициализация должна быть завершена до первого вызова любого вида рекламы.
2. Запуск баннера или видеорекламы.


### Инициализация sdk:
```js
window.SberDevicesAdSDK.init({ 
    onSuccess: () => {}, // Будет вызвана при окончании инициализации
    onError: (err) => {}, // Будет вызвана, если при инициализации произойдет ошибка
    test: false, // true - Будет выводиться тестовая реклама, false - будет выводиться реальная реклама
})
```
[Подробнее об инициализации](#инициализация)

[Альтернативные способы инициализации](#альтернативные-способы-инициализации)

### Запуск баннера:
```js
window.SberDevicesAdSDK.runBanner({
    onSuccess: () => {}, // Будет вызвана при закрытии баннера
    onError: (err) => {}, // Будет вызвана в случае ошибки при показе баннера
});
```
### Запуск видео-рекламы:
```js
window.SberDevicesAdSDK.runVideoAd({
    onSuccess: () => {}, // Вызовется при переходе или при полном показе рекламы
    onError: (err) => {}, // Вызовется во время ошибки при показе рекламы
    mute: true, // Вызвать рекламу без звука
});
```

[Пример запуска видео-рекламы и баннера](./src/index.js)


## Инициализация

> **ВАЖНО:** Для корректной работы, необходимо подключить assistantClient **до инициализации SberDevicesAdSDK**. Если в момент инициализации assistant будет отсутствовать, то произойдет ошибка и SberDevicesAdSDK не будет инициализирован.

`SberDevicesAdSDK` имеет несколько вариантов инициализации:

Если вы не используете `assistantClient`:
* `window.SberDevicesAdSDK.init({ onSuccess, onError, test })` - Все параметры являются необязательными;

Для запуска локально в браузере:
* `window.SberDevicesAdSDK.initDev({ token, initPhrase, onSuccess, onError, test })`;

Если вы используете `assistantClient`:
* `window.SberDevicesAdSDK.initWithAssistant({assistant, onSuccess, onError}, test)`;
* `window.SberDevicesAdSDK.initWithParams({params, onSuccess, onError}, test)`;

Проверить завершилась ли инициализация можно вызвав:

`window.SberDevicesAdSDK.isInited()` - вернет `true` если инициализация завершена, `false` - если инициализация не завершена

### window.SberDevicesAdSDK.init()

Самый простой способ инициализации

```js
window.SberDevicesAdSDK.init({ onError, onSuccess, test })
```
* `onSuccess` - необязательный параметр. Функция, будет вызвана при окончании инициализации.
* `onError` - необязательный параметр. Функция, будет вызвана, если при инициализации произойдет ошибка.
* `test` - необязательный параметр. Если он равен `true`, то видео-реклама и баннеры будут выводиться тестовые, нужно для тестирования при разработке. У пользователей должен отсутствовать или равен `false`.

[Запустить рекламу](#Запуск_рекламы) можно только после успешной инициализации, после вызова `onSuccess`. Если вызвать рекламу раньше, произойдет ошибка.

Проверить, закончилась ли инициализация, можно через вызов `window.SberDevicesAdSDK.isInited()`;

> **ВАЖНО:** Для корректной работы, необходимо подключить assistantClient **до инициализации SberDevicesAdSDK**. Если в момент инициализации assistant будет отсутствовать, то произойдет ошибка и SberDevicesAdSDK не будет инициализирован.

[Пример инициализации](./src/index.js)

### window.SberDevicesAdSDK.initDev()

`init()` нужно запускать на устройствах в production среде, где панель ассистента сразу присутствует.

`initDev()` нужно запускать при отладке в браузере. Этот метод перед инициализацией будет добавлять голосовой ассистент в браузер, в котором ассистена изначально нет.


```js
window.SberDevicesAdSDK.initDev({ token, initPhrase, onSuccess, onError, test });
```
* `initPhrase` – Фраза для запуска вашего смартап `Запусти + Активационное имя смартапа`; Пример: `Запусти кубик Рубика`
* `token` – Токен для дебага, получить его можно в SmartApp Studio по [инструкции](https://developers.sber.ru/docs/ru/salute/assistant-client/overview#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%BE%D0%B2).
* `onSuccess` - необязательный параметр. Функция, будет вызвана при окончании инициализации.
* `onError` - необязательный параметр. Функция, будет вызвана, если при инициализации произойдет ошибка.
* `test` - необязательный параметр. Если он равен `true`, то видео-реклама и баннеры будут выводиться тестовые, нужно для тестирования при разработке. У пользователей должен отсутствовать или равен `false`.

Метод `window.SberDevicesAdSDK.initDev()` предназначен только для локальной отладки в браузере. Перед инициализацией он создаст assistant через [createSmartappDebugger](https://github.com/sberdevices/assistant-client#createSmartappDebugger). Он работает также как метод `init` но принимает два дополнительных параметра: `token`, `initPhrase`;


Можно в dev режиме автоматически запускать `initDev`, а в prod режиме `init`:
```js
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const DEV_TOKEN = process.env.DEV_TOKEN;
const DEV_PHRASE = process.env.DEV_PHRASE;

if (IS_DEVELOPMENT) {
    window.SberDevicesAdSDK.initDev({ token: DEV_TOKEN, initPhrase: DEV_PHRASE, onSuccess, onError, test });
} else {
    window.SberDevicesAdSDK.init({ onSuccess, onError, test });
}
```

Пример использования этого метода можно посмотреть в [Демо-проекте](./src/index.js)

## Альтернативные способы инициализации
### window.SberDevicesAdSDK.initWithAssistant()

Если вы хотите контролировать создание assistantClient самостоятельно, и например подписаться на [смену персонажей](https://github.com/sberdevices/assistant-client#AssistantCharacterCommand);
То создайте инстанс `assistantClient` a и передайте его в метод `window.SberDevicesAdSDK.initWithAssistant()`;


```js
    import { createAssistant } from '@sberdevices/assistant-client';

    const assistant = createAssistant();

    initWithAssistant({
        assistant,
        onSuccess,
        onError,
    }, test );
```
* `assistant` - инстанс ассистента.
* `onSuccess` - необязательный параметр. Функция, будет вызвана при окончании инициализации.
* `onError` - необязательный параметр. Функция, будет вызвана, если при инициализации произойдет ошибка.
* `test` - необязательный параметр. Если он равен `true`, то видео-реклама и баннеры будут выводиться тестовые, нужно для тестирования при разработке. У пользователей должен отсутствовать или равен `false`.

Пример создания `assistant` можно посмотреть в [документации](https://github.com/sberdevices/assistant-client#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F);

Для локальной отладки в браузере (как в `window.SberDevicesAdSDK.initDev`), вместо
```js
import { createAssistant } from '@sberdevices/assistant-client';

const assistant = createAssistant();
```
 можно использовать
```js
import { createSmartappDebugger } from '@sberdevices/assistant-client';

const assistant = createSmartappDebugger();
```

Пример использования метода `initWithAssistant` можно посмотреть в [Демо-проекте](./src/initWithAssistant.js)

### window.SberDevicesAdSDK.initWithParams()

Так же инициализировать SberDevicesAdSDK можно передав самостоятельно все необходимые параметры из `assistantClient`.

```js
    assistant.on('data', (command) => {
        if (command.type === 'smart_app_data' && command.smart_app_data.type === 'sub') {
            initWithParams({
                params: command.smart_app_data.payload, 
                onSuccess: () => {
                    console.log('AdSdk Inited with params');
                    testBtn.disabled = false;
                },
                onError, 
            }, test);
        }
    });
```

* `params` - параметры для инициализации.
* `onSuccess` - необязательный параметр. Функция, будет вызвана при окончании инициализации.
* `onError` - необязательный параметр. Функция, будет вызвана, если при инициализации произойдет ошибка.
* `test` - необязательный параметр. Если он равен `true`, то видео-реклама и баннеры будут выводиться тестовые, нужно для тестирования при разработке. У пользователей должен отсутствовать или равен `false`.


Пример `params`, который ожидает метод `window.SberDevicesAdSDK.initWithParams()`.
Обязательное отмечено `*`, но передавать лучше всё во избежание проблем в дальнейшем.
```js
{
    sub: *String,  // идентификатор пользователя
    projectName: *String, // идентификатор проекта
    device: { // информация об устройстве пользователя
        surface: *String,  // название поверхности, например: "SBERBOX"
        deviceId: *String,

        platformType: String,
        platformVersion: String,
        surfaceVersion: String,
        features: {
            appTypes: String[],
        },
        capabilities: {
            screen: {
                available: Boolean,
                height: Number,
                width: Number,
            },
            speak: {
                available: Boolean,
            }
        },
        
        deviceManufacturer: String,
        deviceModel: String,
        additionalInfo: {
            host_app_id: String,
            sdk_version: String,
        }
    }, 
    app_info: {  // информация о приложении
        projectId: *String,
        applicationId: *String,

        appversionId: String,
        systemName: String,
        frontendEndpoint: String,
        frontendType: String,
        ageLimit: Number,
        affiliationType: String,
    }
}
```

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

