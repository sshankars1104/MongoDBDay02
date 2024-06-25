//01.Find all the topics and tasks which are thought in the month of October

db.topics.find({ date: { $regex: "2023-10" } });
db.tasks.find({ date: { $regex: "2023-10" } });

//------------------------------------------------------------------------------//






//------------------------------------------------------------------------------//

//02.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({
  date: { $gte: new Date("2020-10-15"), $lte: new Date("2020-10-31") }
});

//------------------------------------------------------------------------------//






//------------------------------------------------------------------------------//
//03.Find all the company drives and students who are appeared for the placement.

const drives = db.drives.find({}).toArray();// Fetch all drives

const emails = [];// Collect all student emails from drives

drives.forEach(drive => {
  drive.students.forEach(studentEmail => {
    emails.push(studentEmail);
  });
});

// Find all users who appeared for placement (students)
const appearedStudents = db.users.find({ email: { $in: emails } }).toArray();
//------------------------------------------------------------------------------//







//------------------------------------------------------------------------------//
//04.Find the number of problems solved by the user in codekata
db.getCollection('Codekata').aggregate([
  {
    $match: { userEmail: 'sam@example.com' } // Replace with the user's email
  },
  {
    $group: {
      _id: null,
      totalProblemsSolved: { $sum: '$problemSolved' }
    }
  }
]);
//------------------------------------------------------------------------------//









//------------------------------------------------------------------------------//
//05.Find all the mentors with who has the mentee's count more than 15

db.menteeCount.find({
    menteeCount: { $gt: 15 }
});
//------------------------------------------------------------------------------//








//------------------------------------------------------------------------------//
//06.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.getCollection('Attendence').aggregate([
  {
    $lookup: {
      from: 'Topics',
      localField: 'topicId',
      foreignField: 'topicId',
      as: 'Absent'
    }
  },
  {
    $lookup: {
      from: 'Tasks',
      localField: 'userId',
      foreignField: 'userId',
      as: 'TasksNotSubmitted'
    }
  },
  {
    $match: {
      attended: false,
      'Absent.topicDate': {
        $gte: new Date('2020-10-15'),
        $lte: new Date('2020-10-31')
      },
      'TasksNotSubmitted.dueDate': {
        $gte: new Date('2020-10-15'),
        $lte: new Date('2020-10-31')
      },
      'TasksNotSubmitted.submitted': false
    }
  },
  {
    $project: {
      _id: 0,
      Absent: { _id: 0 },
      TasksNotSubmitted: { _id: 0 }
    }
  }
]);

//------------------------------------------------------------------------------//