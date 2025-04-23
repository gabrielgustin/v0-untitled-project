export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
      <div className="bg-montebello-navy/80 border border-montebello-gold/20 rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-montebello-gold mb-2">Página no encontrada</h2>
        <p className="text-montebello-light mb-6">Lo sentimos, la página que estás buscando no existe.</p>
        <div className="flex justify-center">
          <a
            href="/menu"
            className="bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy px-4 py-2 rounded-md"
          >
            Volver al menú
          </a>
        </div>
      </div>
    </div>
  )
}
