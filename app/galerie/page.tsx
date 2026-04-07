export default function GaleriePage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="font-heading text-5xl text-mango">Galerie immersive</h1>
        <p className="mt-3 max-w-2xl text-cream/80">Mode exploration inspiré d'un parcours musée avec profondeur, inertie et ambiance lumineuse.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="organic-card aspect-[4/5] p-4">
              <div className="h-full w-full rounded-[2rem] border border-cream/20 bg-gradient-to-br from-indigo/40 to-earth/40" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
