# POSA Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Netlify account (for deployment)

### Installation
```bash
git clone https://github.com/hakimages-cloud/pedu-old-student-association.git
cd pedu-old-student-association
npm install
```

### Environment Setup
Create `.env` file in root directory:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_PAYSTACK_PUBLIC_KEY=your_paystack_key
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Main navigation
│   └── WidgetCard.js   # Dashboard widgets
├── contexts/           # React Context providers
│   └── AuthContext.js  # Authentication state
├── pages/             # Application pages
│   ├── Dashboard.js     # Main dashboard
│   ├── Login.js        # User authentication
│   ├── Register.js      # User registration
│   ├── Profile.js      # Profile management
│   ├── Dues.js        # Dues tracking
│   ├── Events.js       # Events management
│   ├── Gallery.js      # Media gallery
│   ├── Welfare.js      # Welfare applications
│   ├── MemberManagement.js # Admin panel
│   └── MembershipId.js  # Digital ID
├── services/           # External services
│   └── firebase.js     # Supabase client
└── styles/            # Global styles
```

## 🔐 Authentication System

### User Roles
- **member**: Default role, basic access
- **admin**: Can manage members
- **superadmin**: Full system access

### Auth Flow
1. User logs in via Supabase Auth
2. Session stored in localStorage
3. User data fetched from users table
4. Authentication state managed by AuthContext

### Protected Routes
```javascript
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">
  <AdminComponent />
</ProtectedRoute>
```

## 🗄️ Database Schema

### Tables
- **users**: User profiles and authentication
- **events**: Association events
- **announcements**: Official announcements
- **dues**: Monthly dues tracking
- **welfare**: Welfare applications

### Field Naming Convention
- **Frontend**: camelCase (userName, memberId)
- **Database**: snake_case (user_name, member_id)

### RLS Policies
Row Level Security ensures users can only access their own data unless they're admins.

## 💰 Payment Integration

### Paystack Setup
```javascript
const handler = PaystackPop.setup({
  key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  email: user.email,
  amount: amount * 100, // Convert to kobo
  callback: `${window.location.origin}/payment-success`,
  onClose: function() {
    console.log('Payment window closed');
  }
});
```

### Payment Methods
- **Paystack**: Card/Bank payments
- **Mobile Money**: MTN MoMo, Telecel Cash
- **Manual**: Admin recording

## 🎨 Styling Guide

### TailwindCSS Configuration
Custom colors defined in `tailwind.config.js`:
- **primary**: Red theme (#ef4444)
- **secondary**: Blue theme (#3b82f6)

### Component Classes
```css
.btn-primary    /* Primary button style */
.card          /* Card container style */
.input-field    /* Form input style */
.nav-link       /* Navigation link style */
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
src/
└── components/
    └── __tests__/
        ├── AuthContext.test.js
        ├── WidgetCard.test.js
        └── Navbar.test.js
```

### Writing Tests
```javascript
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../../contexts/AuthContext';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(
      <AuthProvider>
        <ComponentName />
      </AuthProvider>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment

### Netlify Deployment
```bash
# Build for production
npm run build

# Deploy to Netlify (CLI)
netlify deploy --prod --dir=build
```

### Environment Variables on Netlify
1. Go to Netlify dashboard
2. Site settings → Build & deploy → Environment
3. Add variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_PAYSTACK_PUBLIC_KEY`

## 🔧 Development Workflow

### 1. Feature Development
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### 2. Code Quality
- Use ESLint for code quality
- Follow React best practices
- Write tests for new features
- Update documentation

### 3. Database Changes
- Create SQL migration scripts
- Test on development environment
- Run on production after review

## 🐛 Debugging

### Common Issues
1. **Authentication errors**: Check environment variables
2. **Database connection**: Verify Supabase URL/key
3. **Build failures**: Check for syntax errors
4. **Payment issues**: Verify Paystack configuration

### Debug Tools
- **Browser DevTools**: React DevTools extension
- **Network tab**: Check API calls
- **Console**: Look for JavaScript errors
- **Supabase Logs**: Database query logs

## 📝 Contributing Guidelines

### Code Style
- Use camelCase for variables
- Use PascalCase for components
- Follow React hooks patterns
- Add error boundaries

### Git Commit Messages
```
type(scope): description

feat(auth): add password reset
fix(dues): resolve payment issue
docs(readme): update installation guide
```

### Pull Request Process
1. Fork repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review and merge
