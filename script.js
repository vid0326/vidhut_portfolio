

    // --- 1. Mobile Navigation Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        document.querySelectorAll(".nav-menu a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // --- 2. Navigation Bar Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 3. Mouse Follower Glow Effect ---
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // --- 4. Animate on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    // --- 5. "Neural Network" Background Canvas Animation ---
    const canvas = document.getElementById("neural-bg");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const config = {
            nodeColorPalette: ["#00ffff", "#ff00ff", "#ffff00", "#ffffff"],
            connectionLineColor: "#00ffff",
            mouseInteractionRadius: 100,
            nodeConnectionDistance: 150,
            nodeBaseSpeed: 0.5,
        };

        let nodes = [];
        let mouse = { x: undefined, y: undefined, radius: config.mouseInteractionRadius };

        class Node {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * config.nodeBaseSpeed;
                this.vy = (Math.random() - 0.5) * config.nodeBaseSpeed;
                this.radius = Math.random() * 4 + 1;
                this.color = config.nodeColorPalette[
                    Math.floor(Math.random() * config.nodeColorPalette.length)
                ];
            }
            update() {
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                this.x += this.vx;
                this.y += this.vy;

                const dxMouse = this.x - mouse.x;
                const dyMouse = this.y - mouse.y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distanceMouse < mouse.radius) {
                    const force = (mouse.radius - distanceMouse) / mouse.radius;
                    this.x += (dxMouse / distanceMouse) * force * 2;
                    this.y += (dyMouse / distanceMouse) * force * 2;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function init() {
            nodes = [];
            const numberOfNodes = (canvas.width * canvas.height) / 6000;
            for (let i = 0; i < numberOfNodes; i++) {
                nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        }

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
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach((node) => { node.update(); node.draw(); });
            connectNodes();
            requestAnimationFrame(animate);
        }

        window.addEventListener("mousemove", (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        init();
        animate();
    }

    // --- 6. Contact Form Demo ---
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Message sent! This is demo");
        });
    }


