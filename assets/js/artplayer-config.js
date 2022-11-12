var hls = null;

var art = new Artplayer({
    container: '.player-wrapper',
    // url: 'https://artplayer.org/assets/sample/video.mp4',
    url: 'magnet:?xt=urn:btih:62DBC600DF9C5634D917C679653F56BC6F2AE01C',
    title: 'Your Name',
    poster: 'assets/images/qds/1646046754755_.jpg',
    volume: 0.5,
    isLive: false,
    muted: false,
    autoplay: false,
    pip: true,
    autoSize: true,
    autoMini: true,
    screenshot: true,
    setting: true,
    loop: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    fullscreenWeb: true,
    subtitleOffset: true,
    miniProgressBar: true,
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    theme: '#23ade5',
    lang: navigator.language.toLowerCase(),
    whitelist: ['*'],
    moreVideoAttr: {
        crossOrigin: 'anonymous',
    },
    settings: [
        {
            width: 200,
            html: 'Subtitle',
            tooltip: 'Bilingual',
            icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/subtitle.svg">',
            selector: [
                {
                    html: 'Display',
                    tooltip: 'Show',
                    switch: true,
                    onSwitch: function (item) {
                        item.tooltip = item.switch ? 'Hide' : 'Show';
                        art.subtitle.show = !item.switch;
                        return !item.switch;
                    },
                },
                {
                    default: true,
                    html: 'Bilingual',
                    url: 'https://artplayer.org/assets/sample/subtitle.srt',
                },
                {
                    html: 'Chinese',
                    url: 'https://artplayer.org/assets/sample/subtitle.cn.srt',
                },
                {
                    html: 'Japanese',
                    url: 'https://artplayer.org/assets/sample/subtitle.jp.srt',
                },
            ],
            onSelect: function (item) {
                art.subtitle.switch(item.url, {
                    name: item.html,
                });
                return item.html;
            },
        },
        {
            html: 'Switcher',
            icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/state.svg">',
            tooltip: 'OFF',
            switch: false,
            onSwitch: function (item) {
                item.tooltip = item.switch ? 'OFF' : 'ON';
                console.info('You clicked on the custom switch', item.switch);
                return !item.switch;
            },
        },
        {
            html: 'Slider',
            icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/state.svg">',
            tooltip: '5x',
            range: [5, 1, 10, 0.1],
            onRange: function (item) {
                return item.range + 'x';
            },
        },
    ],
    contextmenu: [
        {
            html: 'Custom menu',
            click: function (contextmenu) {
                console.info('You clicked on the custom menu');
                contextmenu.show = false;
            },
        },
    ],
    // layers: [
    //     {
    //         html: '<img width="100" src="https://artplayer.org/assets/sample/layer.png">',
    //         click: function () {
    //             window.open('https://aimu.app');
    //             console.info('You clicked on the custom layer');
    //         },
    //         style: {
    //             position: 'absolute',
    //             top: '20px',
    //             right: '20px',
    //             opacity: '.9',
    //         },
    //     },
    // ],
    quality: [
        {
            default: true,
            html: 'SD 480P',
            url: 'https://artplayer.org/assets/sample/video.mp4',
        },
        {
            html: 'HD 720P',
            url: 'https://artplayer.org/assets/sample/video.mp4',
        },
    ],
    thumbnails: {
        url: 'https://artplayer.org/assets/sample/thumbnails.png',
        number: 60,
        column: 10,
    },
    subtitle: {
        url: 'https://artplayer.org/assets/sample/subtitle.srt',
        type: 'srt',
        style: {
            color: '#fe9200',
            fontSize: '20px',
        },
        encoding: 'utf-8',
    },
    highlight: [
        {
            time: 15,
            text: 'One more chance',
        },
        {
            time: 30,
            text: '谁でもいいはずなのに',
        },
        {
            time: 45,
            text: '夏の想い出がまわる',
        },
        {
            time: 60,
            text: 'こんなとこにあるはずもないのに',
        },
        {
            time: 75,
            text: '终わり',
        },
    ],
    controls: [
        {
            position: 'right',
            html: 'Control',
            index: 1,
            tooltip: 'Control Tooltip',
            style: {
                marginRight: '20px',
            },
            click: function () {
                console.info('You clicked on the custom control');
            },
        },
    ],
    icons: {
        loading: '<img src="https://artplayer.org/assets/img/ploading.gif">',
        state: '<img width="150" heigth="150" src="https://artplayer.org/assets/img/state.svg">',
        indicator: '<img width="16" heigth="16" src="https://artplayer.org/assets/img/indicator.svg">',
    },
    type: 'mp4', // 可选，但最好填上
    customType: {
        m3u8: async function (video, url) {
            const { default: Hls } = await import('hls.js');
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
            } else {
                art.notice.show = '不支持播放格式：m3u8';
            }

            // 切换地址前，要销毁上一个解码器实例
            if (hls) {
                hls.destroy();
            }

            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        },
        flv: async function (video, url) {
            // const { default: flvjs } = await import('flv.js');

            if (flvjs.isSupported()) {
                const flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: url,
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
            } else {
                art.notice.show = '不支持播放格式：flv';
            }
        },
        mpd: async function (video, url) {
            // const { default: dashjs } = await import('dash.js');

            var player = dashjs.MediaPlayer().create();
            player.initialize(video, url, true);

            shaka.polyfill.installAll();
            var player = new shaka.Player(video);
            player.load(url);
        },
        torrent: async function (video, url, art) {
            const { default: torrentjs } = await import('assets/js/webtorrent-1.9.2/webtorrent.min.js');
            
            var client = new WebTorrent();
            art.loading.show = true;
            client.add(url, function (torrent) {
                var file = torrent.files[0];
                file.renderTo(video, {
                    autoplay: true,
                });
            });
        },
    },
});
// 播放器销毁时，也要销毁解码器实例
art.on('destroy', () => {
    if (hls) {
        hls.destroy();
    }
});
art.on('ready', () => {
    art.template.$video.controls = false;
});

// // 你可以切换新的视频地址
// art.type = 'm3u8';
// art.url = '/assets/sample/video-new.m3u8';

// // 你还可以切换新的视频类型
// art.type = 'flv';
// art.url = '/assets/sample/video.flv';

// art.type = 'mpd';
// art.url = '/assets/sample/video.mpd';