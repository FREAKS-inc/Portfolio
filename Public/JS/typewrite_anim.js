
function typeAnimation(container){
    // grab the contents of the div into a const then clear it
    const text = container.innerHTML;
    container.innerHTML = "";

    // get each element with typing-animation class
    const typingAnimation = document.getElementsByClassName('typing-animation');

    // for each character in the div
    for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
        container.innerHTML += text.charAt(i);
        if (i === text.length - 1) {
            container.innerHTML += '<span class="typing-cursor">&#9474;</span>'; // add a blinking cursor after the text
        }
    }, i * 28); // adjust the delay time (in milliseconds) to change the speed of the typing animation
    }
};

// when the document loads, get all elements with this class and animate for each of them
window.onload = function() {
    var containers = document.getElementsByClassName("typing-animation");
    for (var i = 0; i < containers.length; i++) {
      typeAnimation(containers[i]);
    }
  };