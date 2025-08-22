import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        requestorName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
        },
        itemRequested: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100
        },
        requestCreatedDate: {
            type: Date,
            required: true,
        },
        lastEditedDate: {
            type: Date,
            required: false, // Optional as per requirements
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'completed', 'approved', 'rejected'], // Only allow these values
            default: 'pending'
        }
    },
    { 
        timestamps: true, // createdAt, updatedAt
        collection: 'requests' // Explicitly set collection name to 'requests'
    }
);

// // Add a pre-save middleware to ensure lastEditedDate is set when status changes
// requestSchema.pre('save', function(next) {
//     if (this.isModified('status')) {
//         this.lastEditedDate = new Date();
//     }
//     next();
// });

const Request = mongoose.model("Request", requestSchema, "requests");

export default Request;