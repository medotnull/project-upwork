const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("../config/jwt")
const { nanoid } = require("nanoid");
const { UserSignupSchema } = require("../models/User");
const { success } = require("zod");

const signup = async (req, res) => {
    try {
        const data = UserSignupSchema.parse(req.body);

        const existingUser = await db.query(
            'SELECT id FROM user WHERE email = $1',
            [data.email]
        )

        if(existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                data: null,
                error: 'EMAIL_ALREADY_EXISTS'
            });
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const userId = `usr_${nanoid(10)}`;
        const role = data.role || 'client';

        const newUser = await db.query(`
            INSERT INTO users (id, name, email, password, role, bio, skills, hourlyRate)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, name, email, role, bio, skills, hourlyRate
            `, [
                userId,
                data.name,
                data.email,
                hashedPassword,
                role,
                data.bio || null,
                data.skills || [],
                data.hourlyRate || null
            ]);

            res.status(201).json({
                success: true,
                data: newUser.rows[0],
                error: null
            })
    } catch(error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({
                success: false,
                data: null,
                error: 'INVALID_REQUEST'
            });
        }
        res.status(500).json({
            success: false,
            data: null,
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
};