(function() {
    'use strict'

    // TODO Bingoカードの数字のmin・maxを確認
    let bingo = (function(from, to) {
        let tmp = [];
        for(tmp; from <= to; from++) {
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
})();