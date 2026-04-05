import React from 'react';
import { Link } from 'react-router-dom';

const WidgetCard = ({ title, description, href, icon: Icon, color }) => {
  return (
    <Link
      to={href}
      className="block transition-transform duration-200 hover:scale-105"
    >
      <div className="card hover:shadow-lg cursor-pointer">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WidgetCard;
