# API Documentation

## Overview

This document describes the API endpoints expected by the frontend. Configure `VITE_API_BASE_URL` environment variable to point to your Node.js/Express backend.

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <accessToken>
```

## Auth Endpoints

### POST /api/auth/login
Login with email and password.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "admin"
  },
  "accessToken": "jwt_token"
}
```

### POST /api/auth/forget_password
Request password reset.

**Body:**
```json
{
  "email": "user@example.com"
}
```

### POST /api/auth/resetPassword
Reset password with token/OTP.

**Body:**
```json
{
  "tokenOrOtp": "123456",
  "new_password": "newpassword123"
}
```

### POST /api/auth/update_password
Update password (protected).

**Body:**
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword123"
}
```

### GET /api/auth/user_detail
Get current user details (protected).

**Response:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "admin",
  "emailVerified": true
}
```

### POST /api/auth/generate_opt_for_email
Generate email verification OTP.

**Body:**
```json
{
  "email": "user@example.com"
}
```

### POST /api/auth/verify_email
Verify email with OTP.

**Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

### POST /api/auth/check_permission
Check if user has specific permission (protected).

**Body:**
```json
{
  "permissionKey": "users:create"
}
```
OR
```json
{
  "module": "users",
  "action": "create"
}
```

**Response:**
```json
{
  "allowed": true,
  "role": "admin"
}
```

---

## Student Endpoints

### POST /api/student/register
Register a new student.

**Body:**
```json
{
  "name": "Jane Student",
  "email": "student@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### POST /api/student/verify_phone_number
Generate phone verification OTP.

**Body:**
```json
{
  "phone": "+1234567890"
}
```

### POST /api/student/verify_otp
Verify phone OTP.

**Body:**
```json
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

### POST /api/student/resend_phone_otp
Resend phone OTP.

**Body:**
```json
{
  "phone": "+1234567890"
}
```

### POST /api/student/forget_password
Request password reset for student.

**Body:**
```json
{
  "email": "student@example.com"
}
```
OR
```json
{
  "phone": "+1234567890"
}
```

### POST /api/student/reset_password
Reset student password.

**Body:**
```json
{
  "tokenOrOtp": "123456",
  "new_password": "newpassword123"
}
```

### DELETE /api/student/account/delete
Delete student account (protected, student only).

---

## Profile Endpoints

### POST /api/profile/create
Create user profile (protected).

**Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "dob": "1990-01-15",
  "gender": "Male",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA"
}
```

### PUT /api/profile/update
Update user profile (protected).

**Body:** Same as create, all fields optional.

### POST /api/profile/upload_profile
Upload profile image (protected, multipart/form-data).

**Form Data:**
- `avatar`: File (image)

**Response:**
```json
{
  "avatarUrl": "https://storage.example.com/avatars/user123.jpg"
}
```

### GET /api/profile/detail
Get full profile details (protected).

---

## Admin Endpoints

All admin endpoints require authentication and appropriate role.

### GET /api/admin/learner/device/detail/:student_id
Get devices for a student.
**Roles:** superAdmin, admin, subAdmin

### DELETE /api/admin/remove/leraner/device/:device_id
Remove a learner device.
**Roles:** superAdmin, admin

### GET /api/auth/fetch/all/enroll/learner/:course_id
Get enrolled learners for a course.
**Roles:** superAdmin, admin, instructor (own courses)

### GET /api/auth/fetch/all/enroll/learner/inpackage/:package_id
Get enrolled learners for a package.
**Roles:** superAdmin, admin

### POST /api/auth/update/enroll/learner/coursse/expiry-date
Update enrollment expiry date.
**Roles:** superAdmin, admin

**Body:**
```json
{
  "enroll_id": "enrollment_uuid",
  "new_expiry_date": "2025-12-31"
}
```

### POST /api/admin/student/enroll
Create new enrollment.
**Roles:** superAdmin, admin, subAdmin

**Body:**
```json
{
  "student_id": "student_uuid",
  "course_id": "course_uuid",
  "package_id": "package_uuid",
  "start_date": "2024-01-01",
  "expiry_date": "2025-01-01"
}
```

### DELETE /api/admin/remove/enroll/student/:enroll_id
Remove an enrollment.
**Roles:** superAdmin, admin

---

## Roles

| Role | Level | Can Manage |
|------|-------|------------|
| superAdmin | 5 | All roles |
| admin | 4 | subAdmin, instructor, student |
| subAdmin | 3 | instructor, student |
| instructor | 2 | student (limited) |
| student | 1 | None |

---

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden (insufficient role)
- 404: Not Found
- 500: Internal Server Error
