
const { init, initDev, runVideoAd, runBanner } = window.SberDevicesAdSDK;

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const DEV_TOKEN = process.env.DEV_TOKEN;
const DEV_PHRASE = process.env.DEV_PHRASE;

document.addEventListener('DOMContentLoaded', () => {
    initAdSdk();
    initVideoAdButton();
    initBannerButton();
});

function initAdSdk() {
    const videoAdBtn = document.querySelector('.video-ad-btn');
    const bannerBtn = document.querySelector('.banner-ad-btn');
    videoAdBtn.disabled = true;
    bannerBtn.disabled = true;

    const onSuccess = () => {
        console.log('AdSdk Inited');
        videoAdBtn.disabled = false;
        bannerBtn.disabled = false;
    };
    const onError = (err) => {
        console.error('AdSDK Init Error', err);
    };
    if (IS_DEVELOPMENT) {
        initDev({ token: DEV_TOKEN, initPhrase: DEV_PHRASE, onSuccess, onError, test: true });
    } else {
        init({ onSuccess, onError, test: true });
    }
}

function initBannerButton() {
    const testBtn = document.querySelector('.banner-ad-btn');

    testBtn.addEventListener('click', () => {
        runBanner({
            onSuccess: () => {
                console.log('Banner success');
            },
            onError: (err) => {
                console.error('Banner Error', err);
            },
        });
    });
}

function initVideoAdButton() {
    const testBtn = document.querySelector('.video-ad-btn');
    let i = 1;
    const text = testBtn.textContent;
    testBtn.addEventListener('click', () => {
        const muteVideo = document.getElementById('mute-video-ad').checked;
        runVideoAd({
            mute: muteVideo,
            onSuccess: () => {
                console.log('VideoAd success');
                testBtn.textContent = text + ': watched ' + i++;
            },
            onError: (err) => {
                console.error('VideoAd error', err);
            },
        });
    });
}
