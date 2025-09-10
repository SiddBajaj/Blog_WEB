import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import BlogHeader from '@/components/BlogHeader';
import BlogPostForm from '@/components/BlogPostForm';
import BlogPostCard from '@/components/BlogPostCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { 
  loadBlogPosts, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  initializeSamplePosts 
} from '@/utils/blogStorage';
import type { BlogPost, CreateBlogPostData } from '@/types/blog';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  type ViewType = 'list' | 'form';
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initializeSamplePosts();
    setPosts(loadBlogPosts());
  }, []);

  const handleCreatePost = async (data: CreateBlogPostData) => {
    setIsSubmitting(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let updatedPosts: BlogPost[];
      if (isEditing && selectedPost) {
        updatedPosts = updateBlogPost(selectedPost.id, data);
        toast({
          title: "Post updated!",
          description: "Your blog post has been successfully updated.",
        });
      } else {
        updatedPosts = addBlogPost(data);
        toast({
          title: "Post published!",
          description: "Your blog post has been successfully published.",
        });
      }
      
      setPosts(updatedPosts);
      setCurrentView('list');
      setIsEditing(false);
      setSelectedPost(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'publish'} your post. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditing(true);
    setCurrentView('form');
  };

  const handleDeletePost = (id: string) => {
    try {
      const updatedPosts = deleteBlogPost(id);
      setPosts(updatedPosts);
      
      // If we're viewing the post being deleted, go back to the list
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setIsCreating(true);
    setCurrentView('form');
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <BlogHeader 
          currentView="list" 
          onViewChange={() => handleBackToList()} 
          postsCount={posts.length} 
        />
        <main className="container max-w-4xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={handleBackToList}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Button>
          <div className="animate-fade-in">
            <BlogPostCard post={selectedPost} isPreview={false} />
          </div>
        </main>
      </div>
    );
  }

  if (currentView === 'form') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => {
            setCurrentView('list');
            setIsEditing(false);
            setSelectedPost(null);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {isEditing ? 'Back to Post' : 'Back to Posts'}
        </Button>
        <BlogPostForm 
          onSubmit={handleCreatePost} 
          isSubmitting={isSubmitting} 
          initialData={isEditing && selectedPost ? {
            title: selectedPost.title,
            content: selectedPost.content
          } : undefined}
          submitButtonText={isEditing ? 'Update Post' : 'Publish Post'}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BlogHeader 
        currentView={isCreating || isEditing ? 'create' : 'list'}
        onViewChange={(view) => {
          if (view === 'create') {
            handleNewPost();
          } else {
            setCurrentView('list');
            setIsCreating(false);
          }
        }}
        postsCount={posts.length} 
      />
      
      <main className="container max-w-7xl mx-auto px-6 py-8">
        {isCreating || isEditing ? (
          <div className="animate-fade-in">
            <BlogPostForm 
              onSubmit={handleCreatePost} 
              isSubmitting={isSubmitting} 
              initialData={isEditing && selectedPost ? {
                title: selectedPost.title,
                content: selectedPost.content
              } : undefined}
              submitButtonText={isEditing ? 'Update Post' : 'Publish Post'}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {posts.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="max-w-md mx-auto">
                  <div className="p-6 bg-muted/30 rounded-2xl mb-6">
                    <h2 className="text-2xl font-bold font-heading mb-4">No posts yet</h2>
                    <p className="text-muted-foreground mb-6">
                      Start sharing your thoughts by creating your first blog post.
                    </p>
                    <Button
                      onClick={handleNewPost}
                      className="bg-gradient-primary hover:shadow-glow"
                    >
                      Write your first post
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    onReadMore={handleReadMore}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                    isPreview={true}
                    isEditable={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;