(function () {
    'use strict'

    // TODO Bingoカードの数字のmin・maxを確認
    let bingo = (function (from, to) {
        let tmp = [];
        for (tmp; from <= to; from++) {
            tmp.push(('0' + from).slice(-2));
        }
        return tmp;
    })(1, 75);

    let timers = [];
    let results = [];
    let stopCount = 0;
    let isPlaying = false;

    // ランダムメソッドでセレクトされた数字
    let bingoNum = 0;

    // bingoNumをBingo配列から削除る変数
    let delArrayNum = 0;

    // レンダリング変数
    let panel1 = document.getElementById('panel1');
    let panel10 = document.getElementById('panel10');
    let btn0 = document.getElementById('btn0');
    let spinButton = document.getElementById('spinButton');

    // let soundManager = soundManager();

    // 結果のレンダリング
    let renderBingo = function () {
        let fragment = document.createDocumentFragment();
        let divWrapper;
        bingo.forEach(function (elem, index) {
            if (index % 15 === 0) {
                divWrapper = fragment.appendChild(document.createElement("div"));
            }
            let numDiv = divWrapper.appendChild(document.createElement("div"));
            numDiv.className = "bingo";
            numDiv.innerHTML = elem;
        });
        let result = document.getElementById("result");
        result.appendChild(fragment)
    }
    renderBingo();

    // mp3ファイルを実行するメソッド
    function SoundManager() {
        let drum = document.getElementById('audio_drum');
        let cymbal= document.getElementById('audio_cymbal');

        return {
            playDrum: playDrum,
            stopDrum: stopDrum,
            playCymbal: playCymbal
        }

        function playDrum() {
            if(drum == null) {
                return;
            }
            drum.currentTime = 0;
            drum.play();
        }

        function stopDrum() {
            if(drum == null) {
                return;
            }
            drum.pause();
        }

        function playCymbal() {
            if(cymbal == null) {
                return;
            }
            cymbal.currentTime = 0;
            cymbal.play();
        }
    }
})();