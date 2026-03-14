export default function handler(req, res) {
  res.status(200).json({
    score: 75,
    suggestions: "Add more skills, projects and achievements to improve your resume."
  });
}
