// Verificar si este archivo existe y tiene contenido válido
// Si no existe, crearlo con el siguiente contenido:

document.addEventListener("DOMContentLoaded", () => {
  // Referencia al carrusel
  const carousel = document.getElementById("categories-carousel")
  if (!carousel) return

  // Guardar la altura original del carrusel para el padding compensatorio
  const carouselHeight = carousel.offsetHeight

  // Elemento para mantener el espacio cuando el carrusel se fija
  let spacer = document.getElementById("carousel-spacer")
  if (!spacer) {
    spacer = document.createElement("div")
    spacer.id = "carousel-spacer"
    carousel.parentNode?.insertBefore(spacer, carousel.nextSibling)
  }

  // Variable para almacenar la posición original del carrusel
  let carouselPosition = null

  // Función para manejar el scroll
  const handleScroll = () => {
    // Guardar la posición original del carrusel la primera vez
    if (carouselPosition === null) {
      carouselPosition = carousel.getBoundingClientRect().top + window.scrollY
    }

    // Si hemos scrolleado más allá de la posición original del carrusel
    if (window.scrollY > carouselPosition) {
      // Añadir clase para estilos adicionales
      carousel.classList.add("fixed")
      // Ajustar el espaciador para mantener el flujo del documento
      spacer.style.height = `${carouselHeight}px`
    } else {
      // Quitar clase
      carousel.classList.remove("fixed")
      // Restaurar el espaciador
      spacer.style.height = "0"
    }
  }

  // Función para recalcular la posición en caso de resize
  const handleResize = () => {
    carouselPosition = null // Resetear para recalcular
    handleScroll() // Llamar inmediatamente para actualizar
  }

  // Añadir los event listeners
  window.addEventListener("scroll", handleScroll)
  window.addEventListener("resize", handleResize)

  // Llamar una vez para configurar el estado inicial
  handleScroll()
})
