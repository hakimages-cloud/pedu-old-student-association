# Pedu Old Student Association (POSA) Web Application

A comprehensive web application for the Pedu Old Student Association that enables members to connect, manage their membership, pay dues, apply for welfare support, and stay updated with association activities.

## Features

### 🔐 Authentication & User Management
- **Multi-role system**: Member, Admin, Super Admin
- **Secure login/registration**
- **Profile management with dependants**
- **Digital membership ID generation**

### 💰 Dues Management
- **Monthly dues tracking** (GHC 50/month)
- **Payment history**
- **Multiple payment methods**:
  - MTN Mobile Money (MoMo)
  - Telecel Cash
  - AT Payment
  - Card/Bank Transfer (via Paystack)
- **Outstanding balance tracking**

### 🤝 Welfare Support
- **Apply for welfare funds**:
  - Funeral support (up to GHC 1000)
  - Wedding support (up to GHC 500)
  - Medical emergency (up to GHC 800)
  - Education support (up to GHC 600)
- **Application status tracking**
- **Document upload support**
- **Priority processing for emergencies**

### 📸 Gallery
- **Photo and video gallery**
- **Event documentation**
- **Category-based organization**
- **Search and filter functionality**

### 📅 Events & Announcements
- **Upcoming events calendar**
- **Event RSVP system**
- **Past events archive**
- **Announcement system** with priority levels
- **Admin event creation tools**

### 👥 Member Management (Admin/Super Admin)
- **Create new members**
- **Automatic membership number generation**
- **Member status management**
- **Dues payment tracking**
- **Member statistics dashboard**

### 🆔 Digital Membership ID
- **Printable ID cards**
- **QR code integration**
- **Member benefits display**
- **Annual renewal system**

## Technology Stack

- **Frontend**: React 18, React Router, Tailwind CSS
- **UI Components**: Heroicons, Lucide React
- **Payments**: Paystack Integration
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Printing**: React-to-Print
- **Date Handling**: date-fns
- **Deployment**: Netlify

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pedu-old-student-association
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
REACT_APP_API_URL=http://localhost:8000/api
```

## Demo Accounts

For testing purposes, the following demo accounts are available:

### Super Admin
- **Email**: admin@posa.com
- **Password**: admin123
- **Access**: All features including member management

### Admin
- **Email**: admin2@posa.com
- **Password**: admin123
- **Access**: Events, announcements, and content management

### Member
- **Email**: member@posa.com
- **Password**: member123
- **Access**: Personal profile, dues, welfare, and member features

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation component
│   └── WidgetCard.js   # Dashboard widget cards
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   ├── Dashboard.js    # Main dashboard
│   ├── Profile.js      # Profile management
│   ├── Dues.js         # Dues and payments
│   ├── Welfare.js      # Welfare applications
│   ├── Gallery.js      # Photo/video gallery
│   ├── Events.js       # Events and announcements
│   ├── MemberManagement.js # Admin member management
│   └── MembershipId.js # Digital ID card
├── services/           # API services
└── App.js             # Main app component
```

## Key Features Explained

### Authentication System
- Mock authentication system (easily replaceable with Firebase/Backend API)
- Role-based access control
- Persistent login using localStorage
- Protected routes with role verification

### Payment Integration
- Paystack integration for card payments
- Mobile money payment options
- Payment status tracking
- Automatic receipt generation

### Welfare System
- Categorized welfare support
- Document upload for verification
- Multi-level approval process
- Emergency processing priority

### Member Management
- Automatic membership number assignment (POS0001, POS0002, etc.)
- Bulk member creation
- Status management (active/inactive/pending)
- Comprehensive member statistics

## Deployment

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Configure environment variables in Netlify dashboard
4. Deploy automatically on push to main branch

### Environment Variables for Production

Set these in your Netlify dashboard:

```
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_live_your_production_paystack_key
REACT_APP_API_URL=https://your-production-api.com
```

## Customization

### Branding
- Update logo in `public/CREST.jpeg`
- Modify colors in `tailwind.config.js`
- Update association name throughout the application

### Payment Integration
- Replace Paystack public key in environment variables
- Add additional payment methods in `src/pages/Dues.js`
- Configure webhook endpoints for payment verification

### Backend Integration
- Replace mock data with API calls
- Implement proper authentication (Firebase, Auth0, etc.)
- Add database integration (MongoDB, PostgreSQL, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@posa-ghana.com
- Phone: +233 XXX XXXXXX

## Future Enhancements

- Mobile app development
- Real-time notifications
- Advanced reporting system
- Integration with school systems
- Alumni directory
- Job board for members
- Mentorship program matching
- Donation system for non-members
