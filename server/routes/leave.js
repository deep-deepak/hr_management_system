const express = require('express');
const Leave = require('../model/leave');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.post('/api/user/leave/apply', async (req, res) => {
    try {
        const formData = req.body;
        if (formData) {
            const result = new Leave({
                userId: formData.userId,
                type: formData.type,
                reason: formData.reason,
                startDate: formData.startDate,
                endDate: formData.endDate,
                status: formData.status,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await result.save();
            res.send({
                status: true,
                data: result
            })
            res.json(result);
        }
    } catch (error) {
        console.log("error", error)
    }
});


router.get('/api/user/leave/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Perform an aggregation to lookup user details and combine them with leave records
        const leaves = await Leave.aggregate([
            {
                $match: { userId: userId } // Match documents by userId
            },
            {
                $sort: { createdAt: -1 } // Sort by creation date in descending order
            },
            {
                $addFields: {
                    userByObjectId: { $toObjectId: "$userBy" } // Convert userBy field to ObjectId
                }
            },
            {
                $lookup: {
                    from: 'users', // The collection to join with
                    localField: 'userByObjectId', // Field from the leave collection
                    foreignField: '_id', // Field from the users collection
                    as: 'userDetails' // Output array field
                }
            },
            {
                $unwind: {
                    path: '$userDetails', // Unwind the userDetails array to get a single user object
                    preserveNullAndEmptyArrays: true // Keep leaves without user details
                }
            },
            {
                $project: {
                    userByObjectId: 0 // Optionally remove the temporary field
                }
            }
        ]);

        if (leaves.length > 0) {
            res.send({
                status: true,
                data: leaves
            });
        } else {
            res.send({
                status: false,
                message: 'No leave records found'
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: false,
            message: 'An error occurred while fetching leave records'
        });
    }
});




router.get('/api/employee/leave', async (req, res) => {
    try {
        const response = await Leave.aggregate([
            {
                $addFields: {
                    userId: { $toObjectId: "$userId" }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        if (response.length > 0) {
            return res.send({
                status: true,
                data: response
            });
        } else {
            return res.send({
                status: false,
                data: []
            });
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }
});


router.put('/api/employee/leave/:id', async (req, res) => {
    try {
        const leaveId = req.params.id;
        const updatedData = req.body;
        // Find and update the user by ID
        const response = await Leave.findByIdAndUpdate(leaveId,
            {
                ...updatedData,
                updatedAt: new Date(),
                createdAt: new Date()
            }, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators

        });

        if (response) {
            res.send({
                status: true,
                data: response,
                message: "Updated Successfully"
            }); // Respond with the updated user data
        } else {
            res.send({ status: false, error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});



module.exports = router;
