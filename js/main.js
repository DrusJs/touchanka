function accordionToggleEvent(e) {
    let accordion = e.currentTarget.closest('.faq-accordion')
    let dropdown = accordion.querySelector('.faq-accordion-dropdown')
    let activeAccordion = document.querySelector('.faq-accordion.active')

    accordion.classList.toggle('active')
    if (accordion.classList.contains('active')) {
        if (activeAccordion) {
            activeAccordion.classList.remove('active')
            activeAccordion.querySelector('.faq-accordion-dropdown').style.maxHeight = "0px"
        }
        dropdown.style.maxHeight = `${dropdown.scrollHeight + 30}px`
    } else {
        dropdown.style.maxHeight = "0px"
    }
}

function BurgerMenuEvent() {
    document.querySelector('.navigation').classList.toggle("active")
    document.body.classList.toggle("disable--scroll")
}

function checkBlocksVisibility() {
    let windowHeight = window.innerHeight;
    let blocks = document.querySelectorAll('.fade');
    let delayItem = window.matchMedia("(max-width: 800px)").matches ? 40 : 80
    let accordion = document.querySelector('.faq-item.active')
    let selects = document.querySelectorAll('.select-primary.active')

    blocks.forEach(block => {
        let blockPosition = block.getBoundingClientRect().top;

        if (blockPosition < windowHeight - delayItem) {
            block.style.opacity = "1";
            block.style.transform = "translateY(0)";
        }
    });
    if (accordion) {
        this.isVisible(accordion)
    }
    if (selects.length !== 0) {
        selects.forEach(el => {
            this.isVisible(el)
        })
    }
}
checkBlocksVisibility()

window.addEventListener('scroll', checkBlocksVisibility)

if (document.querySelector('.faq-accordion')) {
    document.querySelectorAll('.faq-accordion-head').forEach((accordion) => accordion.addEventListener('click', accordionToggleEvent))
}

document.querySelector('.burger-button').addEventListener('click', BurgerMenuEvent)

if (document.querySelector('.roadmap-scroll')) {
    const slider = document.querySelector('.roadmap-scroll')
    let isDown = false
    let startX
    let scrollLeft
    
    slider.addEventListener('mousedown', (e) => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active')
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active')
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX);
      slider.scrollLeft = scrollLeft - walk
    })
}