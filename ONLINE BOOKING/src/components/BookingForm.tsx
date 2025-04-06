'use client';

import { useState } from 'react';

const LOCATIONS = [
  'AUSTIN',
  'ATLANTA (AIRPORT)',
  'ATLANTA (WESTSIDE)',
  'CHARLOTTE',
  'CHICAGO',
  'COLUMBUS, OH',
  'DALLAS',
  'DENVER',
  'LOS ANGELES (HOLLYWOOD)',
  'MIAMI',
  'NASHVILLE',
  'NYC (LYNDHURST, NJ)',
  'ORLANDO',
  'PORTLAND, OR',
  'SAN FRANCISCO',
];

const BookingForm: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [returnDifferent, setReturnDifferent] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);

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
      setChecking(true);
      // Simulate availability check
      setTimeout(() => {
        alert('Availability checked successfully!');
        setChecking(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">BOOK ONLINE</h2>

      {/* Pickup Location */}
      <label className="block font-semibold mb-1">Pickup Location</label>
      <select
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="w-full bg-gray-100 border rounded p-2 mb-4"
      >
        <option value="">SELECT LOCATION</option>
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {/* Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={returnDifferent}
          onChange={() => setReturnDifferent(!returnDifferent)}
          className="mr-2"
          id="returnDifferent"
        />
        <label htmlFor="returnDifferent">Returning To Different Location</label>
      </div>

      {/* Dropoff Location */}
      {returnDifferent && (
        <>
          <label className="block font-semibold mb-1">Dropoff Location</label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full bg-gray-100 border rounded p-2 mb-4"
          >
            <option value="">SELECT LOCATION</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Date & Time Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-100 border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-gray-100 border rounded p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-gray-100 border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full bg-gray-100 border rounded p-2"
          />
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="mb-4 text-red-600 text-sm space-y-1">
          {errors.map((err, idx) => (
            <div key={idx}>• {err}</div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={checking}
        className={`${
          checking ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'
        } w-full text-black font-bold py-2 px-4 rounded transition`}
      >
        {checking ? 'Checking...' : 'BROWSE VEHICLES'}
      </button>
    </div>
  );
};

export default BookingForm;
