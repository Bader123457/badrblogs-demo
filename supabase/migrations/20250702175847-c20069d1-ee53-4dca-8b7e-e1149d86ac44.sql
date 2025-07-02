-- Create blog_ideas table
CREATE TABLE public.blog_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  topic TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_ideas ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own blog ideas" 
ON public.blog_ideas 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own blog ideas" 
ON public.blog_ideas 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blog ideas" 
ON public.blog_ideas 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blog ideas" 
ON public.blog_ideas 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_ideas_updated_at
  BEFORE UPDATE ON public.blog_ideas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();