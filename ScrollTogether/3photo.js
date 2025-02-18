// scrollAnimation.js

(function() {
    // Wait for the DOM to fully load
    document.addEventListener("DOMContentLoaded", function() {
      // Dynamically inject CSS styles
      var style = document.createElement("style");
      style.textContent = `
        html, body {
          margin: 0;
          padding: 0;
          width: 980px;
          height: 1830px;
          margin: 0 auto; /* centers the page horizontally */
          background: #fff;
          overflow-y: scroll;
        }
        /* Container matching the page dimensions */
        #vertical-container {
          position: relative;
          width: 980px;
          height: 1830px;
          overflow: hidden;
        }
        /* Styles for the 800px x 800px images */
        .vertical-img {
          position: absolute;
          width: 800px;
          height: 800px;
          left: 50%;
          transform: translateX(-50%);
          transition: top 0.2s ease-out;
        }
        /* Initial vertical positions: 10%, 40%, and 70% of container height */
        #img1 { top: 10%; }
        #img2 { top: 40%; }
        #img3 { top: 70%; }
      `;
      document.head.appendChild(style);
  
      // Create the container element
      var container = document.createElement("div");
      container.id = "vertical-container";
      document.body.appendChild(container);
  
      // Function to create and append an image element
      function createImage(id, src, alt) {
        var img = document.createElement("img");
        img.id = id;
        img.className = "vertical-img";
        img.src = src;
        img.alt = alt;
        container.appendChild(img);
        return img;
      }
  
      // Create the three images (replace with your image URLs)
      var img1 = createImage("img1", "https://static.wixstatic.com/media/de080b_1109a5e15a0a497bb9cbcb5055f7ac85~mv2.png", "Image 1");
      var img2 = createImage("img2", "https://static.wixstatic.com/media/de080b_59b9ffc604404214a4c578ed259d9a42~mv2.png", "Image 2");
      var img3 = createImage("img3", "https://static.wixstatic.com/media/de080b_f12ff21d369440659caa69c7d18f9fa3~mv2.png", "Image 3");
  
      // Scroll event handler to update image positions and send Velo messages
      function onScroll() {
        var containerHeight = container.offsetHeight; // 1830px
        var maxScroll = containerHeight - window.innerHeight;
        var scrollY = window.scrollY;
        var progress = Math.min(scrollY / maxScroll, 1);
  
        // Calculate the centered position for an 800px image
        var targetY = containerHeight / 2 - 400; // 400 = half of 800
  
        // Animate each image from its starting position to the center
        var startY1 = containerHeight * 0.10;
        img1.style.top = (startY1 + (targetY - startY1) * progress) + "px";
  
        var startY2 = containerHeight * 0.40;
        img2.style.top = (startY2 + (targetY - startY2) * progress) + "px";
  
        var startY3 = containerHeight * 0.70;
        img3.style.top = (startY3 + (targetY - startY3) * progress) + "px";
  
        // Send a message to the parent (Wix page) with the current scroll progress
        window.parent.postMessage({ action: "scrollProgress", progress: progress }, "*");
      }
  
      // Add scroll event listener
      window.addEventListener("scroll", onScroll);
  
      // Listen for messages from the parent (Wix Velo page code)
      window.addEventListener("message", function(event) {
        if (event.data && event.data.action === "hello") {
          console.log("Received message from parent:", event.data);
          // Optionally, you can respond or perform other actions here.
        }
      });
    });
  })();
  