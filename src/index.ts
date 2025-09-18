import express from "express"
import { userRouter } from "./routes/user.route"
import { applicationRouter } from "./routes/application.route"
import { jobPostsRouter } from "./routes/job-posts.route"
import { interviewRouter } from "./routes/interview.route"
import { recruiterRouter } from "./routes/recruiter.route"

const app = express()
const port = 3000
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "hello world"
    })
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/application", applicationRouter)
app.use("/api/v1/job-posts", jobPostsRouter)
app.use("/api/v1/interview", interviewRouter)
app.use("/api/v1/recruiter", recruiterRouter)

app.listen(port, () => {
    console.log(`your server is  running on http://localhost:${port}`)
})
