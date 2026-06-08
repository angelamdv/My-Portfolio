/* Email */
emailjs.init("fe0XpQJrwSD_x329H");

/* Cursor */
var cursor_dot  = document.getElementById("cursor_dot");
var cursor_ring = document.getElementById("cursor_ring");
var ring_x = 0, ring_y = 0, mouse_x = 0, mouse_y = 0;

document.addEventListener("mousemove", function(e) {
  mouse_x = e.clientX;
  mouse_y = e.clientY;
  cursor_dot.style.left  = mouse_x + "px";
  cursor_dot.style.top   = mouse_y + "px";
});

(function animateCursorRing() {
  ring_x += (mouse_x - ring_x) * 0.12;
  ring_y += (mouse_y - ring_y) * 0.12;
  cursor_ring.style.left = ring_x + "px";
  cursor_ring.style.top  = ring_y + "px";
  requestAnimationFrame(animateCursorRing);
})();

/* Hide cursor on touch devices */
if ("ontouchstart" in window) {
  cursor_dot.style.display  = "none";
  cursor_ring.style.display = "none";
}

/* Welcome Screen */
var welcome_screen_element = document.getElementById("welcome_screen");
var main_content_element   = document.getElementById("main_content");
var welcome_particles_el   = document.getElementById("welcome_particles");

/* Spawn floating particles in welcome screen */
(function spawnWelcomeParticles() {
  var count = 28;
  for (var i = 0; i < count; i++) {
    var p = document.createElement("div");
    var size = Math.random() * 3 + 1;
    var x    = Math.random() * 100;
    var dur  = Math.random() * 4 + 3;
    var del  = Math.random() * 2;
    p.style.cssText =
      "position:absolute;" +
      "left:" + x + "%;bottom:-10%;" +
      "width:" + size + "px;height:" + size + "px;" +
      "background:rgba(196,122,154," + (Math.random() * 0.5 + 0.2) + ");" +
      "border-radius:50%;" +
      "animation:particle_rise " + dur + "s ease-in " + del + "s infinite;";
    welcome_particles_el.appendChild(p);
  }

  var style = document.createElement("style");
  style.textContent =
    "@keyframes particle_rise {" +
    "  0%   { transform:translateY(0) scale(1); opacity:1; }" +
    "  100% { transform:translateY(-110vh) scale(0.3); opacity:0; }" +
    "}";
  document.head.appendChild(style);
})();

function removeWelcomeScreen() {
  welcome_screen_element.style.display = "none";
  main_content_element.classList.remove("hidden");
}
setTimeout(removeWelcomeScreen, 2900);


/* Top bar */
var top_navbar = document.getElementById("top_navbar");
var nav_links_list = document.querySelectorAll(".nav_link");
var section_ids = ["section_home","section_about","section_education","section_experience","section_skills","section_projects","section_contacts","section_contact_form"];

function updateNavbarOnScroll() {
  if (window.scrollY > 40) {
    top_navbar.classList.add("scrolled");
  } else {
    top_navbar.classList.remove("scrolled");
  }

  var scroll_mid = window.scrollY + window.innerHeight * 0.4;
  var active_id = section_ids[0];

  section_ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && el.offsetTop <= scroll_mid) {
      active_id = id;
    }
  });

  nav_links_list.forEach(function(link) {
    var href = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active_link", href === active_id);
  });
}
window.addEventListener("scroll", updateNavbarOnScroll, { passive:true });
updateNavbarOnScroll();


/* Toggle */
function toggleMobileNav() {
  var nav_links_el = document.getElementById("nav_links");
  nav_links_el.classList.toggle("mobile_open");
}

nav_links_list.forEach(function(link) {
  link.addEventListener("click", function() {
    document.getElementById("nav_links").classList.remove("mobile_open");
  });
});


/* Animations */
var reveal_observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      /* Animate skill bars when skills section is visible */
      if (entry.target.classList.contains("skill_card")) {
        var fill = entry.target.querySelector(".skill_level_fill");
        if (fill) {
          var target_width = fill.style.width;
          fill.style.width = "0%";
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              fill.style.width = target_width;
            });
          });
        }
      }
      reveal_observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initRevealObserver() {
  document.querySelectorAll(".reveal_up, .reveal_right, .skill_card").forEach(function(el) {
    reveal_observer.observe(el);
  });
}

/* Run after welcome screen removes itself */
setTimeout(initRevealObserver, 3000);


/* Scroll Hint */
var scroll_hint_element        = document.getElementById("scroll_hint_text");
var scroll_hint_already_hidden = false;

function handlePageScroll() {
  if (window.scrollY > 1 && !scroll_hint_already_hidden) {
    scroll_hint_element.classList.add("hide_scroll_hint");
    scroll_hint_already_hidden = true;
  }
}
window.addEventListener("scroll", handlePageScroll, { passive:true });


/* Experience */
var jobs_data_list = [
  {
    job_title:    "Backend Intern Developer",
    company_name: "8Box Solutions Inc.",
    date_range:   "July – September 2025",
    responsibilities: [
      "Assisted in developing and maintaining client-based web systems using PHPRunner according to supervisor and client requirements.",
      "Managed and updated SQL databases, including creating tables and handling system data.",
      "Customized web system interfaces and functions using CSS and JavaScript.",
      "Uploaded and maintained updates on live client servers.",
      "Worked with different business systems, including shipment management, resort booking, and customer service platforms."
    ]
  }
];

var experience_details_box_element = document.getElementById("experience_details_box");

function showJobDetails(selected_job_index) {
  var all_job_cards = document.querySelectorAll(".experience_job_card");
  all_job_cards.forEach(function(card_element, card_index) {
    card_element.classList.toggle("active_job_card", card_index === selected_job_index);
  });

  var job = jobs_data_list[selected_job_index];
  var li_html = "";
  job.responsibilities.forEach(function(r) {
    li_html += "<li>" + r + "</li>";
  });

  experience_details_box_element.innerHTML =
    "<h3>" + job.job_title + "</h3>" +
    "<p class='exp_company_line'> " + job.company_name + "</p>" +
    "<p class='exp_date_line'> " + job.date_range + "</p>" +
    "<ul>" + li_html + "</ul>";

  experience_details_box_element.style.animation = "none";
  requestAnimationFrame(function() {
    experience_details_box_element.style.animation = "exp_fade_in 0.4s ease";
  });
}

showJobDetails(0);


/* Skills Filter Tab */
function filterSkills(category) {
  /* Update tab styles */
  document.querySelectorAll(".skill_tab").forEach(function(tab) {
    tab.classList.remove("active_tab");
    if (
      (category === "all"         && tab.textContent.trim() === "ALL") ||
      (category === "programming" && tab.textContent.trim() === "PROGRAMMING") ||
      (category === "tools"       && tab.textContent.trim() === "TOOLS & SOFTWARE") ||
      (category === "hardware"    && tab.textContent.trim() === "HARDWARE")
    ) {
      tab.classList.add("active_tab");
    }
  });

  var grid = document.getElementById("skills_grid");
  var cards = grid.querySelectorAll(".skill_card");

  grid.style.position = "relative";

  cards.forEach(function(card) {
    var card_cat = card.getAttribute("data-category");
    if (category === "all" || card_cat === category) {
      card.classList.remove("hidden_card");
      card.style.position = "";
      card.style.visibility = "";
    } else {
      card.classList.add("hidden_card");
    }
  });
}


/* Projects Gallery */
var gallery_track    = document.getElementById("projects_gallery_track");
var gallery_dots_el  = document.getElementById("gallery_dots");
var current_slide    = 0;
var total_slides     = 0;

function initGallery() {
  var slides = gallery_track.querySelectorAll(".project_slide");
  total_slides = slides.length;

  gallery_dots_el.innerHTML = "";
  for (var i = 0; i < total_slides; i++) {
    var dot = document.createElement("div");
    dot.className = "gallery_dot" + (i === 0 ? " active_dot" : "");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function() {
      goToSlide(parseInt(this.getAttribute("data-index")));
    });
    gallery_dots_el.appendChild(dot);
  }
}

function goToSlide(index) {
  if (index < 0) index = total_slides - 1;
  if (index >= total_slides) index = 0;
  current_slide = index;

  gallery_track.style.transform = "translateX(-" + (100 * current_slide) + "%)";

  var dots = gallery_dots_el.querySelectorAll(".gallery_dot");
  dots.forEach(function(dot, i) {
    dot.classList.toggle("active_dot", i === current_slide);
  });
}

function slideGallery(direction) {
  goToSlide(current_slide + direction);
}

var gallery_touch_start_x = null;
var gallery_outer = document.getElementById("projects_gallery_track_outer");

gallery_outer.addEventListener("touchstart", function(e) {
  gallery_touch_start_x = e.touches[0].clientX;
}, { passive:true });

gallery_outer.addEventListener("touchend", function(e) {
  if (gallery_touch_start_x === null) return;
  var dx = e.changedTouches[0].clientX - gallery_touch_start_x;
  if (Math.abs(dx) > 40) slideGallery(dx < 0 ? 1 : -1);
  gallery_touch_start_x = null;
}, { passive:true });

/* Auto-slide every 6 seconds */
var gallery_auto_timer = setInterval(function() {
  slideGallery(1);
}, 6000);

gallery_outer.addEventListener("mouseenter", function() {
  clearInterval(gallery_auto_timer);
});
gallery_outer.addEventListener("mouseleave", function() {
  gallery_auto_timer = setInterval(function() { slideGallery(1); }, 6000);
});

setTimeout(initGallery, 100);


/* Contact Form */
var EMAILJS_SERVICE_ID  = "service_izix77r";
var EMAILJS_TEMPLATE_ID = "template_a43n1pn";

function sendContactMessage() {
  var sender_name    = document.getElementById("sender_name_input").value.trim();
  var sender_email   = document.getElementById("sender_email_input").value.trim();
  var sender_message = document.getElementById("sender_message_input").value.trim();
  var status_element = document.getElementById("send_status_text");
  var send_btn       = document.getElementById("send_message_button");

  if (!sender_name || !sender_email || !sender_message) {
    status_element.textContent = "⚠ Please fill in all fields before sending.";
    return;
  }

  var email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email_regex.test(sender_email)) {
    status_element.textContent = "⚠ Please enter a valid email address.";
    return;
  }

  status_element.textContent = "Sending…";
  send_btn.disabled = true;
  send_btn.style.opacity = "0.7";

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    sender_name:    sender_name,
    sender_email:   sender_email,
    sender_message: sender_message
  })
  .then(function() {
    status_element.textContent = "✓ Message sent! Thank you for reaching out, " + sender_name + ".";
    document.getElementById("sender_name_input").value    = "";
    document.getElementById("sender_email_input").value   = "";
    document.getElementById("sender_message_input").value = "";
    send_btn.disabled = false;
    send_btn.style.opacity = "1";
  })
  .catch(function(error) {
    status_element.textContent = "Something went wrong. Please try again later.";
    console.error("EmailJS error:", error);
    send_btn.disabled = false;
    send_btn.style.opacity = "1";
  });
}


/* Resume */
var RESUME_LINK_URL = "https://drive.google.com/file/d/1qlaeV1eoeN6KPpSAwj87vBAl6hPZXaxU/view?usp=sharing";

function openResume() {
  window.open(RESUME_LINK_URL, "_blank");
}