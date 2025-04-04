// document.body.addEventListener("pointermove", (e) => {
//   const { currentTarget: el, clientX: x, clientY: y } = e;
//   const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
//   el.style.setProperty("--posX", x - l - w / 2);
//   el.style.setProperty("--posY", y - t - h / 2);
// });

document.querySelector(".control-buttons span").onclick = function () {
  let yourName = document.querySelector(".control-buttons .your-name");

  yourName.style.display = "block";
};

let music = document.getElementById("audio");

document.querySelector(".control-buttons .your-name span").onclick =
  function () {
    let yourName = document.querySelector(".control-buttons .your-name input");

    if (yourName.value == null || yourName.value == "") {
      document.querySelector(".name span").innerHTML = "Noob";
    } else {
      document.querySelector(".name span").innerHTML = yourName.value;
    }

    document.querySelector(".control-buttons").remove();

    music.play();
  };

let audio = document.getElementById("audio");
let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function (e) {
  audio.volume = e.currentTarget.value / 100;
});

//////////////////////////////////////////////////
// Volume Button

const volumeIcon = document.getElementById("volumeIcon");
const volumeControl = document.getElementById("volume-control");

volumeIcon.addEventListener("click", () => {
  // Check if the slider is currently visible
  if (volumeControl.style.visibility === "visible") {
    // If visible, hide it
    volumeControl.style.opacity = "0";
    setTimeout(() => (volumeControl.style.visibility = "hidden"), 200); // Delay to allow fade-out effect
  } else {
    // If hidden, show it
    volumeControl.style.visibility = "visible";
    setTimeout(() => (volumeControl.style.opacity = "1"), 0); // Delay to ensure visibility before changing opacity
  }
});

//////////////////////////////////////////////////

let duration = 1000;
let duration3 = 3000;
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // add click
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// /////////////////////////////////////////////////

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  //
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  //
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.character === secondBlock.dataset.character) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
    ////////////////////////////////////////////
    let allMatched = blocks.every((block) =>
      block.classList.contains("has-match")
    );
    let endVideo = document.querySelector(".endVideo");

    if (allMatched) {
      endVideo.style.display = "flex";
      function playVideo() {
        let videoEnd = document.querySelector(".endVideo video");
        videoEnd.play();
      }
      setTimeout(() => {
        playVideo();
      }, 2000);
      music.pause();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    // document.getElementById("fail").play();
  }
}

// /////////////////////////////////////////////////
// shuffle

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    //
    current--;
    //
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}
