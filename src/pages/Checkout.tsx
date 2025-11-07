import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ImageIcon } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const Checkout = () => {
  const { cartItems, cartTotal } = useCart()
  const [step, setStep] = useState<'email' | 'shipping' | 'payment'>('email')
  const [email, setEmail] = useState('')
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    country: '',
    city: '',
    zipCode: '',
    streetAddress: '',
    apartment: '',
    phone: '',
  })
  const [selectedShipping, setSelectedShipping] = useState<string>('')
  const [selectedPayment, setSelectedPayment] = useState<string>('')

  const shippingCost = 0
  const total = cartTotal + shippingCost

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStep('shipping')
    }
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (shippingInfo.fullName && shippingInfo.country && shippingInfo.city &&
        shippingInfo.zipCode && shippingInfo.streetAddress && selectedShipping) {
      setStep('payment')
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-8 py-8 pb-16">
        <div className="mb-8">
          <div className="text-sm tracking-wide text-gray-600">
            <Link to="/" className="hover:text-gray-900 transition-colors">BAG</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">CHECKOUT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                {step !== 'email' ? (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                )}
                <h2 className="text-xl font-normal tracking-wide">YOUR EMAIL</h2>
              </div>

              {step === 'email' ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address*"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                    autoComplete="off"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-200"
                  >
                    CONTINUE TO SHIPPING
                  </button>
                </form>
              ) : (
                <div className="text-sm text-gray-600">{email}</div>
              )}
            </div>

            <div className="bg-white p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                {step === 'payment' ? (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                ) : step === 'shipping' ? (
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                )}
                <h2 className="text-xl font-normal tracking-wide">SHIPPING</h2>
              </div>

              {step === 'shipping' ? (
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    placeholder="Full name*"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                    autoComplete="off"
                    required
                  />
                  <input
                    type="text"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    placeholder="Country*"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                    autoComplete="off"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      placeholder="City*"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                      autoComplete="off"
                      required
                    />
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      placeholder="ZIP code*"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    value={shippingInfo.streetAddress}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, streetAddress: e.target.value })}
                    placeholder="Street Address*"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                    autoComplete="off"
                    required
                  />
                  <input
                    type="text"
                    value={shippingInfo.apartment}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                    placeholder="Apartment, suite, etc (optional)"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                    autoComplete="off"
                  />
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    placeholder="Phone number (in case of delivery questions)"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-200"
                  >
                    SEE SHIPPING OPTIONS
                  </button>
                </form>
              ) : step === 'payment' ? (
                <div className="space-y-2 text-sm text-gray-700">
                  <div>{shippingInfo.fullName}</div>
                  <div>{shippingInfo.country}</div>
                  <div>{shippingInfo.city}</div>
                  <div>{shippingInfo.zipCode}</div>
                  <div>{shippingInfo.streetAddress}</div>
                  {shippingInfo.phone && <div>{shippingInfo.phone}</div>}

                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">SHIPPING OPTIONS</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-gray-600">3-5 business days</div>
                      </div>
                      <div className="font-medium">Free</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {step === 'payment' && (
              <div className="bg-white p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <h2 className="text-xl font-normal tracking-wide">PAYMENT METHODS</h2>
                </div>

                <p className="text-sm text-gray-600 mb-6">All transactions are secure and encrypted</p>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:border-gray-900 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === 'card'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5"
                    />
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-[8px] font-bold flex items-center justify-center">
                          VISA
                        </div>
                        <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-500 rounded"></div>
                      </div>
                      <span className="text-sm">Card</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:border-gray-900 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="googlepay"
                      checked={selectedPayment === 'googlepay'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5"
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 bg-white border border-gray-300 rounded flex items-center justify-center text-[8px] font-bold">
                        G Pay
                      </div>
                      <span className="text-sm">GooglePay</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:border-gray-900 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="applepay"
                      checked={selectedPayment === 'applepay'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5"
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 bg-black rounded flex items-center justify-center text-white text-[10px] font-bold">

                      </div>
                      <span className="text-sm">ApplePay</span>
                    </div>
                  </label>
                </div>

                <button
                  disabled={!selectedPayment}
                  className="w-full mt-6 bg-gray-900 text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  COMPLETE PURCHASE
                </button>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white p-8 rounded-sm border border-gray-200">
              <h2 className="text-xl font-normal tracking-wide mb-6">
                Bag ( {cartItems.reduce((sum, item) => sum + item.quantity, 0)} )
              </h2>

              <div className="space-y-6 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                    <div className="w-24 h-32 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden">
                      {item.product.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="space-y-1">
                        <h3 className="font-normal">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Color: {item.product.color}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-normal">{item.product.price.toFixed(2)} USD</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Free shipping</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>30-day hassle-free returns</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-normal">Order Total</span>
                  <span className="font-normal">{total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
