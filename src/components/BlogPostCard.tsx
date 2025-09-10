import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Edit, Trash2 } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import type { BlogPost } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore?: (post: BlogPost) => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (id: string) => void;
  isPreview?: boolean;
  isEditable?: boolean;
}

const BlogPostCard = ({ 
  post, 
  onReadMore, 
  onEdit, 
  onDelete,
  isPreview = true, 
  isEditable = false 
}: BlogPostCardProps) => {
  const { toast } = useToast();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      onDelete?.(post.id);
      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted.",
      });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(post);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return formatDate(dateString);
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/[#*`\[\]()]/g, '').replace(/\s+/g, ' ').trim();
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-bold font-heading line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          {isEditable && onEdit && onDelete && (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{getTimeAgo(post.createdAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {isPreview ? (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {post.excerpt || getExcerpt(post.content)}
            </p>
            {onReadMore && (
              <Button
                variant="ghost"
                onClick={() => onReadMore(post)}
                className="p-0 h-auto font-medium text-primary hover:text-primary-hover hover:bg-transparent group/btn"
              >
                Read full post
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            )}
          </div>
        ) : (
          <MarkdownRenderer content={post.content} />
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;