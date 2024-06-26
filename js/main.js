function accordionToggleEvent(e) {
    let accordion = e.currentTarget.closest('.faq-accordion')
    let dropdown = accordion.querySelector('.faq-accordion-dropdown')
    let activeAccordion = document.querySelector('.faq-accordion.active')

    accordion.classList.toggle('active')
    if (accordion.classList.contains('active')) {
        if (activeAccordion) {
            activeAccordion.classList.remove('active')
            // activeAccordion.querySelector('.faq-accordion-dropdown').style.height = "0px"
        }
        // dropdown.style.height = `${dropdown.scrollHeight + 30}px`
    } else {
        // dropdown.style.height = "0px"
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

document.querySelectorAll('.navigation__item a').forEach(link => {
    link.addEventListener('click', ()=>{
        document.querySelector('.navigation').classList.remove("active")
        document.body.classList.remove("disable--scroll")
    })
})

document.querySelector('.burger-button').addEventListener('click', BurgerMenuEvent)

if (document.querySelector('.roadmap-scroll')) {
    const roadmapItem = document.querySelector('.roadmap-scroll')
    let isDown = false
    let startX
    let scrollLeft
    
    roadmapItem.addEventListener('mousedown', (e) => {
      isDown = true
      roadmapItem.classList.add('active')
      startX = e.pageX - roadmapItem.offsetLeft
      scrollLeft = roadmapItem.scrollLeft
    });
    roadmapItem.addEventListener('mouseleave', () => {
      isDown = false;
      roadmapItem.classList.remove('active')
    });
    roadmapItem.addEventListener('mouseup', () => {
      isDown = false;
      roadmapItem.classList.remove('active')
    });
    roadmapItem.addEventListener('mousemove', (e) => {
      if(!isDown) return
      e.preventDefault()
      const x = e.pageX - roadmapItem.offsetLeft
      const walk = (x - startX);
      roadmapItem.scrollLeft = scrollLeft - walk
    })
}

if (document.querySelector('.scroll-wrapper')) {
    const scrollItem = document.querySelector('.scroll-wrapper')
    const backButton = document.querySelector('.back-button')
    let isDown = false
    let startX
    let scrollLeft
    
    scrollItem.addEventListener('mousedown', (e) => {
      isDown = true
      scrollItem.classList.add('active')
      startX = e.pageX - scrollItem.offsetLeft
      scrollLeft = scrollItem.scrollLeft
    });
    scrollItem.addEventListener('mouseleave', () => {
      isDown = false;
      scrollItem.classList.remove('active')
    });
    scrollItem.addEventListener('mouseup', () => {
      isDown = false;
      scrollItem.classList.remove('active')
    });
    scrollItem.addEventListener('mousemove', (e) => {
      if(!isDown) return
      e.preventDefault()
      const x = e.pageX - scrollItem.offsetLeft
      const walk = (x - startX);
      scrollItem.scrollLeft = scrollLeft - walk
      if (+scrollItem.scrollLeft > 300) {
        backButton.classList.add('active')
      } else {
        backButton.classList.remove('active')
      }
    })
    scrollItem.addEventListener('scroll', (e) => {
      if (+scrollItem.scrollLeft > 300) {
        backButton.classList.add('active')
      } else {
        backButton.classList.remove('active')
      }
    })
    backButton.addEventListener('click', () => {
        scrollItem.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        backButton.classList.remove('active')
    })
}

function setItemCount(count) {
  if (+document.getElementById('from').innerHTML + count < 1) { return }
  if (+document.getElementById('to').innerHTML + count > +document.querySelectorAll('.gallery-item').length) { return }
  document.getElementById('from').innerHTML = +document.getElementById('from').innerHTML + count
  document.getElementById('to').innerHTML = +document.getElementById('to').innerHTML + count
}

if (document.querySelector('.swipe-action')) {
  let gallery = document.querySelector('.gallery-wrapper')

  document.querySelector('.swiper-prev').addEventListener('click', ()=>{
    let delta = +document.querySelector('.gallery-item').clientWidth + 10
    gallery.scrollTo({
      top: 0,
      left: gallery.scrollLeft - delta,
      behavior: "smooth",
    });

    if (gallery.scrollLeft <= 0) { return }
    setItemCount(-1)
  })

  document.querySelector('.swiper-next').addEventListener('click', ()=>{
    let delta = +document.querySelector('.gallery-item').clientWidth + 10
    let isChange = +gallery.scrollLeft
    gallery.scrollTo({
      top: 0,
      left: gallery.scrollLeft + delta,
      behavior: "smooth",
    });
    if (isChange + delta > gallery.scrollWidth) { return }
    setItemCount(1)
  })
}