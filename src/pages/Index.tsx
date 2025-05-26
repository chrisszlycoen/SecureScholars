import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import AIStudyAssistant from '@/components/AIStudyAssistant';
import CoursesPage from '@/components/CoursesPage';
import AssignmentsPage from '@/components/AssignmentsPage';
import GradesPage from '@/components/GradesPage';
import CalendarPage from '@/components/CalendarPage';
import NotificationsPage from '@/components/NotificationsPage';
import AchievementsPage from '@/components/AchievementsPage';
import StudyGroupsPage from '@/components/StudyGroupsPage';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentUser] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Dashboard userRole={currentUser} />;
      case 'courses':
        return <CoursesPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'grades':
        return <GradesPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'study-groups':
        return <StudyGroupsPage />;
      default:
        return <Dashboard userRole={currentUser} />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'overview': return 'Dashboard';
      case 'courses': return 'My Courses';
      case 'assignments': return 'Assignments';
      case 'grades': return 'Grades';
      case 'calendar': return 'Calendar';
      case 'notifications': return 'Notifications';
      case 'achievements': return 'Achievements';
      case 'study-groups': return 'Study Groups';
      default: return 'Dashboard';
    }
  };

  const getPageDescription = () => {
    switch (currentPage) {
      case 'overview': return 'Welcome to your learning hub';
      case 'courses': return 'Track your learning progress and discover new courses';
      case 'assignments': return 'Manage your assignments and deadlines';
      case 'grades': return 'Monitor your academic performance';
      case 'calendar': return 'Stay organized with your academic schedule';
      case 'notifications': return 'Stay updated with important announcements';
      case 'achievements': return 'Track your academic milestones';
      case 'study-groups': return 'Connect and collaborate with fellow students';
      default: return 'Welcome to your learning hub';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar 
          userRole={currentUser} 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-scholar-400 to-cyber-400 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {getPageDescription()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Quick Navigation Pills - Only show on overview page */}
                {currentPage === 'overview' && (
                  <div className="hidden md:flex space-x-2 mr-4">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage('courses')}
                    >
                      Courses
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage('assignments')}
                    >
                      Assignments
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage('grades')}
                    >
                      Grades
                    </Button>
                  </div>
                )}
                
                <Button 
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  className="bg-gradient-to-r from-scholar-500 to-cyber-500 hover:from-scholar-600 hover:to-cyber-600"
                >
                  {showAIAssistant ? 'Hide' : 'Show'} AI Assistant
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={showAIAssistant ? 'lg:col-span-2' : 'lg:col-span-3'}>
                {renderCurrentPage()}
              </div>
              
              {showAIAssistant && (
                <div className="lg:col-span-1">
                  <AIStudyAssistant />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
