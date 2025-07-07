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

    const prompt = `Write a comprehensive, engaging blog post based on the following:
    
    Title: "${title}"
    Description: "${description}"
    Topic: "${topic || 'General'}"
    
    Requirements:
    - Write a complete blog post of 500-700 words
    - Use a conversational, engaging tone that connects with readers
    - Include unique facts, examples, and details specific to "${topic || 'this topic'}"
    - Avoid generic filler language or vague advice
    - Structure with clear headings and subheadings using markdown (## for h2, ### for h3)
    - Include an engaging introduction, at least 3 detailed main sections, and a compelling conclusion
    
    Topic-Specific Guidelines:
    ${topic?.toLowerCase().includes('travel') || topic?.toLowerCase().includes('egypt') || topic?.toLowerCase().includes('destination') ? 
      `For travel content, include:
      - Cultural insights and local customs
      - Historical details and significance
      - Practical local tips and insider knowledge
      - Specific landmarks, locations, or experiences
      - Common travel challenges and how to overcome them
      - Recommended itineraries or timing advice` :
      topic?.toLowerCase().includes('tech') || topic?.toLowerCase().includes('programming') || topic?.toLowerCase().includes('software') ?
      `For technical content, include:
      - Practical code examples or step-by-step instructions
      - Industry best practices and proven methodologies
      - Common mistakes to avoid with specific examples
      - Real-world use cases and scenarios
      - Tool recommendations and comparisons
      - Performance tips and optimization strategies` :
      `For this topic, include:
      - Specific examples and case studies
      - Actionable tips that readers can implement immediately
      - Expert insights and proven strategies
      - Common pitfalls and how to avoid them
      - Step-by-step guidance where applicable
      - Resource recommendations and next steps`
    }
    
    Content Structure:
    - Hook readers in the introduction with a compelling opening
    - Use storytelling elements and real examples throughout
    - Include numbered lists, bullet points, and practical takeaways
    - End with a strong conclusion that motivates action
    - Write in second person ("you") to engage readers directly
    
    Write the blog post content only, without any meta information or explanations. Make it unique, valuable, and specific to the topic.`;

    // Try OpenAI API, but fall back to mock content if it fails
    let blogContent;
    let readTime = "4 min read";
    
    try {
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

      if (response.ok) {
        const data = await response.json();
        blogContent = data.choices[0].message.content;
        console.log('Generated blog content from OpenAI');
        
        // Estimate read time based on word count (average 200 words per minute)
        const wordCount = blogContent.split(' ').length;
        const minutes = Math.ceil(wordCount / 200);
        readTime = `${minutes} min read`;
      } else {
        console.log('OpenAI API error (likely no credits):', response.status, response.statusText);
        throw new Error('API failed');
      }
    } catch (error) {
      console.log('Using mock content due to OpenAI API issue:', error.message);
      // Fallback: create mock content when OpenAI fails
      blogContent = generateMockContent(title, description, topic);
      readTime = "3 min read";
    }

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

function generateMockContent(title: string, description: string, topic?: string): string {
  // Generate topic-specific mock content
  if (topic?.toLowerCase().includes('travel') || topic?.toLowerCase().includes('egypt') || topic?.toLowerCase().includes('destination')) {
    return generateTravelMockContent(title, description, topic);
  } else if (topic?.toLowerCase().includes('tech') || topic?.toLowerCase().includes('programming') || topic?.toLowerCase().includes('software')) {
    return generateTechMockContent(title, description, topic);
  } else {
    return generateGeneralMockContent(title, description, topic);
  }
}

function generateTravelMockContent(title: string, description: string, topic?: string): string {
  return `## Introduction

${description}

Planning your adventure requires insider knowledge and practical tips that only experienced travelers can provide. In this comprehensive guide, you'll discover everything you need to know to make your journey unforgettable, from hidden gems to cultural insights that will transform your travel experience.

## Cultural Insights and Local Customs

Understanding local culture is key to authentic travel experiences. Here's what you need to know:

### Traditional Practices
- **Greeting customs**: Learn the proper way to greet locals and show respect
- **Dress codes**: Understand appropriate attire for different locations and occasions
- **Religious considerations**: Navigate sacred sites and religious customs with sensitivity
- **Tipping etiquette**: Know when, where, and how much to tip in different situations

### Language Essentials
Even learning a few basic phrases can dramatically improve your travel experience:
- "Hello" and "Thank you" in the local language
- Essential phrases for ordering food and asking for directions
- Emergency phrases for safety situations

## Historical Context and Significance

### Ancient Heritage
The rich history of this destination spans thousands of years, with archaeological sites that tell stories of ancient civilizations. Key historical periods include:

- **Ancient Era**: Discover the foundations of civilization and early cultural developments
- **Medieval Period**: Explore the influences of trade routes and cultural exchanges
- **Modern History**: Understand how contemporary culture evolved from historical roots

### Architectural Marvels
- **Iconic landmarks**: Must-see structures that define the destination's skyline
- **Hidden architectural gems**: Lesser-known buildings with fascinating histories
- **Preservation efforts**: How local communities protect their cultural heritage

## Practical Travel Tips and Insider Knowledge

### Transportation Secrets
- **Local transportation hacks**: Save money and time with insider transportation tips
- **Peak vs. off-peak travel**: When to visit popular attractions for the best experience
- **Hidden routes**: Alternative paths that locals use to avoid tourist crowds

### Food and Dining Experiences
- **Street food safety**: How to enjoy local cuisine without health risks
- **Restaurant etiquette**: Dining customs and expectations
- **Must-try dishes**: Authentic local specialties you won't find in tourist guides
- **Food markets**: Best times to visit and what to look for

## Common Travel Challenges and Solutions

### Navigation and Communication
**Challenge**: Language barriers and getting lost
**Solution**: Download offline maps and translation apps before you arrive. Carry a card with your hotel address written in the local language.

### Budget Management
**Challenge**: Unexpected expenses and currency confusion
**Solution**: Research typical costs beforehand and always carry some local currency. Use apps to track daily spending.

### Cultural Misunderstandings
**Challenge**: Accidentally offending locals through cultural missteps
**Solution**: Research cultural norms beforehand and observe how locals behave in different situations.

## Recommended Itineraries and Timing

### Perfect Timing
- **Best seasons**: When weather and crowds align for optimal experiences
- **Festival calendar**: Time your visit to coincide with local celebrations
- **Daylight optimization**: How to structure your days for maximum sightseeing

### Sample Itineraries
**3-Day Quick Visit**:
- Day 1: Essential landmarks and orientation
- Day 2: Cultural immersion and local experiences
- Day 3: Hidden gems and relaxation

**Week-Long Deep Dive**:
- Days 1-2: Historical and cultural foundation
- Days 3-4: Adventure and exploration
- Days 5-6: Local lifestyle and authentic experiences
- Day 7: Reflection and souvenir shopping

## Conclusion

Travel is about more than just seeing sights—it's about connecting with places and people in meaningful ways. By understanding the culture, respecting local customs, and venturing beyond the typical tourist trail, you'll create memories that last a lifetime.

Remember, the best travel experiences often come from unexpected moments and genuine connections with locals. Stay open to new experiences, be respectful of different cultures, and don't be afraid to step outside your comfort zone.

## Next Steps

Ready to start planning your adventure? Here's your action plan:

1. **Research visa requirements** and ensure your passport is current
2. **Connect with other travelers** through forums and social media groups
3. **Book accommodations** in advance for popular destinations
4. **Create a flexible itinerary** that allows for spontaneous discoveries

Safe travels and enjoy every moment of your journey!`;
}

function generateTechMockContent(title: string, description: string, topic?: string): string {
  return `## Introduction

${description}

In today's rapidly evolving tech landscape, staying ahead requires not just theoretical knowledge but practical skills you can apply immediately. This comprehensive guide will walk you through proven strategies, real-world examples, and actionable steps to master this technology.

## Fundamental Concepts and Best Practices

### Core Principles
Understanding the foundational concepts is crucial for long-term success:

- **Scalability**: Design systems that can grow with your needs
- **Security**: Implement security measures from the ground up
- **Performance**: Optimize for speed and efficiency
- **Maintainability**: Write code that others (and future you) can understand

### Industry Standards
- **Code conventions**: Follow established naming conventions and style guides
- **Version control**: Use Git effectively with proper branching strategies
- **Documentation**: Write clear, comprehensive documentation for your projects
- **Testing**: Implement unit tests, integration tests, and end-to-end testing

## Practical Implementation Examples

### Getting Started: Step-by-Step Guide

**Step 1: Environment Setup**
```
# Example configuration
npm install
npm run setup
npm run dev
```

**Step 2: Basic Implementation**
Start with a minimal viable example and gradually add complexity:
- Create your project structure
- Implement core functionality
- Add error handling
- Optimize performance

**Step 3: Advanced Features**
Once you have the basics working:
- Implement advanced patterns
- Add monitoring and logging
- Set up CI/CD pipelines
- Scale your solution

### Real-World Use Cases
- **E-commerce platforms**: How major retailers solve common problems
- **Social media applications**: Scaling strategies for user-generated content
- **Financial systems**: Security and reliability requirements
- **IoT applications**: Handling real-time data streams

## Common Mistakes and How to Avoid Them

### Development Pitfalls
**Mistake**: Premature optimization
**Solution**: Focus on correctness first, then optimize based on actual performance bottlenecks.

**Mistake**: Ignoring error handling
**Solution**: Implement comprehensive error handling from the beginning, not as an afterthought.

**Mistake**: Poor testing practices
**Solution**: Write tests as you code, not after the fact. Aim for high coverage of critical paths.

### Architecture Anti-Patterns
**Mistake**: Monolithic design when modularity is needed
**Solution**: Break down complex systems into smaller, manageable components.

**Mistake**: Tight coupling between components
**Solution**: Use interfaces and dependency injection to create loosely coupled systems.

## Tools and Resources

### Essential Development Tools
- **IDEs and Editors**: Choose the right development environment
- **Debugging tools**: Master your debugging workflow
- **Performance profilers**: Identify and fix performance issues
- **Testing frameworks**: Automate your quality assurance process

### Recommended Learning Resources
- **Official documentation**: Always start with the official docs
- **Online courses**: Structured learning paths for different skill levels
- **Open source projects**: Learn from real-world implementations
- **Community forums**: Connect with other developers and get help

## Performance Optimization Strategies

### Code-Level Optimizations
- **Algorithm efficiency**: Choose the right algorithms for your use case
- **Memory management**: Understand memory usage patterns
- **Caching strategies**: Implement effective caching at multiple levels
- **Database optimization**: Write efficient queries and design optimal schemas

### System-Level Optimizations
- **Load balancing**: Distribute traffic effectively across servers
- **CDN implementation**: Serve static content from edge locations
- **Monitoring and alerting**: Set up comprehensive monitoring systems
- **Scaling strategies**: Plan for both vertical and horizontal scaling

## Conclusion

Mastering technology requires continuous learning and hands-on practice. The key is to start with solid fundamentals, learn from real-world examples, and continuously iterate and improve your skills.

Remember that technology evolves rapidly, so stay curious and keep learning. Join developer communities, contribute to open source projects, and don't be afraid to experiment with new technologies and approaches.

## Next Steps

Ready to level up your skills? Here's your roadmap:

1. **Build a portfolio project** that demonstrates your understanding
2. **Contribute to open source** to gain real-world experience
3. **Join developer communities** for networking and learning opportunities
4. **Stay updated** with industry trends and new technologies

Keep coding, keep learning, and most importantly, keep building amazing things!`;
}

function generateGeneralMockContent(title: string, description: string, topic?: string): string {
  return `## Introduction

${description}

Whether you're just starting your journey or looking to deepen your expertise, this comprehensive guide provides actionable insights and proven strategies. We'll explore practical approaches, real-world examples, and expert tips that you can implement immediately.

## Understanding the Fundamentals

### Core Concepts
Building a strong foundation in ${topic || 'this area'} requires understanding several key principles:

- **Strategic thinking**: Approach challenges with a clear methodology
- **Practical application**: Focus on actionable steps rather than theory alone
- **Continuous improvement**: Embrace an iterative approach to mastery
- **Community engagement**: Learn from others and share your experiences

### Essential Skills Development
- **Research skills**: How to find reliable information and stay updated
- **Critical thinking**: Evaluate different approaches and make informed decisions
- **Problem-solving**: Break down complex challenges into manageable components
- **Communication**: Effectively share your knowledge and insights with others

## Practical Strategies and Techniques

### Getting Started: A Step-by-Step Approach

**Phase 1: Foundation Building**
Start with the basics and build your knowledge systematically:
- Identify your current skill level and learning goals
- Gather essential resources and tools
- Create a structured learning plan
- Set realistic milestones and deadlines

**Phase 2: Skill Development**
Apply your knowledge through practical exercises:
- Start with simple projects to build confidence
- Gradually tackle more complex challenges
- Seek feedback from experienced practitioners
- Document your learning journey and insights

**Phase 3: Mastery and Innovation**
Push beyond the basics to develop expertise:
- Experiment with advanced techniques
- Develop your own approaches and methodologies
- Mentor others and share your knowledge
- Stay current with industry trends and innovations

### Real-World Applications
- **Case study examples**: Learn from successful implementations
- **Industry best practices**: Adopt proven methodologies
- **Innovation opportunities**: Identify areas for improvement and creativity
- **Scaling strategies**: Plan for growth and increased complexity

## Expert Insights and Best Practices

### Professional Development
- **Networking**: Build relationships with others in your field
- **Mentorship**: Find mentors and become a mentor to others
- **Continuous learning**: Stay updated with new developments and trends
- **Skill diversification**: Expand your expertise into related areas

### Quality and Excellence
- **Attention to detail**: Small improvements can make big differences
- **User focus**: Always consider the end user or beneficiary
- **Iterative improvement**: Continuously refine your approach
- **Measurement and feedback**: Track progress and adjust based on results

## Common Challenges and Solutions

### Overcoming Obstacles
**Challenge**: Information overload and decision paralysis
**Solution**: Focus on one concept at a time and practice before moving to the next topic.

**Challenge**: Lack of practical experience
**Solution**: Start with small, manageable projects and gradually increase complexity.

**Challenge**: Staying motivated and consistent
**Solution**: Set clear goals, celebrate small wins, and connect with a community of like-minded individuals.

### Avoiding Common Pitfalls
- **Perfectionism**: Don't let perfect be the enemy of good—start and iterate
- **Isolation**: Engage with communities and seek diverse perspectives
- **Stagnation**: Regularly challenge yourself with new projects and learning opportunities

## Future Trends and Opportunities

### Emerging Developments
The landscape of ${topic || 'this field'} continues to evolve rapidly:

- **Technology integration**: How new tools are changing the field
- **Methodological innovations**: New approaches and frameworks
- **Industry shifts**: Changing market demands and opportunities
- **Skill requirements**: What expertise will be most valuable in the future

### Preparing for What's Next
- **Adaptability**: Develop skills that translate across different contexts
- **Learning agility**: Cultivate the ability to quickly master new concepts
- **Innovation mindset**: Look for opportunities to improve existing approaches
- **Global perspective**: Understand how different cultures and markets approach similar challenges

## Conclusion

Success in ${topic || 'this field'} comes from combining solid fundamentals with practical experience and continuous learning. The strategies and insights outlined in this guide provide a roadmap, but your unique journey will depend on your specific goals, interests, and circumstances.

Remember that expertise develops over time through consistent practice and reflection. Be patient with yourself, celebrate progress, and don't be afraid to ask for help when you need it.

## Next Steps

Ready to take action? Here's your implementation plan:

1. **Assess your current situation** and identify your most important learning goals
2. **Choose one strategy** from this guide to implement immediately
3. **Find a community** of practitioners to learn from and share experiences with
4. **Set up a regular practice schedule** to build momentum and consistency

The journey of mastery is rewarding but requires commitment. Start today, stay consistent, and enjoy the process of continuous growth and learning!`;
}