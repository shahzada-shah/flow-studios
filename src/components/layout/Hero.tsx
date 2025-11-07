/**
 * Hero section with three-panel layout and centered call-to-action
 * Features three hero images with text overlay on center panel
 */
const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left Panel Image */}
        <div className="relative overflow-hidden h-full bg-gray-200">
          <img
            src="/images/hero/hero-left.png"
            alt="Flow Studios - Mindful Movement"
            className="w-full h-full object-cover blur-[0.5px]"
            onError={(e) => {
              console.error('Failed to load hero-left image:', e);
            }}
          />
        </div>

        {/* Center Panel - Hero Main Image */}
        <div className="relative overflow-hidden h-full bg-gray-200">
          {/* Hero Main Image */}
          <img
            src="/images/hero/hero-main.png"
            alt="Flow with Intention - Mindful Movement"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Failed to load hero image:', e);
            }}
            onLoad={() => {
              console.log('Hero image loaded successfully');
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10">
            <div className="animate-slideUp">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-6 tracking-[0.15em]">
                ELEVATE YOUR PRACTICE
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-10 font-light tracking-[0.2em] uppercase">
                Premium Pilates & Studio Wear
              </p>
              <button className="bg-white text-gray-900 px-10 sm:px-14 py-3.5 sm:py-4 text-xs font-medium tracking-[0.3em] uppercase hover:bg-gray-100 transition-all duration-300">
                Shop Collection
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel Image */}
        <div className="relative overflow-hidden h-full bg-gray-200">
          <img
            src="/images/hero/hero-right.png"
            alt="Flow Studios - Mindful Movement"
            className="w-full h-full object-cover blur-[0.5px]"
            onError={(e) => {
              console.error('Failed to load hero-right image:', e);
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
