const z = require('zod');

const UserSignupSchema = z.object({
    name: z.string()
        .min(2, "Name must be atleast 2 characters long")
        .max(255, "Name too long"),
    email: z.email("Invalid email address"),
    password: z.string()
        .min(6, "Paaword must be atleast 6 character long"),
    role: z.enum(['client', 'freelancer']).optional(),
    bio: z.string().optional(),
    skills: z.array(z.string()).optional().default([]),
    hourlyRate: z.number()
        .positive("Hourly rate must be positive")
        .optional(),
});

const UserLoginSchema = z.object({
    email: z.email("Invalid email format").toLowerCase(),
    password: z.string().min(1)
});

const UserResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['client', 'freelancer']),
    bio: z.string().nullable(),
    skills: z.array(z.string()).default([]),
    hourlyRate: z.number().nullable
});

const LoginResponseSchema = z.object({
    token: z.string(),
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.email(),
        role: z.enum(['client', 'freelancer'])
    })
});


module.exports = {
    UserSignupSchema,
    UserLoginSchema,
    UserResponseSchema,
    LoginResponseSchema
}