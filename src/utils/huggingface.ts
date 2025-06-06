// Text analysis utility functions for middle school level
interface StarMethodAnalysis {
  situation: string;
  task: string;
  action: string;
  result: string;
}

interface MCPFeedback {
  feedback: string;
  suggestions: string[];
  score: number;
  areas: {
    situation: { score: number; feedback: string };
    task: { score: number; feedback: string };
    action: { score: number; feedback: string };
    result: { score: number; feedback: string };
  };
}

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/gpt2";
const HUGGINGFACE_API_KEY = "YOUR_HUGGINGFACE_API_KEY"; // Replace with your API key

export const analyzeStarMethod = async (
  originalText: string,
  summary: string
): Promise<{
  feedback: string;
  improvedSummary?: string;
}> => {
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `
          Analyze this story and provide a STAR method summary with improvements:
          
          Original Story: "${originalText}"
          
          Current Summary: "${summary}"
          
          Please provide:
          1. A detailed analysis of the current summary
          2. Specific suggestions for improvement
          3. An improved version of the summary
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data[0].generated_text);

    // Generate feedback message
    const feedback = generateFeedbackMessage(analysis);

    // Generate improved summary
    const improvedSummary = generateImprovedSummary(analysis.improvedSummary);

    return {
      feedback,
      improvedSummary,
    };
  } catch (error) {
    console.error('Error in analyzeStarMethod:', error);
    return {
      feedback: "Oops! We had trouble analyzing your summary. Please try again!",
    };
  }
};

const generateFeedbackMessage = (analysis: any): string => {
  const feedback = [];

  feedback.push("Hi! I've analyzed your summary, and here's what I found:");

  // Add component-specific feedback
  Object.entries(analysis.analysis).forEach(([component, data]: [string, any]) => {
    feedback.push(`\n📚 ${component.charAt(0).toUpperCase() + component.slice(1)}:`);
    feedback.push(data.feedback);
  });

  // Add overall score
  feedback.push(`\n💡 Overall Score: ${analysis.overallScore}%`);

  // Add suggestions
  feedback.push("\nHere are some suggestions to improve your summary:");
  analysis.suggestions.forEach((suggestion: string) => {
    feedback.push(`- ${suggestion}`);
  });

  // Add encouraging closing
  feedback.push("\nI've created an improved version of your summary below. Would you like to see it?");

  return feedback.join("\n");
};

const generateImprovedSummary = (improved: any): string => {
  return `
Situation: ${improved.situation}

Task: ${improved.task}

Action: ${improved.action}

Result: ${improved.result}
  `.trim();
};

const analyzeText = (text: string): StarMethodAnalysis => {
  // Simple text analysis to identify potential STAR components
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Basic heuristics for identifying STAR components
  // For middle school level, we'll focus on simpler sentence structures
  const situation = sentences[0] || text; // First sentence often sets the situation
  const task = sentences[1] || text; // Second sentence often describes the task
  const action = sentences[2] || text; // Third sentence often describes the action
  const result = sentences[sentences.length - 1] || text; // Last sentence often describes the result

  return {
    situation,
    task,
    action,
    result,
  };
};

const calculateSimilarity = (text1: string, text2: string): number => {
  try {
    // Convert texts to lowercase and split into words
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    // Remove common words and punctuation
    // For middle school level, we'll keep more words to account for simpler vocabulary
    const cleanWords1 = words1.filter(word => word.length > 2);
    const cleanWords2 = words2.filter(word => word.length > 2);
    
    // Find common words
    const commonWords = cleanWords1.filter(word => cleanWords2.includes(word));
    
    // Calculate similarity score
    const similarity = (commonWords.length / Math.max(cleanWords1.length, cleanWords2.length)) * 100;
    
    return Math.round(similarity);
  } catch (error) {
    console.error('Error in similarity calculation:', error);
    return 0;
  }
};

const analyzeComponent = async (
  component: string,
  original: string,
  summary: string,
  score: number
): Promise<{ score: number; feedback: string }> => {
  try {
    const prompt = `
      Analyze the following ${component} from a story summary:
      
      Original text: "${original}"
      Student's summary: "${summary}"
      
      Please provide:
      1. A score (0-100) based on how well the summary captures the key points
      2. Specific feedback on what's good and what could be improved
      3. Examples of how to make it better
      
      Format your response as JSON:
      {
        "score": number,
        "feedback": string,
        "suggestions": string[]
      }
    `;

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data[0].generated_text);

    return {
      score: analysis.score,
      feedback: analysis.feedback,
    };
  } catch (error) {
    console.error(`Error analyzing ${component}:`, error);
    return {
      score,
      feedback: `Your ${component} could be stronger. The original text shows: "${original}" while you wrote: "${summary}". Try adding more details and making it more specific.`,
    };
  }
};

const generateMCPFeedback = async (
  original: StarMethodAnalysis,
  summary: StarMethodAnalysis,
  scores: {
    situation: number;
    task: number;
    action: number;
    result: number;
  }
): Promise<MCPFeedback> => {
  try {
    // Analyze each component using HuggingFace API
    const [situationAnalysis, taskAnalysis, actionAnalysis, resultAnalysis] = await Promise.all([
      analyzeComponent("situation", original.situation, summary.situation, scores.situation),
      analyzeComponent("task", original.task, summary.task, scores.task),
      analyzeComponent("action", original.action, summary.action, scores.action),
      analyzeComponent("result", original.result, summary.result, scores.result),
    ]);

    // Get overall analysis from HuggingFace API
    const overallPrompt = `
      Analyze this story summary using the STAR method:
      
      Situation: "${summary.situation}"
      Task: "${summary.task}"
      Action: "${summary.action}"
      Result: "${summary.result}"
      
      Original text:
      Situation: "${original.situation}"
      Task: "${original.task}"
      Action: "${original.action}"
      Result: "${original.result}"
      
      Please provide:
      1. Overall score (0-100)
      2. General feedback
      3. Specific suggestions for improvement
      
      Format your response as JSON:
      {
        "score": number,
        "feedback": string,
        "suggestions": string[]
      }
    `;

    const overallResponse = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: overallPrompt,
      }),
    });

    if (!overallResponse.ok) {
      throw new Error(`HTTP error! status: ${overallResponse.status}`);
    }

    const overallData = await overallResponse.json();
    const overallAnalysis = JSON.parse(overallData[0].generated_text);

    return {
      feedback: overallAnalysis.feedback,
      suggestions: overallAnalysis.suggestions,
      score: overallAnalysis.score,
      areas: {
        situation: situationAnalysis,
        task: taskAnalysis,
        action: actionAnalysis,
        result: resultAnalysis,
      },
    };
  } catch (error) {
    console.error('Error in generateMCPFeedback:', error);
    return {
      feedback: "I had trouble analyzing your summary. Please try again!",
      suggestions: ["Try writing more details", "Make sure to include all parts of the story"],
      score: 0,
      areas: {
        situation: { score: 0, feedback: "Could not analyze situation" },
        task: { score: 0, feedback: "Could not analyze task" },
        action: { score: 0, feedback: "Could not analyze action" },
        result: { score: 0, feedback: "Could not analyze result" },
      },
    };
  }
};

const generateOverallFeedback = (mcpFeedback: MCPFeedback): string => {
  const feedback = [];

  feedback.push("Hi! I've analyzed your summary, and here's what I found:");

  // Add component-specific feedback
  Object.entries(mcpFeedback.areas).forEach(([component, data]) => {
    feedback.push(`\n📚 ${component.charAt(0).toUpperCase() + component.slice(1)}:`);
    feedback.push(data.feedback);
  });

  // Add overall score and suggestions
  feedback.push(`\n💡 Overall Score: ${mcpFeedback.score}%`);
  feedback.push("\nHere are some suggestions to improve your summary:");
  mcpFeedback.suggestions.forEach((suggestion) => {
    feedback.push(`- ${suggestion}`);
  });

  // Add encouraging closing
  feedback.push("\nKeep up the good work! Would you like to try rewriting any part of your summary?");

  return feedback.join("\n");
};

const generateSuggestions = (mcpFeedback: MCPFeedback): string[] => {
  const suggestions = [];

  // Generate suggestions based on scores
  Object.entries(mcpFeedback.areas).forEach(([component, data]) => {
    if (data.score < 60) {
      suggestions.push(`Add more details to the ${component} part`);
    }
  });

  // Add general suggestions
  suggestions.push("Use specific names and places");
  suggestions.push("Explain why things happened");
  suggestions.push("Connect the parts of the story together");
  suggestions.push("Use your own words while keeping the main points");

  return suggestions;
}; 