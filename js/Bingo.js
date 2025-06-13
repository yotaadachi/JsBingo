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

    let soundManager = SoundManager();

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

    // SPINボタン押下処理
    spinButton.addEventListener('click', function () {
        if (isPlaying) return;

        soundManager.playDrum();
        isPlaying = true;

        this.className = 'inactive';
        btn0.className = 'btn';

        panel1.className = 'panel';
        panel10.className = 'panel';

        runSlot(0, panel1);
        runSlot(1, panel10);
    });

    // SPINボタン押下後の処理
    function runSlot(n, panel) {
        let num = bingo[Math.floor(Math.random() * bingo.length)];
        bingoNum = num;

        // ランダムにセレクトされた数字を1の位と10の位で分割表示させる
        let num1 = num.substring(0, 1);
        let num10 = num.substring(1, 2);

        // 表示
        panel1.innerHTML = num1;
        panel10.innerHTML = num10;

        timers[n] = setTimeout(function () {
            runSlot(n, panel)
        }, 25);
    }

    btn0.addEventListener('click', function() {
        stopSlot(0, panel1, panel10, this);
    })

    // STOPボタン押下後の処理
    function stopSlot(n, panel1, panel10, btn) {
        if (!isPlaying || results[n] !== undefined) return;
        btn.className = 'btn inactive';

        soundManager.stopDrum();
        soundManager.playCymbal();

        clearTimeout(timers[n]);
        clearTimeout(timers[n + 1]);

        // ランダムでセレクトされた数字bingoNumをBingo配列から削除
        delArrayNum = bingo.indexOf(bingoNum);
        if (delArrayNum >= 0) {
            // 削除
            bingo.splice(delArrayNum, 1);
        }
        stopCount++;

        if (stopCount === 1) {
            stopCount = 0;
            spinButton.className = '';

            let bingoDiv = document.querySelectorAll(".bingo");

            // change color
            bingoDiv[bingoNum - 1].innerHTML;
            bingoDiv[bingoNum - 1].className = 'bingo unmatched';

            // init
            isPlaying = false;
            spinButton.className = '';
            timers = [];
        }
    }

    // mp3ファイルを実行するメソッド
    function SoundManager() {
        let drum = document.getElementById('audio_drum');
        let cymbal = document.getElementById('audio_cymbal');

        return {
            playDrum: playDrum,
            stopDrum: stopDrum,
            playCymbal: playCymbal
        }

        function playDrum() {
            if (drum == null) {
                return;
            }
            drum.currentTime = 0;
            drum.play();
        }

        function stopDrum() {
            if (drum == null) {
                return;
            }
            drum.pause();
        }

        function playCymbal() {
            if (cymbal == null) {
                return;
            }
            cymbal.currentTime = 0;
            cymbal.play();
        }
    }
})();