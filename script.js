const canvas = document.getElementById("neural-bg");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Configuration ---
const config = {
  nodeColorPalette: ["#00ffff", "#ff00ff", "#ffff00", "#ffffff"],
  connectionLineColor: "#00ffff",
  mouseInteractionRadius: 100, // Radius for mouse repulsion effect
  nodeConnectionDistance: 150, // Max distance to connect nodes
  nodeBaseSpeed: 0.5,
};

let nodes = [];
let mouse = {
  x: undefined,
  y: undefined,
  radius: config.mouseInteractionRadius,
};

// --- Node Class ---
// Represents a single particle in the animation
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * config.nodeBaseSpeed;
    this.vy = (Math.random() - 0.5) * config.nodeBaseSpeed;
    this.radius = Math.random() * 4+ 1;
    this.color = config.nodeColorPalette[
      Math.floor(Math.random() * config.nodeColorPalette.length)
    ];
  }

  // Update node's position and handle interactions
  update() {
    // Wall bouncing logic
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    
    this.x += this.vx;
    this.y += this.vy;

    // Mouse repulsion logic
    const dxMouse = this.x - mouse.x;
    const dyMouse = this.y - mouse.y;
    const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

    if (distanceMouse < mouse.radius) {
      const force = (mouse.radius - distanceMouse) / mouse.radius;
      this.x += (dxMouse / distanceMouse) * force * 2;
      this.y += (dyMouse / distanceMouse) * force * 2;
    }
  }

  // Draw the node on the canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // Add glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// --- Main Functions ---

// In your init() function
function init() {
  nodes = [];
  // ✅ Decreased divisor for more nodes
  const numberOfNodes = (canvas.width * canvas.height) / 6000;
  for (let i = 0; i < numberOfNodes; i++) {
    nodes.push(
      new Node(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }
}

// In your connectNodes() function
function connectNodes() {
  ctx.shadowBlur = 0; 
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.nodeConnectionDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / config.nodeConnectionDistance})`;
        // ✅ Increased line width for thicker lines
        ctx.lineWidth = 0.8;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
}

// The main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  nodes.forEach((node) => {
    node.update();
    node.draw();
  });
  
  connectNodes();
  
  requestAnimationFrame(animate);
}

// --- Event Listeners ---

// Update mouse coordinates
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Handle window resizing
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = config.mouseInteractionRadius;
  init(); // Re-create nodes for the new size
});

// --- Start Animation ---
init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => { // ✅ fixed qyerySelectorAll -> querySelectorAll
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) { // ✅ fixed window.scroll -> window.scrollY
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  const sections = document.querySelectorAll(".fade-in"); // ✅ fixed single element -> querySelectorAll
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect(); // ✅ fixed react -> rect
    if (rect.top < window.innerHeight * 0.8) {
      section.classList.add("visible");
    }
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! This is demo");
  });
}
