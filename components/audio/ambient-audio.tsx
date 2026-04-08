"use client";

import { useEffect, useRef, useState } from "react";

export function AmbientAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => () => ctxRef.current?.close(), []);

  const toggle = async () => {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 174;
      gain.gain.value = 0.0001;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      ctxRef.current = ctx;
      oscRef.current = osc;
      gainRef.current = gain;
    }

    const gain = gainRef.current;
    if (!gain || !ctxRef.current) return;
    await ctxRef.current.resume();

    if (active) {
      gain.gain.setTargetAtTime(0.0001, ctxRef.current.currentTime, 1.1);
      setActive(false);
    } else {
      gain.gain.setTargetAtTime(0.03, ctxRef.current.currentTime, 1.2);
      setActive(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed right-4 top-4 z-50 rounded-full border border-cream/30 bg-black/20 px-3 py-2 text-xs backdrop-blur"
      aria-label="Contrôle audio"
    >
      {active ? "Ambiance on" : "Ambiance off"}
    </button>
  );
}
