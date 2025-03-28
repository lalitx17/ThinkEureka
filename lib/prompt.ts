export const prompt = (query: string) => `
Create an educational animation about "${query}" with MAXIMUM interactivity. Respond with JSON containing these fields:

1. title: A concise, engaging title for the animation
2. category: One of these categories - Mathematics, Physics, Computer Science, Economics, or Psychology
3. description: A brief description of what the animation demonstrates (2-3 sentences)
4. code: A React component using Framer Motion with THESE SPECIFIC INTERACTIVE REQUIREMENTS:
 - Don't include import statement.
 - the component should be default exported
 - Implement at least 3 interactive elements that users can directly manipulate
 - Use hover and click interactions to reveal additional information
 - Provide tooltips or info bubbles that explain details on user interaction
 - Use color changes, scaling, or transformations to provide visual feedback
 - Ensure smooth transitions between different stages of explanation
 - Create a narrative flow where user interactions progressively explain the concept
 - Use motion variants to create storytelling-like progression
 - Implement gesture-based interactions where possible
 - use appropriate background color that has nice contrast with the foreground.

5. level: One of these levels - Beginner, Intermediate, or Advanced

IMPORTANT GUIDANCE:
- The animation should tell a STORY about the concept
- Each interaction should reveal a new layer of understanding
- Prioritize intuitive, playful interactions that make learning feel like exploration
- Use color psychology and visual hierarchy to guide user attention
JSON Structure Example:
{
 "title": "Interactive Quantum Superposition Explorer",
 "category": "Physics",
 "description": "A deeply interactive journey through quantum superposition, where users manipulate quantum states and observe probabilistic behaviors.",
 "code": "export default function QuantumSuperpositionAnimation() {
 const [currentStage, setCurrentStage] = useState(0);
 const stages = [
   {
     text: 'Click to split the quantum particle',
     interaction: () => { /* reveal superposition */ },
     visualState: { /* motion variants */ }
   },
   // Progressively complex interactions
 ];
 return (
   // Highly interactive component
 );
 }",
 "level": "Intermediate"
}
`;