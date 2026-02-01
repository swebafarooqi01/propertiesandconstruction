import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/AdminNavbar';
import ItemForm from '../../../components/ItemForm';
import { useData } from '../../../context/DataContext';

const UpdateConstruction = () => {
  const navigate = useNavigate();
  const { constructions, updateConstruction } = useData();
  const [selectedConstruction, setSelectedConstruction] = useState(null);

  const handleSubmit = (formData) => {
    updateConstruction(selectedConstruction.id, { ...formData, rate: formData.price });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <button onClick={() => (selectedConstruction ? setSelectedConstruction(null) : navigate('/admin/dashboard'))} className="flex items-center text-gray-500 hover:text-primary transition-colors mb-6 group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {selectedConstruction ? 'Back to List' : 'Back to Dashboard'}
          </button>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Update Construction</h1>
              <p className="text-gray-500 mt-1">{selectedConstruction ? `Editing: ${selectedConstruction.name}` : 'Select a project to update'}</p>
            </div>
          </div>
        </div>

        {!selectedConstruction ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {constructions.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No construction projects found</h3>
                <p className="text-gray-500">Create a project first to update it.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {constructions.map((construction) => (
                  <div key={construction.id} onClick={() => setSelectedConstruction(construction)} className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl hover:border-accent hover:bg-accent/5 cursor-pointer transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      {construction.photos && construction.photos[0] ? (
                        <img src={construction.photos[0]} alt={construction.name} className="w-16 h-16 object-cover rounded-xl" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{construction.name}</h3>
                        <p className="text-gray-500">${construction.rate}</p>
                        <div className="flex space-x-2 mt-2">
                          {construction.sold && <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Sold</span>}
                          {construction.hot && <span className="px-2.5 py-1 bg-accent/20 text-accent-dark text-xs font-medium rounded-full">Hot</span>}
                        </div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <ItemForm initialData={{ ...selectedConstruction, price: selectedConstruction.rate }} onSubmit={handleSubmit} submitLabel="Update Construction" itemType="Construction" />
          </div>
        )}
      </main>
    </div>
  );
};

export default UpdateConstruction;
