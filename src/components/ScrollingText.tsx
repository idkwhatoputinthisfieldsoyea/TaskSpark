"use client";

interface ScrollingTextProps {
  text: string;
  speed?: number;
}

export default function ScrollingText({ text, speed = 50 }: ScrollingTextProps) {
  // Use 20 copies for smoother animation - animation moves 50% (10 out of 20 items)
  // This ensures when it loops back, there's always content visible
  const copies = 20;
  
  return (
    <div className="relative">
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>
      
      <div 
        className="overflow-hidden whitespace-nowrap py-4 relative"
        style={{ 
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          maxWidth: '100vw',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <div 
          className="inline-flex items-center"
          style={{
            animation: `scroll ${speed}s linear infinite`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Duplicate the text multiple times for seamless continuous loop */}
          {Array(copies).fill(null).map((_, i) => (
            <span key={i} className="mx-8 text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent whitespace-nowrap flex-shrink-0" style={{ textRendering: 'optimizeLegibility' }}>
              {text}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>
    </div>
  );
}

