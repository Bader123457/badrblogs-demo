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
    const { title, description, topic } = await req.json();

    if (!title) {
      return new Response(
        JSON.stringify({ error: 'Title is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating blog content for: ${title}`);

    const prompt = `Write an in-depth, highly specific blog post about: "${title}"

CRITICAL REQUIREMENTS:
- Topic: "${topic || 'General'}"
- Description context: "${description}"
- Length: 600-800 words
- Write as an expert who has deep, firsthand knowledge of this subject
- Include SPECIFIC names, tools, studies, locations, or examples - never use generic placeholders
- Vary your structure - avoid the template "intro → 3 sections → conclusion" format
- Use storytelling, anecdotes, and personal insights
- Mention specific research, companies, technologies, or real-world applications

TOPIC-SPECIFIC REQUIREMENTS:
${topic?.toLowerCase().includes('travel') || topic?.toLowerCase().includes('egypt') || topic?.toLowerCase().includes('destination') ? 
  `TRAVEL CONTENT - Include specific details like:
  - Exact landmark names (e.g., "Karnak Temple Complex," "Valley of the Kings")
  - Cultural specifics (e.g., "In Egypt, saying 'La shukran' means no thank you")
  - Practical details (e.g., "The Cairo Metro costs 5 EGP per ride")
  - Real insider tips (e.g., "Book Uber in Egypt using 'Careem' app")
  - Historical context with dates and names
  - Personal travel stories or observations
  - Local food names and where to find them
  - Transportation specifics and pricing` :
  topic?.toLowerCase().includes('tech') || topic?.toLowerCase().includes('programming') || topic?.toLowerCase().includes('software') || topic?.toLowerCase().includes('medicine') || topic?.toLowerCase().includes('computer') ?
  `TECHNICAL CONTENT - Include specific details like:
  - Exact technology names (e.g., "TensorFlow 2.x," "Stanford's CheXNet model")
  - Real code snippets or technical specifications
  - Specific companies and their solutions (e.g., "Google DeepMind's AlphaFold")
  - Research studies with names/dates (e.g., "MIT's 2023 study on AI diagnosis")
  - Tool comparisons with pros/cons
  - Performance metrics and benchmarks
  - Real implementation examples
  - Industry case studies with company names` :
  `GENERAL CONTENT - Include specific details like:
  - Real company examples and case studies
  - Specific statistics with sources
  - Named experts or thought leaders in the field
  - Concrete tools, apps, or resources with names
  - Research findings with institutions/dates
  - Specific methodologies or frameworks
  - Real-world implementation examples
  - Industry trends with supporting data`
}

WRITING STYLE:
- Write conversationally, like you're sharing expertise with a friend
- Use "I've found that..." or "In my experience..." where appropriate
- Include specific examples: "For instance, when I was working with X..."
- Avoid generic advice like "research is important" - be specific about WHAT to research
- Use varied sentence structures and paragraph lengths
- Include surprising facts or lesser-known insights
- Reference credible sources by name when possible

STRUCTURE VARIETY:
- Don't always use the same format
- Consider: Problem → Solution, Story → Lesson, Comparison → Recommendation
- Use subheadings that reflect the actual content, not generic ones
- Include practical next steps that are specific to this topic

Write the complete blog post now, ensuring every paragraph adds unique value:`;

    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured. Please add your OPENAI_API_KEY to Supabase secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate content using OpenAI API
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
            content: 'You are a professional content writer who creates engaging, informative blog posts. Write in a clear, accessible style that provides real value to readers.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, response.statusText, errorText);
      
      let errorMessage = 'Failed to generate content with OpenAI';
      if (response.status === 401) {
        errorMessage = 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in Supabase secrets.';
      } else if (response.status === 429) {
        errorMessage = 'OpenAI API rate limit exceeded. Please try again later.';
      } else if (response.status === 402) {
        errorMessage = 'OpenAI API quota exceeded. Please add credits to your OpenAI account.';
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const blogContent = data.choices[0].message.content;
    console.log('Generated blog content from OpenAI');
    
    // Estimate read time based on word count (average 200 words per minute)
    const wordCount = blogContent.split(' ').length;
    const minutes = Math.ceil(wordCount / 200);
    const readTime = `${minutes} min read`;

    console.log('Blog content generated successfully');

    return new Response(
      JSON.stringify({ 
        content: blogContent,
        readTime: readTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-blog-content function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});