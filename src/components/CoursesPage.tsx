
import { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from './CourseCard';

const CoursesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const courses = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      progress: 85,
      totalLessons: 24,
      completedLessons: 20,
      duration: '8 weeks',
      students: 156,
      rating: 4.8,
      thumbnail: '/api/placeholder/300/200',
      color: 'bg-scholar-500'
    },
    {
      id: '2',
      title: 'Computer Science Fundamentals',
      instructor: 'Prof. Mike Chen',
      progress: 92,
      totalLessons: 32,
      completedLessons: 29,
      duration: '12 weeks',
      students: 203,
      rating: 4.9,
      thumbnail: '/api/placeholder/300/200',
      color: 'bg-cyber-500'
    },
    {
      id: '3',
      title: 'Physics: Mechanics',
      instructor: 'Dr. Emily Rodriguez',
      progress: 67,
      totalLessons: 18,
      completedLessons: 12,
      duration: '6 weeks',
      students: 98,
      rating: 4.7,
      thumbnail: '/api/placeholder/300/200',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      title: 'Organic Chemistry',
      instructor: 'Prof. David Kim',
      progress: 78,
      totalLessons: 20,
      completedLessons: 15,
      duration: '10 weeks',
      students: 134,
      rating: 4.6,
      thumbnail: '/api/placeholder/300/200',
      color: 'bg-blue-500'
    },
    {
      id: '5',
      title: 'Literature Analysis',
      instructor: 'Dr. Anna Martinez',
      progress: 0,
      totalLessons: 16,
      completedLessons: 0,
      duration: '8 weeks',
      students: 87,
      rating: 4.5,
      thumbnail: '/api/placeholder/300/200',
      color: 'bg-green-500'
    },
    {
      id: '6',
      title: 'World History',
      instructor: 'Prof. Robert Taylor',
      progress: 0,
      totalLessons: 22,
      completedLessons: 0,
      duration: '14 weeks',
      students: 176,
      rating: 4.8,
      thumbnail: '/api/placeholder/300/200',
      color: 'bg-orange-500'
    }
  ];

  const enrolledCourses = courses.filter(course => course.progress > 0);
  const availableCourses = courses.filter(course => course.progress === 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-scholar-400 to-cyber-400 bg-clip-text text-transparent">
            My Courses
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your learning progress and discover new courses
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search courses..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enrolled">Enrolled ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableCourses.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-6">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="available" className="space-y-6">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {availableCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage;
