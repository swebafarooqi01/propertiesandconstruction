import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { useData } from '../../context/DataContext';

const DeleteConstruction = () => {
  const navigate = useNavigate();
  const { constructions, deleteConstruction } = useData();
  const [selectedConstruction, setSelectedConstruction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    if (selectedConstruction) {
      deleteConstruction(selectedConstruction.id);
      setShowModal(false);
      setSelectedConstruction(null);
    }
  };

  const openDeleteModal = (construction) => {
    setSelectedConstruction(construction);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
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
            Back to Dashboard
          </button>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delete Construction Project</h1>
              <p className="text-gray-500 mt-1">Select a project to delete</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {constructions.length === 0 ? (
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500">There are no construction projects to delete.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {constructions.map((construction) => (
                <div
                  key={construction.id}
                  className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl hover:border-red-200 hover:bg-red-50/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    {construction.photos && construction.photos[0] ? (
                      <img
                        src={construction.photos[0]}
                        alt={construction.name}
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
                      <h3 className="font-semibold text-gray-900 text-lg">{construction.name}</h3>
                      <p className="text-gray-500">{construction.price}</p>
                      <div className="flex space-x-2 mt-2">
                        {construction.sold && (
                          <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            Sold
                          </span>
                        )}
                        {construction.hot && (
                          <span className="px-2.5 py-1 bg-accent/20 text-accent-dark text-xs font-medium rounded-full">
                            Hot
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => openDeleteModal(construction)}
                    className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <DeleteConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        itemName={selectedConstruction?.name}
      />
    </div>
  );
};

export default DeleteConstruction;
