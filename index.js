const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB', err));

// Define structuring table
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

// Mapping model
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin(not in)
    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        // .find({price: { $gte: 10, $lte: 20 }})
        // .find({price: { $in: [10, 15, 20] }})
        // .find()
        // .or([{author: 'Mosh'}, {isPublished: true}])
        // .and([])
        // Start with Mosh
        // .find({ author: /^Mosh/ })
        // End with Mosh
        // .find({ author: /Mosh$/i })
        // Contain Mosh
        // .find({ author: /.*Mosh.*/i })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});

    console.log(courses);
}

async function updateCourse(courseId) {
    // const course = await Course.findById(courseId);

    // const result = await Course.update({ _id: courseId }, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });

    const result = await Course.findByIdAndUpdate(courseId, {
        $set: {
            author: 'Johny',
            isPublished: true
        }
    }, { new: true });

    // if (!course) return;

    // if (course.isPublished) return;

    // course.isPublished = true;
    // course.author = 'Another Author';
    // const result = await course.save();

    console.log(result);
}

async function deleteCourse(courseId) {
    const course = await Course.findByIdAndRemove(courseId);
    console.log(course);
}

// createCourse();
// getCourses();
// updateCourse('5c94b9244ebe4863cb257330');
deleteCourse('5c94b9244ebe4863cb257330');