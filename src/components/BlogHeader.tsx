import { Button } from '@/components/ui/button';
import { PenTool, BookOpen, Home } from 'lucide-react';

type ViewType = 'list' | 'create';

interface BlogHeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  postsCount: number;
}

const BlogHeader = ({ currentView, onViewChange, postsCount }: BlogHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent">
                  Modern Blog
                </h1>
                <p className="text-sm text-muted-foreground">
                  {postsCount} {postsCount === 1 ? 'post' : 'posts'} published
                </p>
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Button
              variant={currentView === 'list' ? 'default' : 'ghost'}
              onClick={() => onViewChange('list')}
              className={currentView === 'list' 
                ? 'bg-gradient-primary hover:shadow-glow' 
                : 'hover:bg-muted'
              }
            >
              <Home className="h-4 w-4 mr-2" />
              All Posts
            </Button>
            <Button
              variant={currentView === 'create' ? 'default' : 'ghost'}
              onClick={() => onViewChange('create')}
              className={currentView === 'create' 
                ? 'bg-gradient-primary hover:shadow-glow' 
                : 'hover:bg-muted'
              }
            >
              <PenTool className="h-4 w-4 mr-2" />
              Write Post
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;