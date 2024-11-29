import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for the User
interface Iuser extends Document {
    fullName: string;
    email: string;
    phone: string;
    dob: Date;
    password: string;
}

// Schema definition
const UserSchema: Schema<Iuser> = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [/^\d{10}$/, "Phone number must be 10 digits"],
        },
        dob: {
            type: Date,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters long"],
        },
    },
    { timestamps: true } // Adds `createdAt` and `updatedAt` fields automatically
);

// Model definition
const UserModel: Model<Iuser> = mongoose.model<Iuser>("User", UserSchema);

export { Iuser, UserSchema, UserModel };
