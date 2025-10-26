/**
 * AddressesTab Component
 *
 * Displays saved addresses with edit functionality and option to add new addresses.
 * Shows the default address prominently with edit controls.
 *
 * @component
 * @example
 * ```tsx
 * <AddressesTab
 *   addresses={userAddresses}
 *   onEdit={(addressId) => handleEdit(addressId)}
 *   onAdd={() => handleAddNew()}
 * />
 * ```
 */

interface Address {
  id: string
  name: string
  street: string
  apartment?: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  isDefault?: boolean
}

interface AddressesTabProps {
  addresses?: Address[]
  onEdit?: (addressId: string) => void
  onAdd?: () => void
}

const defaultAddress: Address = {
  id: '1',
  name: 'John Doe',
  street: '123 Main Street',
  apartment: 'Apartment 4B',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  country: 'United States',
  phone: '+1 (555) 000-0000',
  isDefault: true,
}

export const AddressesTab = ({
  addresses = [defaultAddress],
  onEdit,
  onAdd,
}: AddressesTabProps) => {
  return (
    <div>
      <h1 className="text-3xl tracking-wide mb-8">ADDRESSES</h1>
      <div className="max-w-2xl space-y-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="
              border border-gray-200 p-6
              hover:border-gray-400 transition-all duration-200
              group
            "
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium tracking-wide">
                {address.isDefault ? 'DEFAULT ADDRESS' : 'ADDRESS'}
              </h3>
              <button
                onClick={() => onEdit?.(address.id)}
                className="
                  text-sm underline
                  hover:text-gray-600
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                "
              >
                Edit
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>{address.name}</p>
              <p>{address.street}</p>
              {address.apartment && <p>{address.apartment}</p>}
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
              <p>{address.phone}</p>
            </div>
          </div>
        ))}

        <button
          onClick={onAdd}
          className="
            bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-wider
            hover:bg-gray-800 hover:shadow-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
            transform hover:scale-[1.02]
          "
        >
          ADD NEW ADDRESS
        </button>
      </div>
    </div>
  )
}
