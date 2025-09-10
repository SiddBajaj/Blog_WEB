import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PlusCircle, FileText } from 'lucide-react';
import type { CreateBlogPostData } from '@/types/blog';

interface BlogPostFormProps {
  onSubmit: (data: CreateBlogPostData) => void;
  isSubmitting?: boolean;
  initialData?: {
    title: string;
    content: string;
  };
  submitButtonText?: string;
}

const BlogPostForm = ({ 
  onSubmit, 
  isSubmitting = false, 
  initialData,
  submitButtonText = 'Publish Post'
}: BlogPostFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  
  // Update form fields if initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-gradient-card">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold font-heading">
              {initialData ? 'Edit Post' : 'Create New Post'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {initialData ? 'Update your post below.' : 'Share your thoughts with the world. Markdown is supported!'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-card-foreground">
              Post Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-card-foreground">
              Content
            </Label>
            <Textarea
              id="content"
              placeholder="Write your post content here... (Markdown supported)

Example:
# Heading
## Subheading
- List item
- Another item

**Bold text** and *italic text*

```code
console.log('Hello World!');
```"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 font-mono text-sm leading-relaxed"
              required
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-gradient-primary hover:shadow-glow transition-all"
              disabled={isSubmitting || !title.trim() || !content.trim()}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {initialData ? 'Updating...' : 'Publishing...'}
                </>
              ) : submitButtonText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogPostForm;