const Job = require('../model/Job')
const jobUtils = require('../Utils/jobUtils')
const Profile = require('../model/Profile');

module.exports = {
     async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            total : jobs.length,
            progress : 0,
            done : 0,
        }

        let jobTotalHours = 0

        //daily hours of job - total hours of all jobs in progress
        

        const updatedJobs = jobs.map((job) => {
            const remaining = jobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            //status count get status result of map on jobs and add +1 
            statusCount [status] += 1;

            jobTotalHours = status == 'progress'? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;

            /*if (status == 'progress'){
                jobTotalHours += Number(job["daily-hours"])
            }*/
            return {
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        const freeHours = profile["hours-per-day"] - jobTotalHours

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}