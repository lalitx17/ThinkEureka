export const prompt = (query: string) => `
Create an educational animation about "${query}". Respond with JSON containing these fields:
1. title: A concise, engaging title for the animation
2. category: One of these categories - Mathematics, Physics, Computer Science, Economics, or Psychology
3. description: A brief description of what the animation demonstrates (2-3 sentences)
4. code: The React(jsx) code to create this animation. only use framer motion for animations. Don't have import. use default export to the function. the animations should be interactive and also contain text to explain what is going on. make the animation focused towards the center of the screen.
5. level: One of these levels - Beginner, Intermediate, or Advanced

Format your response as valid JSON without explanation text or thinking.
example:

{"title": "How to add numbers",
"category": "Mathematics",
"description": "This animation demonstrates how to add two numbers",
"code": "export function AnimatedComponent({ message }) {
const [isAnimating, setIsAnimating] = useState(false);

return (
  <motion.div
    className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
    animate={{ scale: isAnimating ? 1.2 : 1 }}
    transition={{ duration: 0.5 }}
    onClick={() => setIsAnimating(!isAnimating)}
  >
    <h1 className="text-xl font-bold">Hello, React!</h1>
    <p className="text-gray-700">{message}</p>
  </motion.div>
);
}", "level": "Beginner"}
`;
