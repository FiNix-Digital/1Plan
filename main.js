// Elite Academy - Main JavaScript File

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with simple animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }

  // Initialize scroll indicator
  initScrollIndicator();

  // Initialize mobile menu enhancements
  initMobileMenu();

  // Initialize auto-play carousel
  initCarousel();

  // Initialize form handlers
  initFormHandlers();
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "#6355a8ff";
      navbar.style.backdropFilter = "blur(15px)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "#6355a8ff";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "none";
    }
  }
});

// Smooth scrolling for navigation links
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

// Scroll indicator functionality
function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const nextSection =
        document.querySelector(".hero-section").nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    // Hide scroll indicator when user scrolls
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto";
      }
    });
  }
}

// Mobile menu enhancement
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.getComputedStyle(navbarToggler).display !== "none") {
          navbarToggler.click();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navbarCollapse.contains(e.target) &&
        !navbarToggler.contains(e.target)
      ) {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      }
    });
  }
}

// Auto-play carousel
function initCarousel() {
  const carousel = document.querySelector("#toppersCarousel");
  if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 5000,
      ride: "carousel",
    });
  }
}

// Animated counters for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = counter.textContent.replace(/\d+/, target);
        clearInterval(timer);
      } else {
        counter.textContent = counter.textContent.replace(
          /\d+/,
          Math.floor(current)
        );
      }
    }, 20);
  });
}

// Intersection Observer for counter animation
document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".stat-card");
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(statsSection);
  }
});

// Premium Sidebar Functions
function openSidebar() {
  const sidebar = document.getElementById("premiumSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  sidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  const sidebar = document.getElementById("premiumSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close sidebar on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSidebar();
  }
});

// Touch events for mobile sidebar
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("premiumSidebar");
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  if (sidebar) {
    sidebar.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    sidebar.addEventListener("touchmove", function (e) {
      if (!isDragging) return;

      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;

      if (diffX > 0) {
        sidebar.style.transform = `translateX(${diffX}px)`;
      }
    });

    sidebar.addEventListener("touchend", function (e) {
      if (!isDragging) return;

      const diffX = currentX - startX;

      if (diffX > 100) {
        closeSidebar();
      } else {
        sidebar.style.transform = "translateX(0)";
      }

      isDragging = false;
      sidebar.style.transform = "";
    });
  }
});

// Form Handlers
function initFormHandlers() {
  // Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleContactForm(this);
    });
  }

  // Apply Form Handler
  const applyForm = document.getElementById("applyForm");
  if (applyForm) {
    applyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleApplyForm(this);
    });
  }

  // Demo Form Handler
  const demoForm = document.getElementById("demoForm");
  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleDemoForm(this);
    });
  }
}

// Contact Form Handler
function handleContactForm(form) {
  const formData = new FormData(form);
  const firstName = formData.get("firstName") || "";
  const lastName = formData.get("lastName") || "";
  const email = formData.get("email") || "";
  const courseInterested = formData.get("courseInterested") || "";
  const currentClass = formData.get("currentClass") || "";
  const message = formData.get("message") || "";
  const contactMethod = formData.get("contactMethod") || "email";
  const newsletter = formData.get("newsletter") ? "Yes" : "No";

  // Validate required fields
  if (!firstName || !lastName || !email || !courseInterested || !message) {
    showAlert("error", "Please fill in all required fields.");
    return;
  }

  // Create message content
  const fullName = `${firstName} ${lastName}`;
  const messageContent = createContactMessage({
    fullName,
    email,
    courseInterested,
    currentClass,
    message,
    newsletter,
  });

  // Handle based on selected contact method
  if (contactMethod === "whatsapp") {
    sendToWhatsApp(messageContent);
  } else {
    sendToEmail(email, fullName, courseInterested, messageContent);
  }

  // Show success message
  showAlert(
    "success",
    `Message sent successfully via ${
      contactMethod === "whatsapp" ? "WhatsApp" : "Email"
    }!`
  );

  // Reset form
  form.reset();
}

// Apply Form Handler
function handleApplyForm(form) {
  const formData = new FormData(form);
  const studentName = formData.get("studentName") || "";
  const studentEmail = formData.get("studentEmail") || "";
  const studentPhone = formData.get("studentPhone") || "";
  const courseInterest = formData.get("courseInterest") || "";

  if (!studentName || !studentEmail || !studentPhone || !courseInterest) {
    showAlert("error", "Please fill in all required fields.");
    return;
  }

  const applicationMessage = `
🎓 *New Application - Elite Academy*

👤 *Student Details:*
Name: ${studentName}
Email: ${studentEmail}
Phone: ${studentPhone}
Course: ${courseInterest}

⏰ *Application Time:* ${new Date().toLocaleString()}
    `.trim();

  // Send to WhatsApp
  sendToWhatsApp(applicationMessage);

  showAlert("success", "Application submitted successfully via WhatsApp!");

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("applyModal")
  );
  if (modal) {
    modal.hide();
  }
  form.reset();
}

// Demo Form Handler
function handleDemoForm(form) {
  const formData = new FormData(form);
  const studentName = formData.get("demoStudentName") || "";
  const parentName = formData.get("demoParentName") || "";
  const email = formData.get("demoEmail") || "";
  const course = formData.get("demoCourse") || "";
  const date = formData.get("demoDate") || "";
  const time = formData.get("demoTime") || "";

  if (!studentName || !parentName || !email || !course || !date || !time) {
    showAlert("error", "Please fill in all required fields.");
    return;
  }

  const demoMessage = `
🎓 *Demo Class Booking - Elite Academy*

👤 *Student Details:*
Student Name: ${studentName}
Parent Name: ${parentName}
Email: ${email}
Course: ${course}

📅 *Preferred Schedule:*
Date: ${date}
Time: ${time}

⏰ *Booking Time:* ${new Date().toLocaleString()}
    `.trim();

  // Send to WhatsApp
  sendToWhatsApp(demoMessage);

  showAlert("success", "Demo class booking sent successfully via WhatsApp!");

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("demoModal")
  );
  if (modal) {
    modal.hide();
  }
  form.reset();
}

// Create contact message content
function createContactMessage(data) {
  return `
🎓 *New Inquiry - Elite Academy*

👤 *Student Details:*
Name: ${data.fullName}
Email: ${data.email}
Course Interested: ${data.courseInterested}
${data.currentClass ? `Current Class: ${data.currentClass}` : ""}

📝 *Message:*
${data.message}

📧 *Newsletter Subscription:* ${data.newsletter}

⏰ *Inquiry Time:* ${new Date().toLocaleString()}
    `.trim();
}

// Send to WhatsApp
function sendToWhatsApp(message) {
  const phoneNumber = "918688118031";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");
}

// Send to Email
function sendToEmail(userEmail, userName, course, message) {
  const subject = `Elite Academy - Course Inquiry - ${course} - ${userName}`;
  const body = encodeURIComponent(message);
  const mailtoUrl = `mailto:finix.digital.solution@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${body}&cc=${userEmail}`;

  // Open email client
  window.location.href = mailtoUrl;
}

// Show alert messages
function showAlert(type, message) {
  // Remove existing alerts
  document.querySelectorAll(".custom-alert").forEach((alert) => alert.remove());

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${
    type === "success" ? "success" : "danger"
  } custom-alert`;
  alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: none;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

  alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${
              type === "success" ? "check-circle" : "exclamation-circle"
            } me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

  document.body.appendChild(alertDiv);

  // Trigger animation
  setTimeout(() => {
    alertDiv.style.opacity = "1";
    alertDiv.style.transform = "translateX(0)";
  }, 100);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.style.opacity = "0";
      alertDiv.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Enhanced button hover effects
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-background");

  if (heroBackground) {
    const rate = scrolled * -0.5;
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
});

// Make functions globally available
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
