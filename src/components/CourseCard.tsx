
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    duration: string;
    students: number;
    rating: number;
    thumbnail: string;
    color: string;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 card-hover">
      <div className={`h-2 ${course.color}`}></div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            {course.progress}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${course.color} transition-all duration-300`}
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" variant={course.progress > 0 ? "default" : "outline"}>
          {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
