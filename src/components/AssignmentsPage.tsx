import { useState } from 'react';
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  grade?: string;
  points: number;
  maxPoints: number;
  type: 'assignment' | 'quiz' | 'exam' | 'project';
  description: string;
}

const AssignmentsPage = () => {
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set #5',
      course: 'Advanced Mathematics',
      dueDate: '2024-01-15',
      status: 'pending',
      points: 0,
      maxPoints: 100,
      type: 'assignment',
      description: 'Complete problems 1-20 from Chapter 5'
    },
    {
      id: '2',
      title: 'Data Structures Quiz',
      course: 'Computer Science',
      dueDate: '2024-01-12',
      status: 'submitted',
      points: 85,
      maxPoints: 100,
      type: 'quiz',
      description: 'Quiz covering arrays, linked lists, and stacks'
    },
    {
      id: '3',
      title: 'Physics Lab Report',
      course: 'Physics: Mechanics',
      dueDate: '2024-01-10',
      status: 'graded',
      grade: 'A-',
      points: 92,
      maxPoints: 100,
      type: 'assignment',
      description: 'Analysis of pendulum motion experiment'
    },
    {
      id: '4',
      title: 'Chemistry Midterm',
      course: 'Organic Chemistry',
      dueDate: '2024-01-08',
      status: 'overdue',
      points: 0,
      maxPoints: 200,
      type: 'exam',
      description: 'Comprehensive exam covering chapters 1-8'
    }
  ];

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'submitted':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'graded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Assignment['status']) => {
    const variants = {
      pending: 'secondary',
      submitted: 'outline',
      graded: 'default',
      overdue: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getTypeIcon = (type: Assignment['type']) => {
    switch (type) {
      case 'assignment':
        return <FileText className="w-4 h-4" />;
      case 'quiz':
        return <CheckCircle className="w-4 h-4" />;
      case 'exam':
        return <AlertCircle className="w-4 h-4" />;
      case 'project':
        return <FileText className="w-4 h-4" />;
    }
  };

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const submittedAssignments = assignments.filter(a => a.status === 'submitted');
  const gradedAssignments = assignments.filter(a => a.status === 'graded');
  const overdueAssignments = assignments.filter(a => a.status === 'overdue');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-scholar-400 to-cyber-400 bg-clip-text text-transparent">
          Assignments
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your assignments, quizzes, and exams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingAssignments.length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{submittedAssignments.length}</div>
            <div className="text-sm text-muted-foreground">Submitted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{gradedAssignments.length}</div>
            <div className="text-sm text-muted-foreground">Graded</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{overdueAssignments.length}</div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(assignment.type)}
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{assignment.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(assignment.status)}
                      <span className="capitalize">{assignment.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {assignment.status === 'graded' && assignment.grade && (
                      <Badge variant="outline">{assignment.grade}</Badge>
                    )}
                    <span className="text-sm font-medium">
                      {assignment.points}/{assignment.maxPoints} pts
                    </span>
                    <Button size="sm">
                      {assignment.status === 'pending' ? 'Submit' : 'View'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(assignment.type)}
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{assignment.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                  </div>
                  <Button size="sm">Submit Assignment</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submittedAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(assignment.type)}
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{assignment.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(assignment.status)}
                      <span className="capitalize">{assignment.status}</span>
                    </div>
                  </div>
                  <Button size="sm">View Submission</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          {gradedAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(assignment.type)}
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{assignment.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(assignment.status)}
                      <span className="capitalize">{assignment.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {assignment.grade && (
                      <Badge variant="outline">{assignment.grade}</Badge>
                    )}
                    <span className="text-sm font-medium">
                      {assignment.points}/{assignment.maxPoints} pts
                    </span>
                    <Button size="sm">View Grade</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {overdueAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300 border-red-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(assignment.type)}
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{assignment.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(assignment.status)}
                      <span className="capitalize">{assignment.status}</span>
                    </div>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentsPage;
