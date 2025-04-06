export default function SuccessPage() {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 bg-white text-center shadow-lg rounded">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Reservation Confirmed! ✅</h1>
        <p className="text-gray-700 mb-4">
          Thank you for booking with us! A confirmation email has been sent.
        </p>
        <a href="/" className="text-blue-500 underline">Back to Home</a>
      </div>
    );
  }
  