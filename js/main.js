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

if (document.querySelector('.faq-accordion')) {
    document.querySelectorAll('.faq-accordion-head').forEach((accordion) => accordion.addEventListener('click', accordionToggleEvent))
}