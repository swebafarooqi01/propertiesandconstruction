import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/AdminNavbar';
import ItemForm from '../../../components/ItemForm';
import { useData } from '../../../context/DataContext';

const CreateConstruction = () => {
  const navigate = useNavigate();
  const { addConstruction } = useData();

  const handleSubmit = (formData) => {
    addConstruction({ ...formData, rate: formData.price });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center text-gray-500 hover:text-primary transition-colors mb-6 group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Construction</h1>
              <p className="text-gray-500 mt-1">Add a new construction project</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <ItemForm onSubmit={handleSubmit} submitLabel="Create Construction" itemType="Construction" />
        </div>
      </main>
    </div>
  );
};

export default CreateConstruction;
