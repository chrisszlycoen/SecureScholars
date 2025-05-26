
import { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  TrendingUp,
  Users,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  userRole: 'student' | 'teacher' | 'admin';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const [currentStreak, setCurrentStreak] = useState(7);

  const StudentDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-scholar-600 to-cyber-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Alex! 🎓</h2>
        <p className="opacity-90">You're on a {currentStreak}-day learning streak. Keep it up!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-scholar-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-scholar-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyber-100 rounded-lg">
                <Award className="w-5 h-5 text-cyber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{currentStreak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { course: 'Advanced Mathematics', activity: 'Completed Quiz #3', score: 95, time: '2 hours ago' },
              { course: 'Computer Science', activity: 'Submitted Assignment', score: 88, time: '1 day ago' },
              { course: 'Physics', activity: 'Watched Lecture Video', score: null, time: '2 days ago' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">{item.course}</p>
                  <p className="text-sm text-muted-foreground">{item.activity}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                {item.score && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {item.score}%
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Don't miss these important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'Physics Lab Report', course: 'Physics', due: 'Tomorrow', urgent: true },
              { title: 'Math Problem Set #4', course: 'Mathematics', due: 'In 3 days', urgent: false },
              { title: 'CS Project Presentation', course: 'Computer Science', due: 'Next week', urgent: false },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.course}</p>
                </div>
                <Badge variant={item.urgent ? "destructive" : "secondary"}>
                  {item.due}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Track your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Advanced Mathematics', progress: 85, modules: '8/10', color: 'bg-scholar-500' },
              { name: 'Computer Science', progress: 92, modules: '11/12', color: 'bg-cyber-500' },
              { name: 'Physics', progress: 67, modules: '6/9', color: 'bg-purple-500' },
              { name: 'Chemistry', progress: 78, modules: '7/9', color: 'bg-blue-500' },
            ].map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{course.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{course.modules} modules</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TeacherDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-scholar-600 to-cyber-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Good morning, Professor! 👨‍🏫</h2>
        <p className="opacity-90">You have 3 classes today and 12 assignments to review.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-scholar-100 rounded-lg">
                <Users className="w-5 h-5 text-scholar-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyber-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-cyber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Active Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Pending Grades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Class Average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-scholar-600 to-cyber-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">System Overview 🔧</h2>
        <p className="opacity-90">Platform is running smoothly with 1,247 active users today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-scholar-100 rounded-lg">
                <Users className="w-5 h-5 text-scholar-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,456</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyber-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-cyber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">184</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (userRole) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
