// Script simplificado para manejar el comportamiento del carrusel sticky sin animaciones
document.addEventListener("DOMContentLoaded", () => {
  // Obtener el carrusel
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

  // Función para manejar el scroll sin animaciones
  function handleScroll() {
    // Obtener la posición actual del carrusel relativa a la ventana
    const carouselRect = carousel.getBoundingClientRect()

    // Verificar si el carrusel toca exactamente el borde superior de la pantalla
    if (carouselRect.top <= 0) {
      // Solo aplicar cambios si no está ya fijo
      if (!carousel.classList.contains("fixed")) {
        // Añadir clase para fijar el carrusel instantáneamente
        carousel.classList.add("fixed")

        // Ajustar el espaciador para mantener el flujo del documento
        spacer.style.height = `${carouselHeight}px`
      }
    } else {
      // Solo aplicar cambios si está fijo
      if (carousel.classList.contains("fixed")) {
        // Quitar clase instantáneamente
        carousel.classList.remove("fixed")

        // Restaurar el espaciador
        spacer.style.height = "0"
      }
    }
  }

  // Función para recalcular en caso de resize
  function handleResize() {
    // Actualizar la altura del carrusel en caso de que haya cambiado
    const newCarouselHeight = carousel.offsetHeight

    // Si el carrusel está fijo, actualizar también la altura del espaciador
    if (carousel.classList.contains("fixed")) {
      spacer.style.height = `${newCarouselHeight}px`
    }

    handleScroll() // Verificar la posición actual
  }

  // Añadir los event listeners
  window.addEventListener("scroll", handleScroll, { passive: true }) // passive para mejor rendimiento
  window.addEventListener("resize", handleResize)

  // Llamar una vez para configurar el estado inicial
  handleScroll()
})
