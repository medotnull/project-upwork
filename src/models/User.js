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
})

module.exports = {
    UserSignupSchema
}