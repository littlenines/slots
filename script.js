let slotScreen = document.getElementById('slot-screen');
let reel = document.getElementsByClassName('reel');
let reels = document.getElementsByClassName('reels');
let stopBtn = document.getElementsByClassName('stop-btn');
let startBtn = document.getElementById('start-btn');

let sec = 100; // slot reel rotation speed
let stopReelFlag = []; // slot reel stop flag
let reelCounts = []; // which image to position
let slotFrameHeight; // frame size
let slotReelsHeight; // overall reel (image) size
let slotReelItemHeight; // Size of one reel (image)
let slotReelStartHeight; //initiate image value

// init
let slot = {
    init: function() {
        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },

    // click event
    start: function() {
        slot.init();
        for(let i = 0; i < 3; i++) {
            slot.animation(i);
        }
    },
    // stop button click
    stop: function(i) {
        stopReelFlag[i] = true;
        if(stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
            startBtn.removeAttribute('disabled');
        }
    },

    // set first position
    resetLocationInfo: function() {
        slotFrameHeight = slotScreen.offsetHeight;
        slotReelsHeight = reels[0].offsetHeight;
        slotReelItemHeight = reel[0].offsetHeight;
        slotReelStartHeight = -slotReelsHeight;
        slotReelStartHeight += slotFrameHeight - (slotFrameHeight / 2) + slotReelItemHeight * 3 / 2;
        for (let i = 0; i < reels.length; i++) {
            reels[i].style.top = toString(slotReelStartHeight) + "px";
        }
    },
    // Move the slot
    animation: function(index) {
        if (reelCounts[index] >= 8) {
            reelCounts[index] = 0;
        }
        $('.reels').eq(index).animate({"top":slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)},
    {
        duration:sec,
        easing: "linear",
        complete: function() {
            if(stopReelFlag[index]) return;
            reelCounts[index]++;
            slot.animation(index);
        }
    });
    },
}

window.onload = function() {
    slot.init();
    slot.resetLocationInfo();
    startBtn.addEventListener('click', function(e) {
        e.target.setAttribute('disabled', true);
        slot.start();
        for (let i = 0; i < stopBtn.length; i++) {
            stopBtn[i].removeAttribute('disabled')
        }
    });
    for (let i = 0; i < stopBtn.length; i++) {
        stopBtn[i].addEventListener('click', function(e) {
            slot.stop(e.target.getAttribute('data-val'));
        })
    }
}