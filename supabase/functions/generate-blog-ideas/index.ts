import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();

    if (!topic) {
      return new Response(
        JSON.stringify({ error: 'Topic is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating blog ideas for topic: ${topic}`);

    const prompt = `Generate 5 creative and engaging blog post ideas for the topic "${topic}". 
    For each idea, provide:
    1. A compelling title (50-80 characters)
    2. A detailed description (150-200 characters) that explains what the blog post would cover
    
    Make the ideas diverse, actionable, and valuable to readers interested in ${topic}.
    Return the response as a JSON array with objects containing "title" and "description" fields.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a creative content strategist who generates engaging blog post ideas. Always respond with valid JSON only.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate ideas' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Generated content:', generatedContent);

    // Parse the JSON response from OpenAI
    let blogIdeas;
    try {
      blogIdeas = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      // Fallback: create ideas from the text response
      blogIdeas = [
        {
          title: `Ultimate Guide to ${topic}`,
          description: `A comprehensive guide covering everything you need to know about ${topic}, from basics to advanced techniques.`
        },
        {
          title: `Top 10 ${topic} Tips for Beginners`,
          description: `Essential tips and tricks to help newcomers get started with ${topic} and avoid common mistakes.`
        },
        {
          title: `${topic} Trends to Watch This Year`,
          description: `Stay ahead of the curve with the latest trends and developments in the ${topic} industry.`
        },
        {
          title: `Common ${topic} Mistakes and How to Avoid Them`,
          description: `Learn from others' experiences and avoid these costly mistakes in your ${topic} journey.`
        },
        {
          title: `The Future of ${topic}: What Experts Predict`,
          description: `Industry experts share their insights on where ${topic} is heading and what it means for you.`
        }
      ];
    }

    // Ensure we have an array of ideas
    if (!Array.isArray(blogIdeas)) {
      blogIdeas = [blogIdeas];
    }

    // Add topic to each idea and ensure proper structure
    const processedIdeas = blogIdeas.slice(0, 5).map((idea, index) => ({
      id: `generated_${Date.now()}_${index}`,
      title: idea.title || `${topic} Blog Idea ${index + 1}`,
      description: idea.description || `An interesting blog post about ${topic}.`,
      topic: topic
    }));

    console.log('Processed ideas:', processedIdeas);

    return new Response(
      JSON.stringify({ ideas: processedIdeas }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-blog-ideas function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});