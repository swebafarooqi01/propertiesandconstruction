import { Link } from 'react-router-dom';

const ListingCard = ({
  item,
  linkPrefix,
  priceField = 'rate',
  fallbackImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
}) => {
  const price = item[priceField] || item.rate || item.price;

  return (
    <Link
      to={`/${linkPrefix}/${item.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.photos?.[0] || fallbackImage}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.hot && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
            Hot
          </span>
        )}
        {item.sold && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full">
            Sold
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary font-bold text-lg">${price}</span>
          <span className="text-sm text-gray-400 group-hover:text-accent transition-colors flex items-center gap-1">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
