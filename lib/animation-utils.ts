// Variantes de animación para Framer Motion
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const slideInFromRight = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: 30,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const slideInFromLeft = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: -30,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Animación para el botón de añadir al carrito
export const addToCartAnimation = {
  tap: { scale: 0.95 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
}

// Animación para el menú móvil
export const mobileMenuAnimation = {
  closed: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
}

export const menuItemAnimation = {
  closed: { x: -20, opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

// Animación para el botón flotante
export const floatingButtonAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.9 },
}

// Nuevas animaciones para transiciones de página
export const pageTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
}

// Animación para tarjetas con efecto de elevación
export const cardHoverAnimation = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

// Animación para el cambio de título
export const titleChangeAnimation = {
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
  },
}

// Animación para el indicador de carga
export const loadingIndicatorAnimation = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1,
      ease: "linear",
    },
  },
}
