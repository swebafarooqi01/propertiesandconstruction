import { Link } from 'react-router-dom';

const ActionCard = ({ title, description, icon, to, variant = 'default' }) => {
  const variants = {
    create: 'bg-primary hover:bg-primary-light border-primary',
    update: 'bg-accent hover:bg-accent-dark border-accent',
    delete: 'bg-red-600 hover:bg-red-700 border-red-600',
    default: 'bg-primary hover:bg-primary-light border-primary',
  };

  return (
    <Link
      to={to}
      className={`${variants[variant]} text-white p-5 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg block border-l-4`}
    >
      <div className="flex items-center space-x-4">
        <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <svg
          className="w-5 h-5 ml-auto text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default ActionCard;
