const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("container").appendChild(canvas);

let particles = [];
let particleColor = "rgba(255,0,0,0.7)";
let maxParticles = 100;
let particleSize = 2; // Adjust this value to change particle size

function resize() {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;
}

function createParticle() {
  const bias = Math.random() * 0.3 + 0.35;
  const x =
    Math.random() * canvas.width * bias + (canvas.width * (1 - bias)) / 2;
  const y =
    Math.random() * canvas.height * bias + (canvas.height * (1 - bias)) / 2;
  particles.push({ x, y, size: particleSize });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += Math.sin(i + Date.now() / 1000) * 0.5;
    p.y += Math.cos(i + Date.now() / 1000) * 0.5;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = particleColor;
    ctx.fill();
  });

  // Create edges between particles
  for (let i = 0; i < particles.length; i++) {
    let minDistance = [Infinity, Infinity];
    let closestIndices = [-1, -1];

    for (let j = 0; j < particles.length; j++) {
      if (i !== j) {
        const dx = particles[j].x - particles[i].x;
        const dy = particles[j].y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance[0]) {
          minDistance[1] = minDistance[0];
          closestIndices[1] = closestIndices[0];

          minDistance[0] = distance;
          closestIndices[0] = j;
        } else if (distance < minDistance[1]) {
          minDistance[1] = distance;
          closestIndices[1] = j;
        }
      }
    }

    closestIndices.forEach((closestIndex) => {
      if (closestIndex !== -1) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[closestIndex].x, particles[closestIndex].y);
        ctx.strokeStyle = particleColor;
        ctx.stroke();
      }
    });
  }

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  resize();
});

resize();

// Initially create 5 particles
for (let i = 0; i < 5; i++) {
  createParticle();
}

// Periodically add new particles up to a maximum
setInterval(() => {
  if (particles.length < maxParticles) {
    createParticle();
  }
}, 1000);

animateParticles();

var navItems = document.querySelectorAll(".info nav ul li");
var footerText = document.querySelector(".footer-text");

var contents = {
  Home: `<div class="anasayfa">Welcome to Localy, your one-stop platform for business networking right at your fingertips. Connect, collaborate, and grow your business with other local entrepreneurs and professionals in your area.</div>`,
  AboutUs:
    "Meet the team behind Localy, a dynamic trio of passionate innovators committed to transforming the landscape of local business networking. Eren Sozen, our Head of Operations, uses his extensive background in industrial engineering to streamline our operational processes and ensure the smooth functioning of the platform. Tuna Karagul, the Head of Financial Operations, expertly navigates the financial aspects of our business. Lastly, Noyan Eren Toksoy, our Head of Technical Operations and Lead Developer, employs his software engineering expertise to keep our platform technologically advanced and user-friendly. Together, we are committed to creating a thriving community of local entrepreneurs and professionals, offering a platform to connect, collaborate, and succeed. Localy is our vision of a connected, vibrant, and resourceful local business network, right at your fingertips.",

  OurAim:
    "Our main goal is to revolutionize networking for remote workers. Amidst the rise of remote work, we strive to meet the challenges of building meaningful business networks in cafe and virtual office environments. Our platform allows you to connect with nearby professionals and explore their expertise and projects. We are collaborating with a growing cafe chain and a top software company to transform the networking landscape for remote workers. As we continue to refine our vision, we invite investors to join us in fostering collaboration and community among remote professionals. Join Localy today and be part of the future of remote work and business networking.",
  Contact: `<form id="contactForm" action="https://formsubmit.co/tunakaragul3@gmail.com" method="POST">
  <input id="name" class="form-input" type="text" name="name" placeholder="Name" required>
  <input id="phone" class="form-input" type="tel" name="tel" placeholder="Phone" required>
  <input id="email" class="form-input" type="email" name="email" placeholder="Email" required>
  <textarea id="explanation" class="form-input" name="message" placeholder="Message" required></textarea>
  <input type="submit" value="Send">
</form>
`,
};

function hideElement(element) {
  element.classList.add("hidden");
}

function showElement(element) {
  element.classList.remove("hidden");
}

function handleClick(e) {
  navItems.forEach((item) => {
    item.classList.remove("active"); // Remove 'active' class from all items
  });

  e.target.classList.add("active"); // Add 'active' class to the clicked item

  // Fade out the footer text
  footerText.style.opacity = 0;

  // Change the footer text after the transition is done
  setTimeout(function () {
    footerText.innerHTML = contents[e.target.innerText];
    // Change the width if the selected item is 'KurucuOrtak'
    if (e.target.innerText == "KurucuOrtak") {
      footerText.style.width = "27%";
    } else {
      footerText.style.width = "25%";
    }

    // Toggle display of hizmet lists if the selected item is 'Hizmetlerimiz'
    if (e.target.innerText == "Hizmetlerimiz") {
      var hizmetHeaders = document.querySelectorAll(".hizmet-header");
      var hizmetLists = document.querySelectorAll(".hizmet-list");

      hizmetLists.forEach((list) => {
        list.style.display = "none";
      });

      hizmetHeaders.forEach((header) => {
        var list = header.querySelector(".hizmet-list");

        if (header === e.target) {
          list.style.display = "block";
        }

        header.addEventListener("click", function () {
          hizmetLists.forEach((list) => {
            if (list !== this.querySelector(".hizmet-list")) {
              list.style.display = "none";
            }
          });

          if (list.style.display === "none") {
            list.style.display = "block";
          } else {
            list.style.display = "none";
          }
        });
      });
    }

    // Fade in the new footer text
    footerText.style.opacity = 1;
  }, 1000); // 1s transition
}

navItems.forEach((item) => {
  item.style.cursor = "pointer"; // Add pointer cursor for clickable effect
  item.addEventListener("click", handleClick);
});

var themeSwitcher = document.querySelector("#theme-switcher");
themeSwitcher.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");

  // Change particle color based on the theme
});
document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("name").value;
      var phone = document.getElementById("phone").value;
      var email = document.getElementById("email").value;
      var explanation = document.getElementById("explanation").value;

      // Simple validation
      if (!name || !phone || !email || !explanation) {
        alert("Please fill all fields");
        return;
      }

      // TODO: Send data to the server
      console.log(name, phone, email, explanation);
    });
  }
});
/*window.addEventListener("load", function () {
  const loader = document.getElementById("loading");
  setTimeout(function () {
    loader.classList.add("fadeOut");
  }, 1500);
});*/
