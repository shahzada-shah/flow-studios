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
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 tracking-wide">
                FLOW WITH INTENTION
              </h2>
              <p className="text-lg sm:text-xl text-white mb-8 font-light tracking-wide">
                Mindful movement, beautiful design
              </p>
              <button className="bg-white text-gray-900 px-8 sm:px-12 py-3 sm:py-4 text-sm font-semibold tracking-widest hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all active:scale-95">
                DISCOVER THE COLLECTION
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
