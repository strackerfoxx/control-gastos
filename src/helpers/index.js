export const generarId = () => {
    const random = Math.random().toString(36).substr(2);
      const date = Date.now().toString(36);
      return random + date;
}

export const fechaFormato = fecha => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }

  return fechaNueva.toLocaleDateString('es-ES', opciones)
}