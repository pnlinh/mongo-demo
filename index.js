const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejs')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'NodeJs course',
    author: 'Mosh',
    tags: ['node', 'backend'],
    isPublished: true
});