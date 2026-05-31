# Signup System Documentation

## Overview

The signup system has been enhanced to support role-based user registration with role-specific fields and validation. Users can now sign up as **Customer**, **Restaurant Owner**, **Delivery Rider**, or **Admin** with appropriate data collection and validation for each role.

## Key Features

### 1. Role-Based Registration
Users select their role during signup. Each role collects different information:

#### **Customer**
- Name (required)
- Email (required, unique)
- Password (required, min 8 characters)
- Phone (optional)

#### **Restaurant Owner**
- Name (required)
- Email (required, unique)
- Password (required, min 8 characters)
- Phone (required)
- Restaurant Name (required)
- Address (required)
- City (required)
- Delivery Fee (required, in PKR)
- Opening Time (optional)
- Closing Time (optional)

#### **Delivery Rider**
- Name (required)
- Email (required, unique)
- Password (required, min 8 characters)
- Phone (required)
- Vehicle Type (required: motorcycle, bicycle, car, scooter)
- License Number (required)

### 2. Duplicate Account Prevention
**Critical Feature:** The same email address cannot be used for multiple roles. If a user attempts to register with an email that's already associated with any role, they will receive an error:

```
"This email is already registered as a [role]. You cannot create multiple accounts with the same email."
```

This is enforced at the database level through the unique constraint on the `email` column in the `users` table, and validated at the API level.

### 3. Role-Specific Data Storage

Each role creates a record in its corresponding table:
- **Customer** → `customers` table
- **Restaurant** → `restaurants` table
- **Rider** → `delivery_riders` table
- **Admin** → No specific table (user record only)

## API Endpoint

### `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+92 300 1234567",
  "role": "customer",
  // Role-specific fields (optional depending on role):
  "restaurant_name": "John's Biryani House",
  "address": "123 Main Street",
  "city": "Karachi",
  "delivery_fee": 150,
  "opening_time": "10:00",
  "closing_time": "22:00",
  "vehicle_type": "motorcycle",
  "license_number": "ABC123XYZ"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+92 300 1234567",
    "role": "customer",
    "is_active": true
  },
  "message": "Customer account created successfully"
}
```

**Response (Duplicate Email):**
```json
{
  "success": false,
  "error": "This email is already registered as a restaurant. You cannot create multiple accounts with the same email.",
  "existing_role": "restaurant",
  "status": 409
}
```

## Files Modified/Created

### New Files

1. **`types/user.ts`** - TypeScript interfaces for all user roles
   - UserRole enum
   - User interfaces (Customer, Restaurant, DeliveryRider, Admin)
   - SignupData types for each role

2. **`lib/validation.js`** - Validation utilities
   - `roleValidationRules` - Validation rules per role and field
   - `validateRoleField()` - Validate individual fields
   - `validateRoleSignup()` - Validate entire form
   - `getRequiredFieldsForRole()` - Get required fields for role

### Modified Files

1. **`app/api/auth/register/route.js`**
   - Added role-specific field validation
   - Enhanced duplicate account prevention (check any role)
   - Added detailed error messages with existing role info
   - Implemented role-specific database inserts
   - Added transaction-like error handling for role-specific records

2. **`app/(auth)/signup/page.jsx`**
   - Added role-specific form sections
   - Dynamic field display based on selected role
   - Restaurant-specific fields: restaurant name, address, city, delivery fee, opening/closing times
   - Rider-specific fields: vehicle type, license number
   - Enhanced validation for role-specific fields
   - Added warning message for duplicate email attempts
   - Improved user feedback with role-specific welcome messages

## Field Validation Rules

### Base Fields (All Roles)
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | text | Yes | Min 2, Max 100 chars |
| email | email | Yes | Valid email format, Unique across all roles |
| password | text | Yes | Min 8 characters |

### Restaurant-Specific
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| phone | text | Yes | Valid phone format |
| restaurant_name | text | Yes | Min 2, Max 100 chars |
| address | text | Yes | Min 5, Max 500 chars |
| city | text | Yes | Min 2, Max 50 chars |
| delivery_fee | number | Yes | Min 0, Max 10000 |
| opening_time | time | No | - |
| closing_time | time | No | - |

### Rider-Specific
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| phone | text | Yes | Valid phone format |
| vehicle_type | select | Yes | motorcycle, bicycle, car, scooter |
| license_number | text | Yes | Min 5, Max 100 chars |

## Error Handling

The system provides detailed error messages for:
1. Missing required fields with role context
2. Duplicate email across any role
3. Invalid role selection
4. Validation failures with specific field information
5. Database operation failures with graceful rollback

## Security Considerations

1. **Password Hashing**: All passwords are hashed using bcrypt (12 rounds)
2. **Email Uniqueness**: Enforced at database level with UNIQUE constraint
3. **Role Isolation**: Users cannot create multiple accounts with the same email
4. **Validation**: Server-side validation for all role-specific fields
5. **Error Messages**: Informative but secure (no sensitive data leakage)

## Database Schema

### users table
```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('customer','restaurant','rider','admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Role-specific tables
- `customers(customer_id, user_id, profile_image)`
- `restaurants(restaurant_id, user_id, restaurant_name, address, city, ...)`
- `delivery_riders(rider_id, user_id, vehicle_type, license_number, availability)`

## Usage Examples

### Register as Customer
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Ali Hassan',
    email: 'ali@example.com',
    password: 'password123',
    phone: '+92 300 1234567',
    role: 'customer'
  })
});
```

### Register as Restaurant
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Restaurant Owner',
    email: 'owner@example.com',
    password: 'password123',
    phone: '+92 300 1234567',
    role: 'restaurant',
    restaurant_name: 'Ali\'s Biryani',
    address: '123 Main St, Block B',
    city: 'Karachi',
    delivery_fee: 150,
    opening_time: '10:00',
    closing_time: '22:00'
  })
});
```

### Register as Rider
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Ahmed Khan',
    email: 'rider@example.com',
    password: 'password123',
    phone: '+92 300 1234567',
    role: 'rider',
    vehicle_type: 'motorcycle',
    license_number: 'ABC123XYZ'
  })
});
```

## Testing

To test the signup system:

1. **Test Customer Signup**: Visit signup page, select "Customer" role, fill basic fields
2. **Test Restaurant Signup**: Select "Restaurant Owner", fill all required restaurant fields
3. **Test Rider Signup**: Select "Delivery Rider", fill vehicle and license info
4. **Test Duplicate Prevention**: Try registering same email in different role - should get error
5. **Test Validation**: Leave required fields empty - should show validation errors

## Future Enhancements

- [ ] Email verification flow
- [ ] Phone number verification (OTP)
- [ ] Admin role management interface
- [ ] Role upgrade/downgrade logic
- [ ] Enhanced restaurant profile setup wizard
- [ ] Rider background verification
- [ ] KYC verification for restaurant owners
