'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const LOCATIONS = [
  'AUSTIN', 'ATLANTA (AIRPORT)', 'ATLANTA (WESTSIDE)', 'CHARLOTTE',
  'CHICAGO', 'COLUMBUS, OH', 'DALLAS', 'DENVER',
  'LOS ANGELES (HOLLYWOOD)', 'MIAMI', 'NASHVILLE',
  'NYC (LYNDHURST, NJ)', 'ORLANDO', 'PORTLAND, OR', 'SAN FRANCISCO',
];

const TIME_OPTIONS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 Noon', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

export default function BookingPage() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [returnDifferent, setReturnDifferent] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const validationErrors: string[] = [];

    if (!pickup) validationErrors.push('Pickup Location is required.');
    if (returnDifferent && !dropoff) validationErrors.push('Dropoff Location is required.');
    if (!startDate) validationErrors.push('Start Date is required.');
    if (!startTime) validationErrors.push('Start Time is required.');
    if (!endDate) validationErrors.push('End Date is required.');
    if (!endTime) validationErrors.push('End Time is required.');

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      const query = new URLSearchParams({
        pickup,
        dropoff: returnDifferent ? dropoff : pickup,
        startDate,
        endDate,
        startTime,
        endTime,
      }).toString();

      router.push(`/check?${query}`);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg" // Make sure to place your image here in /public folder
        alt="Van Background"
        fill
        className="object-cover"
        priority
      />

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col lg:flex-row justify-between items-center px-6 lg:px-20">
      {/* Left: Text (hidden on small screens) */}
      <div className="hidden lg:block text-white max-w-xl mt-24 lg:mt-0">
        <h1 className="text-5xl font-bold mb-4">TOUR IN STYLE</h1>
        <p className="text-xl font-semibold">
          Luxury And Economy Passenger <br /> Vans For Rent
        </p>
      </div>



        {/* Right: Booking Form */}
        <div className="w-full max-w-md mt-10 lg:mt-0 bg-white rounded-lg shadow-xl p-6 space-y-4 text-left">
          <h2 className="text-2xl font-bold mb-2">BOOK ONLINE</h2>

          {/* Pickup */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Pickup Location</label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-sm"
            >
              <option value="">SELECT LOCATION</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Return Different */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={returnDifferent}
              onChange={() => setReturnDifferent(!returnDifferent)}
              className="mr-2"
            />
            <label className="text-sm">Returning To Different Location</label>
          </div>

          {/* Dropoff */}
          {returnDifferent && (
            <div>
              <label className="block font-semibold mb-1 text-sm">Dropoff Location</label>
              <select
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-sm"
              >
                <option value="">SELECT LOCATION</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          )}

          {/* Dates & Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-sm">Start Date</label>
              <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-sm cursor-pointer"
              onKeyDown={(e) => e.preventDefault()} // disable typing
              style={{ colorScheme: 'light' }}
            />


            </div>
            <div>
              <label className="block font-semibold mb-1 text-sm">Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-sm"
              >
                <option value="">Select Time</option>
                {TIME_OPTIONS.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-sm">End Date</label>
              <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || new Date().toISOString().split('T')[0]}
            className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-sm cursor-pointer"
            onKeyDown={(e) => e.preventDefault()}
            style={{ colorScheme: 'light' }}
          />


            </div>
            <div>
              <label className="block font-semibold mb-1 text-sm">End Time</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-sm"
              >
                <option value="">Select Time</option>
                {TIME_OPTIONS.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="text-red-600 text-sm space-y-1">
              {errors.map((err, idx) => (
                <div key={idx}>• {err}</div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded text-sm tracking-wide transition uppercase"
          >
            BROWSE VEHICLES
          </button>
        </div>
      </div>
    </div>
  );
}
