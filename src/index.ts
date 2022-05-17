import express, { Request, Response } from "express";
import { scores } from "./data/scores";
import { students } from "./data/students";
const app = express();

// JSONオブジェクトの受信設定
app.use(express.json());
// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/students", (req: Request, res: Response) => {
  res.json(students);
});

app.get("/scores", (req: Request, res: Response) => {
  res.json(scores);
});

app.get("/scores/:studentId", (req: Request, res: Response) => {
  const studentId = req.params.studentId;
  res.json(scores.filter((score) => score.studentId === Number(studentId)));
});

app.get("/student-scores/:studentId", (req: Request, res: Response) => {
  const studentId = req.params.studentId;
  res.json(
    scores
      .filter((score) => score.studentId === Number(studentId))
      .map((score) => ({ subject: score.subject, score: score.score }))
  );
});

// 3000ポートで受信
const port = process.env.PORT || 3000;

// APIサーバ起動
app.listen(port);
console.log("Express WebApi listening on port " + port);
