// Role-specific validation rules

export const roleValidationRules = {
  customer: {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, pattern: 'email' },
    password: { required: true, minLength: 8 },
    phone: { required: false },
  },
  restaurant: {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, pattern: 'email' },
    password: { required: true, minLength: 8 },
    phone: { required: true },
    restaurant_name: { required: true, minLength: 2, maxLength: 100 },
    address: { required: true, minLength: 5, maxLength: 500 },
    city: { required: true, minLength: 2, maxLength: 50 },
    delivery_fee: { required: true, min: 0, max: 10000 },
    opening_time: { required: false },
    closing_time: { required: false },
  },
  rider: {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, pattern: 'email' },
    password: { required: true, minLength: 8 },
    phone: { required: true },
    vehicle_type: { required: true, minLength: 2, maxLength: 50 },
    license_number: { required: true, minLength: 5, maxLength: 100 },
  },
};

export function validateRoleField(role, fieldName, value) {
  const rules = roleValidationRules[role]?.[fieldName];
  
  if (!rules) return null;
  
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return `${fieldName} is required`;
  }
  
  if (rules.minLength && value && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }
  
  if (rules.maxLength && value && value.length > rules.maxLength) {
    return `${fieldName} must not exceed ${rules.maxLength} characters`;
  }
  
  if (rules.pattern === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  }
  
  if (rules.min !== undefined && value !== null && value !== undefined) {
    const numValue = Number(value);
    if (numValue < rules.min) {
      return `${fieldName} must be at least ${rules.min}`;
    }
  }
  
  if (rules.max !== undefined && value !== null && value !== undefined) {
    const numValue = Number(value);
    if (numValue > rules.max) {
      return `${fieldName} must not exceed ${rules.max}`;
    }
  }
  
  return null;
}

export function validateRoleSignup(role, formData) {
  const errors = {};
  const rules = roleValidationRules[role];
  
  Object.keys(rules).forEach(fieldName => {
    const error = validateRoleField(role, fieldName, formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return Object.keys(errors).length > 0 ? errors : null;
}

// Helper to get required fields for a role
export function getRequiredFieldsForRole(role) {
  const rules = roleValidationRules[role];
  return Object.keys(rules).filter(key => rules[key].required);
}
