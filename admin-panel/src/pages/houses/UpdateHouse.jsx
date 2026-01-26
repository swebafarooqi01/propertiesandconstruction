import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ItemForm from '../../components/ItemForm';
import { useData } from '../../context/DataContext';

const UpdateHouse = () => {
  const navigate = useNavigate();
  const { houses, updateHouse } = useData();
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleSubmit = (formData) => {
    updateHouse(selectedHouse.id, formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <button
            onClick={() => (selectedHouse ? setSelectedHouse(null) : navigate('/dashboard'))}
            className="flex items-center text-gray-500 hover:text-primary transition-colors mb-6 group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {selectedHouse ? 'Back to List' : 'Back to Dashboard'}
          </button>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Update House Listing</h1>
              <p className="text-gray-500 mt-1">
                {selectedHouse ? `Editing: ${selectedHouse.name}` : 'Select a house to update'}
              </p>
            </div>
          </div>
        </div>

        {!selectedHouse ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {houses.length === 0 ? (
              <div className="text-center py-16">
                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No houses found</h3>
                <p className="text-gray-500">Create a house listing first to update it.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {houses.map((house) => (
                  <div
                    key={house.id}
                    onClick={() => setSelectedHouse(house)}
                    className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl hover:border-accent hover:bg-accent/5 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      {house.photos && house.photos[0] ? (
                        <img
                          src={house.photos[0]}
                          alt={house.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{house.name}</h3>
                        <p className="text-gray-500">{house.price}</p>
                        <div className="flex space-x-2 mt-2">
                          {house.sold && (
                            <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              Sold
                            </span>
                          )}
                          {house.hot && (
                            <span className="px-2.5 py-1 bg-accent/20 text-accent-dark text-xs font-medium rounded-full">
                              Hot
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <ItemForm
              initialData={selectedHouse}
              onSubmit={handleSubmit}
              submitLabel="Update Listing"
              itemType="House"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default UpdateHouse;
