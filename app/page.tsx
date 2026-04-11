'use client';

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import logoImage from '@/images/ASM-LOGO.jpg';
import DANGOA from '@/images/DANGOA.png';
import SoirAuKwatta from '@/images/SOIR AU KWATTA.png';
import AwoulaAwoula from '@/images/Awoula awoula.png';
import PorteursDeJoie from '@/images/doualart1.jpg';

const useScrollProgress = (ref: React.RefObject<HTMLElement | null>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;

      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
};

const useIntersection = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a, button, .hover-trigger')) setIsHovering(true);
    };
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a, button, .hover-trigger')) setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { ...position, isHovering, isClicking };
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(true);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
};

const RevealText = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => {
  const [ref, isVisible] = useIntersection(0.2);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-12 opacity-0 blur-sm'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const RevealScale = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => {
  const [ref, isVisible] = useIntersection(0.2);
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 -rotate-2'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CinematicText = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => {
  const [ref, isVisible] = useIntersection(0.3);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1500ms] ease-out ${
        isVisible ? 'opacity-100 tracking-normal blur-none' : 'opacity-0 tracking-[0.2em] blur-[4px]'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FadeIn = ({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) => {
  const [ref, isVisible] = useIntersection(0.2);
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
};

const OrganicStarElement = ({ progress, mouseX, mouseY }: { progress: number; mouseX: number; mouseY: number }) => (
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 hover-trigger group transition-transform duration-75 ease-linear mix-blend-multiply"
    style={{
      transform: `translate(${(mouseX - 0.5) * 24}px, ${(mouseY - 0.5) * 24}px) rotate(${progress * 120}deg) scale(${1 + progress * 0.3})`,
      opacity: Math.max(0.25, 0.85 - progress * 0.45),
    }}
  >
    <svg viewBox="0 0 200 200" className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] animate-[spin_100s_linear_infinite] transition-all duration-1000 group-hover:blur-[2px] group-hover:opacity-60 group-hover:scale-105">
      <path
        fill="none"
        stroke="#30906B"
        strokeWidth="0.3"
        className="animate-pulse"
        d="M100,100 Q120,50 180,80 T100,100 Q80,150 20,120 T100,100 Q50,80 80,20 T100,100 Q150,120 120,180 T100,100"
      />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#7C7C7C" strokeWidth="0.1" strokeDasharray="2 4" className="animate-[spin_40s_linear_infinite_reverse]" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#B0B0B0" strokeWidth="0.5" className="blur-[1px]" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#30906B" strokeWidth="0.1" strokeDasharray="1 10" className="animate-[spin_20s_linear_infinite]" />
    </svg>
  </div>
);

export default function ArtSousLeManguierApp() {
  const heroRef = useRef<HTMLElement | null>(null);
  const transitionRef = useRef<HTMLElement | null>(null);
  const horizontalRef = useRef<HTMLElement | null>(null);
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);

  const heroProgress = useScrollProgress(heroRef);
  const transitionProgress = useScrollProgress(transitionRef);
  const horizontalProgress = useScrollProgress(horizontalRef);
  const mouse = useMousePosition();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [horizontalTravel, setHorizontalTravel] = useState(0);
  const mouseXRatio = typeof window !== 'undefined' ? mouse.x / window.innerWidth : 0.5;
  const mouseYRatio = typeof window !== 'undefined' ? mouse.y / window.innerHeight : 0.5;

  useEffect(() => {
    if (!isDesktop) {
      setHorizontalTravel(0);
      return;
    }

    const updateHorizontalTravel = () => {
      if (!horizontalTrackRef.current) return;
      const extraPadding = 96;
      const maxScroll = horizontalTrackRef.current.scrollWidth - window.innerWidth + extraPadding;
      setHorizontalTravel(Math.max(0, maxScroll));
    };

    updateHorizontalTravel();
    window.addEventListener('resize', updateHorizontalTravel);
    return () => window.removeEventListener('resize', updateHorizontalTravel);
  }, [isDesktop]);

  const experiences = [
    { tag: 'Exploration', title: 'DANGOA', subtitle: 'Cartographie poétique des quartiers', desc: 'Une exploration artistique où la ville devient une œuvre vivante. Parcours immersifs, déambulations et rencontres spontanées.', img: DANGOA.src, detail: 'Marcher, rencontrer, ressentir.' },
    { tag: 'Parole', title: 'Awoula Awoula', subtitle: 'La parole comme lien social', desc: 'Des soirées de contes et de récits partagés. Lectures à voix haute, performances de conteurs et échanges intergénérationnels.', img: AwoulaAwoula.src, detail: 'Chaque histoire devient mémoire.' },
    { tag: 'Immersion', title: 'Soir au Kwatta', subtitle: 'Immersion artistique multisensorielle', desc: 'Un mélange vibrant de musique, danse, projections et poésie. Un moment suspendu où les arts dialoguent et les émotions circulent.', img: SoirAuKwatta.src, detail: 'Le souffle de la nuit urbaine.' },
    { tag: 'Création', title: 'Porteurs de Joie', subtitle: 'L’art participatif au cœur des communautés', desc: 'Ateliers créatifs, installations éphémères et performances interactives. L’espace public devient un terrain de création collective.', img: PorteursDeJoie.src, detail: 'La joie comme acte de résistance.' },
  ];

  return (
    <div className="bg-[#F4F4F4] text-[#30906B] min-h-screen selection:bg-[#30906B] selection:text-[#F4F4F4] overflow-x-hidden relative cursor-auto md:cursor-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=Space+Mono&display=swap');

        html, body {
          font-family: 'Inter', sans-serif;
          scroll-behavior: smooth;
        }

        .serif { font-family: 'Playfair Display', serif; }
        .mono { font-family: 'Space Mono', monospace; }

        ::-webkit-scrollbar { display: none; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }

        .noise-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 9998;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div
        className={`fixed top-0 left-0 border rounded-full pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out hidden md:flex items-center justify-center mix-blend-difference
          ${mouse.isHovering ? 'w-16 h-16 bg-[#30906B] border-transparent scale-[1.8]' : 'w-6 h-6 border-[#F4F4F4]/60 bg-transparent scale-100'}
          ${mouse.isClicking ? 'scale-[0.9]' : ''}
        `}
        style={{ left: `${mouse.x}px`, top: `${mouse.y}px`, transitionProperty: 'width, height, background-color, border-color, transform' }}
      >
        <div className={`rounded-full transition-all duration-300 ${mouse.isHovering ? 'w-0 h-0 opacity-0' : 'w-1 h-1 bg-[#F4F4F4] opacity-100'}`} />
        <span className={`absolute text-[#30906B] mono text-[8px] uppercase tracking-widest transition-opacity duration-300 ${mouse.isHovering ? 'opacity-100' : 'opacity-0'}`}>Click</span>
      </div>

      <div className="noise-overlay"></div>

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[82%] max-w-6xl p-4 md:px-8 flex justify-between items-center z-50 bg-[#F4F4F4]/55 backdrop-blur-2xl border border-white/40 rounded-[28px] shadow-[0_10px_40px_rgba(48,144,107,0.12)] transition-all duration-300">
        <a href="#hero" className="relative group flex items-center hover-trigger cursor-pointer">
          <img src={logoImage.src} alt="Art Sous le Manguier Logo" className="h-10 md:h-12 w-auto mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
        </a>
        <div className="hidden md:flex gap-8 mono text-[10px] uppercase tracking-widest text-[#30906B]">
          {['Vision', 'Expériences', 'Impact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover-trigger cursor-pointer hover:text-[#7C7C7C] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#30906B] hover:after:w-full after:transition-all after:duration-300">{item}</a>
          ))}
        </div>
      </nav>

      <div className="fixed bottom-6 right-6 z-50">
        <a href="#cta" className="hover-trigger cursor-pointer flex items-center justify-center bg-[#30906B] text-[#F4F4F4] mono text-[10px] md:text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#7C7C7C] transition-all duration-500 shadow-xl hover:scale-105 group">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2 animate-pulse" />
          Collaborer
        </a>
      </div>

      <section id="hero" ref={heroRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 pt-24 md:pt-20">
          <OrganicStarElement progress={heroProgress} mouseX={mouseXRatio} mouseY={mouseYRatio} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F4F4F4_80%)] opacity-90 pointer-events-none z-1" />

          <div
            className="relative z-10 text-center flex flex-col items-center max-w-5xl"
            style={{
              opacity: 1 - heroProgress * 1.5,
              transform: `translateY(${heroProgress * 100}px)`,
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-[#30906B] rounded-full animate-pulse" />
              <p className="mono text-[#7C7C7C] text-[10px] md:text-xs tracking-[0.3em] uppercase">Initiative Artistique</p>
            </div>

            <h1 className="serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#30906B] mb-8 leading-[1.08]">
              L’art au cœur des quartiers.<br />
              <span className="italic text-[#7C7C7C]">Le lien au cœur de l’humain.</span>
            </h1>

            <p className="text-[#7C7C7C] text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Nous transformons les espaces urbains en expériences artistiques vivantes, où chaque voix compte, chaque histoire résonne, et chaque rencontre devient création.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="#experiences" className="hover-trigger cursor-pointer mono text-[10px] uppercase tracking-widest border border-[#B0B0B0] text-[#30906B] px-8 py-4 hover:border-[#30906B] transition-all duration-500 rounded-sm hover:-translate-y-1">
                Découvrir nos actions
              </a>
              <a href="#cta" className="hover-trigger cursor-pointer flex items-center justify-center gap-3 mono text-[10px] uppercase tracking-widest bg-[#30906B] text-[#F4F4F4] px-8 py-4 hover:bg-[#7C7C7C] transition-all duration-500 rounded-sm hover:-translate-y-1">
                Participer à l’expérience <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={transitionRef} className="relative h-[170vh] bg-[#2E403A]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#7C7C7C] blur-[150px] opacity-10 rounded-full mix-blend-screen" />

          <div
            className="relative z-10 space-y-16 max-w-4xl"
            style={{ transform: `translateY(${60 - transitionProgress * 120}px)` }}
          >
            <p
              className="serif text-5xl md:text-7xl text-[#F4F4F4] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              style={{ opacity: transitionProgress > 0.08 ? 1 : 0, transform: `scale(${transitionProgress > 0.08 ? 1 : 0.92})`, transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              La ville parle.
            </p>
            <p
              className="text-[#F4F4F4]/90 text-xl md:text-4xl font-light italic drop-shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
              style={{ opacity: transitionProgress > 0.35 ? 1 : 0, transform: `translateY(${transitionProgress > 0.35 ? 0 : 30}px)`, transition: 'all 1.2s ease-out' }}
            >
              Et si, cette fois, nous prenions vraiment le temps de l’écouter ?
            </p>
            <p
              className="text-[#F4F4F4]/95 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
              style={{ opacity: transitionProgress > 0.68 ? 1 : 0, filter: transitionProgress > 0.68 ? 'blur(0)' : 'blur(10px)', transition: 'all 1.5s ease-out' }}
            >
              Dans chaque rue, chaque visage, chaque silence…<br />
              <span className="text-[#F4F4F4] font-medium mt-6 block">se cache une histoire à révéler.</span>
            </p>
          </div>
        </div>
      </section>

      <section id="vision" className="relative z-20 bg-[#F4F4F4] py-32 md:py-48 px-6 md:px-12 border-b border-[#B0B0B0]/20 overflow-hidden">
        <div className="absolute -right-64 top-0 w-[800px] h-[800px] bg-[#B0B0B0] rounded-full blur-[200px] opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center mb-32 relative z-10">
          <RevealText>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#B0B0B0]" />
              <p className="mono text-[#7C7C7C] text-[10px] uppercase tracking-[0.2em]">Vision & Démarche</p>
              <span className="w-12 h-[1px] bg-[#B0B0B0]" />
            </div>
            <h2 className="serif text-4xl md:text-6xl lg:text-7xl text-[#30906B] mb-12">Créer du commun<br />dans un monde fragmenté</h2>
          </RevealText>

          <RevealText delay={200}>
            <p className="text-[#7C7C7C] text-xl font-light leading-relaxed max-w-3xl mx-auto">
              Inspirée par la pensée d’Édouard Glissant, notre démarche repose sur la <span className="text-[#30906B] font-medium border-b border-[#B0B0B0] pb-1">créolisation</span>, la <span className="text-[#30906B] font-medium border-b border-[#B0B0B0] pb-1">relation</span>, et la vision d&apos;un <span className="text-[#30906B] font-medium border-b border-[#B0B0B0] pb-1">archipel</span> interconnecté.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto relative z-10">
          <FadeIn delay={300} className="animate-float" style={{ animationDelay: '0s' }}>
            <div className="p-12 border border-[#B0B0B0]/30 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-md rounded-sm hover:bg-white/90 transition-all duration-500 shadow-[0_20px_60px_rgba(79,87,83,0.08)] hover:-translate-y-1">
              <h3 className="serif text-3xl text-[#30906B] mb-4 italic">Chaque quartier<br />devient une île.</h3>
            </div>
          </FadeIn>
          <FadeIn delay={500} className="animate-float" style={{ animationDelay: '-2s' }}>
            <div className="p-12 border border-[#B0B0B0]/30 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-md rounded-sm hover:bg-white/90 transition-all duration-500 shadow-[0_20px_60px_rgba(79,87,83,0.08)] hover:-translate-y-1">
              <h3 className="serif text-3xl text-[#30906B] mb-4 italic">Chaque rencontre,<br />un pont.</h3>
            </div>
          </FadeIn>
          <FadeIn delay={700} className="animate-float" style={{ animationDelay: '-4s' }}>
            <div className="p-12 border border-[#B0B0B0]/30 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-md rounded-sm hover:bg-white/90 transition-all duration-500 shadow-[0_20px_60px_rgba(79,87,83,0.08)] hover:-translate-y-1">
              <h3 className="serif text-3xl text-[#30906B] mb-4 italic">Chaque expérience,<br />une trace.</h3>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="experiences" ref={horizontalRef} className={`relative bg-[#F4F4F4] ${isDesktop ? 'h-[400vh]' : 'h-auto py-32'}`}>
        <div className={`${isDesktop ? 'sticky top-0 h-screen overflow-hidden' : 'relative'} bg-[#30906B] text-[#F4F4F4]`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(244,244,244,0.03)_0%,transparent_70%)] pointer-events-none" />

          <div className={`px-6 md:px-12 mb-12 relative z-10 ${isDesktop ? 'pt-24' : ''}`}>
            <RevealText>
              <h2 className="serif text-4xl md:text-6xl text-[#F4F4F4]">Nos Expériences</h2>
              <p className="mono text-[#B0B0B0] mt-4 text-[10px] tracking-widest uppercase flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#B0B0B0]" /> Formats immersifs
              </p>
            </RevealText>
          </div>

          <div
            ref={horizontalTrackRef}
            className={`flex ${isDesktop ? 'gap-12 px-12 w-max' : 'flex-col gap-8 px-6 w-full'} transition-transform duration-75 ease-linear will-change-transform pb-24`}
            style={{ transform: isDesktop ? `translateX(-${horizontalProgress * horizontalTravel}px)` : 'none' }}
          >
            {experiences.map((exp, i) => (
              <div key={i} className={`relative group overflow-hidden border border-[#B0B0B0]/20 rounded-sm shadow-2xl flex-shrink-0 bg-[#30906B] ${isDesktop ? 'w-[45vw] h-[60vh]' : 'w-full h-[60vh]'}`}>
                <img
                  src={exp.img}
                  className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.5] group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  alt={exp.title}
                />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-t from-[#000000]/90 via-[#000000]/20 to-transparent">
                  <div className="self-end mono text-[10px] uppercase tracking-widest text-[#F4F4F4] bg-[#F4F4F4]/10 backdrop-blur-md px-4 py-2 border border-[#F4F4F4]/20">{exp.tag}</div>

                  <div>
                    <h3 className="serif text-4xl md:text-5xl text-[#F4F4F4] mb-3">{exp.title}</h3>
                    <p className="text-[#B0B0B0] text-sm md:text-base italic mb-6 font-light">{exp.subtitle}</p>

                    <div className="h-[1px] w-12 bg-[#7C7C7C] mb-6" />

                    <p className="text-[#F4F4F4]/80 font-light text-sm leading-relaxed mb-8 max-w-md">{exp.desc}</p>

                    <button className="hover-trigger cursor-pointer flex items-center mono text-[10px] text-[#F4F4F4] uppercase tracking-widest group/btn">
                      <span className="w-8 h-8 rounded-full border border-[#F4F4F4]/30 flex items-center justify-center mr-4 group-hover/btn:bg-[#F4F4F4] group-hover/btn:text-[#30906B] transition-colors">→</span>
                      Explorer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isDesktop && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-[#B0B0B0]/20 overflow-hidden z-20 rounded-full">
              <div className="h-full bg-[#F4F4F4] transition-all duration-75 ease-linear" style={{ width: `${horizontalProgress * 100}%` }} />
            </div>
          )}
        </div>
      </section>

      <section id="impact" className="relative z-20 bg-[#F4F4F4] py-32 md:py-48 px-6 md:px-12 border-b border-[#B0B0B0]/20">
        <div className="max-w-6xl mx-auto mb-32 border-b border-[#B0B0B0]/30 pb-32">
          <RevealText>
            <h2 className="mono text-[#7C7C7C] text-[10px] uppercase tracking-[0.2em] mb-16 text-center">Un impact réel et mesurable</h2>
          </RevealText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <RevealScale delay={100}>
              <p className="serif text-7xl md:text-8xl text-[#30906B] mb-4">
                50<span className="text-[#7C7C7C]">+</span>
              </p>
              <p className="mono text-xs uppercase tracking-widest text-[#7C7C7C]">Événements réalisés</p>
            </RevealScale>
            <RevealScale delay={200}>
              <p className="serif text-7xl md:text-8xl text-[#30906B] mb-4">
                1k<span className="text-[#7C7C7C]">+</span>
              </p>
              <p className="mono text-xs uppercase tracking-widest text-[#7C7C7C]">Participants engagés</p>
            </RevealScale>
            <RevealScale delay={300}>
              <p className="serif text-7xl md:text-8xl text-[#4F5753] mb-4">10</p>
              <p className="mono text-xs uppercase tracking-widest text-[#7C7C7C]">Quartiers activés</p>
            </RevealScale>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <RevealText>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#30906B] rounded-full animate-pulse" />
                <h2 className="mono text-[#7C7C7C] text-[10px] uppercase tracking-[0.2em]">Engagements</h2>
              </div>
              <p className="serif text-4xl md:text-5xl text-[#30906B] mb-12">L’art comme moteur de transformation sociale</p>
            </RevealText>

            <div className="space-y-8">
              {['La cohésion sociale', 'L’inclusion culturelle', 'L’expression des jeunes', 'La valorisation des savoir-faire'].map((item, i) => (
                <RevealText key={i} delay={i * 100}>
                  <div className="flex items-center group cursor-pointer hover-trigger">
                    <div className="w-12 h-[1px] bg-[#B0B0B0] group-hover:w-20 group-hover:bg-[#30906B] transition-all duration-500 mr-6" />
                    <span className="text-xl text-[#30906B] font-light group-hover:pl-2 transition-all duration-300">{item}</span>
                  </div>
                </RevealText>
              ))}
            </div>
          </div>

          <div className="bg-[#30906B] text-[#F4F4F4] p-12 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C7C7C] blur-[100px] opacity-20 rounded-full" />
            <RevealText>
              <h2 className="serif text-3xl md:text-4xl mb-12 relative z-10">Une approche unique et profondément humaine</h2>
            </RevealText>

            <ul className="space-y-10 relative z-10">
              {[
                { title: 'Approche immersive', desc: 'Des expériences participatives in situ.' },
                { title: 'Ancrage local', desc: 'Une connexion forte avec les réalités urbaines.' },
                { title: 'Collaborations', desc: "Un réseau d'institutions culturelles reconnues." },
              ].map((adv, i) => (
                <RevealText key={i} delay={100 + i * 100}>
                  <li className="flex flex-col border-l border-[#7C7C7C]/50 pl-6 hover:border-[#F4F4F4] transition-colors duration-300">
                    <span className="mono text-[10px] uppercase tracking-widest text-[#B0B0B0] mb-2">{adv.title}</span>
                    <span className="text-[#F4F4F4]/90 font-light text-lg">{adv.desc}</span>
                  </li>
                </RevealText>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative py-40 bg-[#F4F4F4] border-b border-[#B0B0B0]/20 overflow-hidden flex items-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[200%] bg-[#B0B0B0]/20 transform rotate-45 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center space-y-32 relative z-10">
          <CinematicText>
            <blockquote className="space-y-8">
              <p className="serif text-3xl md:text-5xl lg:text-6xl text-[#30906B] italic leading-tight">
                “Une expérience artistique rare,<br />profondément humaine.”
              </p>
              <footer className="flex items-center justify-center gap-4 mono text-[10px] uppercase tracking-widest text-[#7C7C7C]">
                <span className="w-6 h-[1px] bg-[#B0B0B0]" /> Partenaire culturel <span className="w-6 h-[1px] bg-[#B0B0B0]" />
              </footer>
            </blockquote>
          </CinematicText>

          <CinematicText delay={200}>
            <blockquote className="space-y-8">
              <p className="serif text-3xl md:text-5xl lg:text-6xl text-[#30906B] italic leading-tight">“Un projet qui reconnecte les gens. L’art comme je ne l’avais jamais vécu.”</p>
              <footer className="flex items-center justify-center gap-4 mono text-[10px] uppercase tracking-widest text-[#7C7C7C]">
                <span className="w-6 h-[1px] bg-[#B0B0B0]" /> Participant <span className="w-6 h-[1px] bg-[#B0B0B0]" />
              </footer>
            </blockquote>
          </CinematicText>
        </div>
      </section>

      <section id="cta" className="relative pt-32 pb-12 bg-[#F4F4F4] flex flex-col items-center justify-center px-6">
        <RevealText>
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="w-3 h-3 bg-[#30906B] rounded-full animate-ping opacity-75" />
            </div>
            <h2 className="mono text-[#7C7C7C] text-[10px] uppercase tracking-[0.2em] mb-6">Rejoignez le mouvement</h2>
            <p className="serif text-5xl md:text-7xl text-[#30906B] mb-8">Construisons ensemble.</p>
            <p className="text-[#7C7C7C] font-light text-lg">Vous êtes une institution, un artiste ou un citoyen engagé ?</p>
          </div>
        </RevealText>

        <RevealText delay={200} className="w-full max-w-5xl mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="group hover-trigger cursor-pointer relative block p-10 border border-[#B0B0B0]/40 bg-white hover:border-[#30906B] transition-all duration-500 rounded-sm shadow-sm text-center hover:-translate-y-2">
              <h3 className="serif text-3xl text-[#30906B] mb-6">Collaborer</h3>
              <div className="inline-flex items-center text-[#7C7C7C] mono text-[10px] uppercase tracking-widest group-hover:text-[#30906B] transition-colors">
                Proposer un projet <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </a>

            <a href="#" className="group hover-trigger cursor-pointer relative block p-10 border border-transparent bg-[#30906B] hover:bg-[#7C7C7C] transition-all duration-500 rounded-sm shadow-xl text-center hover:-translate-y-2">
              <h3 className="serif text-3xl text-[#F4F4F4] mb-6">Participer</h3>
              <div className="inline-flex items-center text-[#F4F4F4]/80 mono text-[10px] uppercase tracking-widest group-hover:text-[#F4F4F4] transition-colors">
                Rejoindre l'action <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </a>

            <a href="#" className="group hover-trigger cursor-pointer relative block p-10 border border-[#B0B0B0]/40 bg-white hover:border-[#30906B] transition-all duration-500 rounded-sm shadow-sm text-center hover:-translate-y-2">
              <h3 className="serif text-3xl text-[#30906B] mb-6">Soutenir</h3>
              <div className="inline-flex items-center text-[#7C7C7C] mono text-[10px] uppercase tracking-widest group-hover:text-[#30906B] transition-colors">
                Nous contacter <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </a>
          </div>
        </RevealText>

        <div className="w-full max-w-7xl border-t border-[#B0B0B0]/30 pt-12 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center lg:items-start gap-6">
            <img src={logoImage.src} alt="Logo" className="h-12 mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity" />
            <p className="text-[#7C7C7C] text-sm font-light max-w-xs text-center lg:text-left">Faire de chaque quartier un espace vivant de création, de dialogue et de mémoire.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 mono text-[10px] uppercase tracking-widest text-[#7C7C7C]">
            <a href="#" className="hover-trigger cursor-pointer hover:text-[#30906B] transition-colors">Mission</a>
            <a href="#" className="hover-trigger cursor-pointer hover:text-[#30906B] transition-colors">Contact</a>
            <a href="#" className="hover-trigger cursor-pointer hover:text-[#30906B] transition-colors">Instagram</a>
            <a href="#" className="hover-trigger cursor-pointer hover:text-[#30906B] transition-colors">Mentions légales</a>
          </div>

          <div className="mono text-[10px] uppercase tracking-widest text-[#B0B0B0] flex flex-col items-end gap-2">
            <span>© 2026 Art Sous le Manguier</span>
            <span>Douala, Cameroun</span>
          </div>
        </div>
      </section>
    </div>
  );
}
