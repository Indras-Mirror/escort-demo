/**
 * Brittney Fox — Minimal site JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.getElementById('navToggle')
  const mobileNav = document.getElementById('mobileNav')
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('active')
      toggle.setAttribute('aria-expanded', isOpen)
    })
  }

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active')
      toggle?.setAttribute('aria-expanded', 'false')
    })
  })

  // Navbar scroll opacity
  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.style.background = window.scrollY > 50
        ? 'rgba(10,10,10,0.95)'
        : 'rgba(10,10,10,0.9)'
    }
  })

  // Scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

  // Lightbox
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const galleryItems = document.querySelectorAll('.gallery-item')
  let currentIndex = 0

  function openLightbox(index) {
    currentIndex = index
    const img = galleryItems[index]?.querySelector('img')
    if (img && lightbox && lightboxImg) {
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
  }

  function closeLightbox() {
    lightbox?.classList.remove('active')
    document.body.style.overflow = ''
  }

  function navigateLightbox(direction) {
    const newIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length
    openLightbox(newIndex)
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i))
  })

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox)
  document.getElementById('lightboxPrev')?.addEventListener('click', () => navigateLightbox(-1))
  document.getElementById('lightboxNext')?.addEventListener('click', () => navigateLightbox(1))
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox()
  })

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') navigateLightbox(-1)
    if (e.key === 'ArrowRight') navigateLightbox(1)
  })

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]')

  window.addEventListener('scroll', () => {
    let current = ''
    sections.forEach(section => {
      const top = section.offsetTop - 100
      if (window.scrollY >= top) {
        current = section.getAttribute('id')
      }
    })
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
    })
  })
})
