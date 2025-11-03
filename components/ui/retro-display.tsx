export function RetroDisplay() {
  return (

    <div className="relative w-full max-w-7xl  mx-auto  aspect-1/1 lg:aspect-6/1">
      {/* Outer casing */}
      <div className="absolute inset-0 bg-linear-to-b from-muted to-background rounded-lg shadow-2xl ">
        {/* Inner bezel */}
        <div className="absolute inset-0 bg-linear-to-b from-black to-background rounded ">
          {/* Screen area */}
          <div className="absolute inset-2 bg-background rounded overflow-hidden">
            {/* Scan lines overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)",
              }}
            />

            {/* Vignette effect */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)",
              }}
            />

            {/* Display content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative">
                {/* Glow effect behind text */}
                <div
                  className="absolute inset-0 blur-xl opacity-60"
                  style={{
                    color: "#ff3333",
                    textShadow: "0 0 40px #ff3333",
                  }}
                >
                  <span className="text-sm font-mono tracking-[0.3em]">&quot;The most creative among us are outcasts who&apos;s genius we call madness&quot;<br />
                    &quot;but alas these mad men see our absurdity that later we call genius&quot;</span>
                </div>

                {/* Main text */}
                <span
                  className="relative text-xl font-lcd uppercase tracking-[0.05em] leading-loose select-none"
                  style={{
                    color: "#ff3333",
                    textShadow: "0 0 10px #ff3333, 0 0 20px #ff3333, 0 0 30px #ff3333",
                  }}
                >
                  To see art in absurdity is creativity.
                  To defend it when its called madness is vision.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
