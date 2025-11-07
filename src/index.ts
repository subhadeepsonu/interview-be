import express from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
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

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Interview API",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:3000",

            }, {
                url: "https://interview-be.onrender.com",
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/user", userRouter)
app.use("/application", applicationRouter)
app.use("/jobs", jobPostsRouter)
app.use("/interview", interviewRouter)
app.use("/recruiter", recruiterRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📚 Swagger docs at http://localhost:${port}/api-docs`);
})
