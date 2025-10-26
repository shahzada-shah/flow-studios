import { ImageIcon } from 'lucide-react'

/**
 * Hero section with three-panel layout and centered call-to-action
 * Features smooth animations and hover effects on wireframe placeholders
 */
const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="relative overflow-hidden bg-gray-200 flex items-center justify-center group hover:bg-gray-250 transition-colors">
          <div className="flex flex-col items-center gap-4 text-gray-400 group-hover:text-gray-500 transition-colors">
            <div className="border-4 border-dashed border-gray-400 rounded-lg p-8 group-hover:border-gray-500 group-hover:scale-105 transition-all">
              <ImageIcon className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium tracking-wider">WIREFRAME IMAGE</p>
              <p className="text-sm tracking-wide mt-1">720 × 980</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gray-200 flex items-center justify-center group hover:bg-gray-250 transition-colors">
          <div className="flex flex-col items-center gap-4 text-gray-400 group-hover:text-gray-500 transition-colors">
            <div className="border-4 border-dashed border-gray-400 rounded-lg p-8 group-hover:border-gray-500 group-hover:scale-105 transition-all">
              <ImageIcon className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium tracking-wider">WIREFRAME IMAGE</p>
              <p className="text-sm tracking-wide mt-1">720 × 980</p>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 animate-fadeIn">
            <div className="bg-black/40 w-full h-full absolute inset-0"></div>

            <div className="relative z-10 animate-slideUp">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 tracking-wide">
                MOVE YOUR BODY
              </h2>
              <p className="text-lg sm:text-xl text-white mb-8 font-light tracking-wide">
                Sustainable activewear for every body
              </p>
              <button className="bg-white text-gray-900 px-8 sm:px-12 py-3 sm:py-4 text-sm font-semibold tracking-widest hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all active:scale-95">
                FIND YOUR PERFECT FIT
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gray-200 flex items-center justify-center group hover:bg-gray-250 transition-colors">
          <div className="flex flex-col items-center gap-4 text-gray-400 group-hover:text-gray-500 transition-colors">
            <div className="border-4 border-dashed border-gray-400 rounded-lg p-8 group-hover:border-gray-500 group-hover:scale-105 transition-all">
              <ImageIcon className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium tracking-wider">WIREFRAME IMAGE</p>
              <p className="text-sm tracking-wide mt-1">720 × 980</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
