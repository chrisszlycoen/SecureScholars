
import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Grade {
  id: string;
  course: string;
  assignment: string;
  grade: string;
  points: number;
  maxPoints: number;
  percentage: number;
  date: string;
  type: 'assignment' | 'quiz' | 'exam' | 'project';
}

const GradesPage = () => {
  const grades: Grade[] = [
    {
      id: '1',
      course: 'Advanced Mathematics',
      assignment: 'Calculus Problem Set #4',
      grade: 'A',
      points: 95,
      maxPoints: 100,
      percentage: 95,
      date: '2024-01-08',
      type: 'assignment'
    },
    {
      id: '2',
      course: 'Computer Science',
      assignment: 'Data Structures Quiz #3',
      grade: 'B+',
      points: 85,
      maxPoints: 100,
      percentage: 85,
      date: '2024-01-05',
      type: 'quiz'
    },
    {
      id: '3',
      course: 'Physics: Mechanics',
      assignment: 'Lab Report #2',
      grade: 'A-',
      points: 92,
      maxPoints: 100,
      percentage: 92,
      date: '2024-01-03',
      type: 'assignment'
    },
    {
      id: '4',
      course: 'Organic Chemistry',
      assignment: 'Midterm Exam',
      grade: 'B',
      points: 82,
      maxPoints: 100,
      percentage: 82,
      date: '2023-12-15',
      type: 'exam'
    }
  ];

  const courseGrades = [
    { course: 'Advanced Mathematics', grade: 'A', percentage: 94, trend: 'up' },
    { course: 'Computer Science', grade: 'A-', percentage: 89, trend: 'up' },
    { course: 'Physics: Mechanics', grade: 'B+', percentage: 88, trend: 'down' },
    { course: 'Organic Chemistry', grade: 'B', percentage: 85, trend: 'up' }
  ];

  const overallGPA = 3.7;
  const totalPoints = grades.reduce((sum, grade) => sum + grade.points, 0);
  const totalMaxPoints = grades.reduce((sum, grade) => sum + grade.maxPoints, 0);
  const overallPercentage = Math.round((totalPoints / totalMaxPoints) * 100);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadgeVariant = (percentage: number) => {
    if (percentage >= 90) return 'default';
    if (percentage >= 80) return 'secondary';
    if (percentage >= 70) return 'outline';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-scholar-400 to-cyber-400 bg-clip-text text-transparent">
          Grades
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your academic performance and progress
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-scholar-500" />
            </div>
            <div className="text-2xl font-bold">{overallGPA}</div>
            <div className="text-sm text-muted-foreground">Overall GPA</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{overallPercentage}%</div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{grades.length}</div>
            <div className="text-sm text-muted-foreground">Graded Items</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">A-</div>
            <div className="text-sm text-muted-foreground">Best Grade</div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grades Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseGrades.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{course.course}</h3>
                    <div className="flex items-center space-x-2">
                      {course.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <Badge variant={getGradeBadgeVariant(course.percentage)}>
                        {course.grade}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={course.percentage} className="flex-1" />
                    <span className={`text-sm font-medium ${getGradeColor(course.percentage)}`}>
                      {course.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Grades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grades.map((grade) => (
              <div key={grade.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{grade.assignment}</h3>
                    <Badge variant={getGradeBadgeVariant(grade.percentage)}>
                      {grade.grade}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{grade.course}</span>
                    <span>{grade.date}</span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className={`text-lg font-bold ${getGradeColor(grade.percentage)}`}>
                    {grade.points}/{grade.maxPoints}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {grade.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradesPage;
