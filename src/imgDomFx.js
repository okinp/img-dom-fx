/*
 * Nikolas Psaroudakis
 * (c) 2019
 * www.o-e-m.org
 * License: MIT v2
 */

const imgDomFx = function(selector) {
  let imgHolder = document.querySelector(selector);
  let { rows, cols, gap } = imgHolder.dataset;
  let image = new Image();
  let src = imgHolder.src,
    width = image.clientWidth,
    height = image.clientHeight;
  let originalWidth, originalHeight;

  function getContainerStyle() {
    return `
      width: ${width};
      height: ${height};
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      grid-template-rows: repeat(${rows}, 1fr);
      gap: ${gap};
    `;
  }

  function getCellStyle(index) {
    let row = index % cols;
    let col = index - row * cols;
    return `
      width: 100%;
      height: 100%;
      background-image: url("${imgHolder.src}");
      background-clip: border-box;
      background-size: ${originalWidth}px ${originalHeight}px;
      transition: transform ease-in-out 300ms;
      background-position-x: calc(${col} * 100% / ${cols - 1});
      background-position-y: calc(${row} * 100% / ${rows - 1});
    `;
  }

  function getDom() {
    let containerStart = `<div class="img-fx-container" style="${getContainerStyle()}">`;
    let containerEnd = `</div>`;
    let content = "";

    for (let i = 0; i < cols * rows; i++) {
      content += `<div class="img-fx-cell" style="${getCellStyle(i)}"></div>`;
    }
    return containerStart + content + containerEnd;
  }
  image.onload = function() {
    originalWidth = this.width;
    originalHeight = this.height;
    console.log(getDom());
  };

  image.src = src;
};

export default imgDomFx;
