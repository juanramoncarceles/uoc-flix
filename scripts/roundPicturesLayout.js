/**
 * 
 * @param {*} images  //const images = document.querySelectorAll('#movie-images > img');
 */
function roundPicturesLayout(images) {

  const amountImg = images.length;

  // Homogeneous angle distribution
  const angleBetween = (2 * Math.PI) / amountImg;

  // Highlighted angle distribution
  const angleBigger = angleBetween * 1.2;
  const angleSmaller = ((2 * Math.PI) - (angleBigger * 2)) / (amountImg - 2);

  // The start of the distribution from top (-90º), by default would be from the right (0º)
  let absoluteAngle = -Math.PI / 2;

  const distFromCenter = 175;
  const distUnits = '%';

  // Index to add to the img elements
  // Used later to loop through all the elements at any position (wrap loop)
  let index = 0;

  images.forEach(img => {
    // Initial distribution set up
    distribute(img, distFromCenter, distUnits, absoluteAngle);
    img.dataset.angle = absoluteAngle;
    img.dataset.index = index++;
    absoluteAngle += angleBetween;
    // Mouse enter event
    img.addEventListener('mouseenter', function () {
      if (img.dataset.roundLayout === "false")
        return;
      const currentTransform = img.style.transform;
      img.style.transform = currentTransform.replace(/scale\(.+\)/, 'scale(1.5)');
      let imgElemIndex = img.dataset.index;
      let startAngle = Number(img.dataset.angle);
      for (let i = 0; i < amountImg; i++) {
        if (i === 1) {
          startAngle += angleBigger;
          distribute(images.item(imgElemIndex >= amountImg ? imgElemIndex - amountImg : imgElemIndex), distFromCenter, distUnits, startAngle);
        } else if (i > 1) {
          startAngle += angleSmaller;
          distribute(images.item(imgElemIndex >= amountImg ? imgElemIndex - amountImg : imgElemIndex), distFromCenter, distUnits, startAngle);
        }
        imgElemIndex++;
      }
    });
    // Mouse leave event
    img.addEventListener('mouseleave', function () {
      if (img.dataset.roundLayout === "false")
        return;
      const currentTransform = img.style.transform;
      img.style.transform = currentTransform.replace(/scale\(.+\)/, 'scale(1.0)');
      images.forEach(img => {
        distribute(img, distFromCenter, distUnits, img.dataset.angle);
      });
    });
  });

}

/**
 * Function to set the radial positon of the element
 * @param {HTMLElement} element 
 * @param {Number} dFromCenter 
 * @param {String} dUnits Distance units for the CSS style
 * @param {Number} angle 
 */
function distribute(element, dFromCenter, dUnits, angle) {
  const X = Math.cos(angle) * dFromCenter;
  const Y = Math.sin(angle) * dFromCenter;
  element.style.transform = `translate(${X}${dUnits},${Y}${dUnits}) scale(1.0)`;
}