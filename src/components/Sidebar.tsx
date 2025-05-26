
import { useState } from 'react';
import { 
  Book, 
  Calendar, 
  Users, 
  Bell, 
  User, 
  ChevronDown,
  Home,
  BookOpen,
  Award,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarProps {
  userRole: 'student' | 'teacher' | 'admin';
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

interface MenuItem {
  icon: any;
  label: string;
  badge: string | null;
  active: boolean;
  submenu?: boolean;
  page?: string;
}

const Sidebar = ({ userRole, currentPage = 'overview', onPageChange }: SidebarProps) => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(true);

  const getMenuItems = (): MenuItem[] => {
    const common: MenuItem[] = [
      { icon: Home, label: 'Dashboard', badge: null, active: currentPage === 'overview', submenu: false, page: 'overview' },
      { icon: Calendar, label: 'Calendar', badge: '2', active: currentPage === 'calendar', submenu: false, page: 'calendar' },
      { icon: Bell, label: 'Notifications', badge: '5', active: currentPage === 'notifications', submenu: false, page: 'notifications' },
    ];

    switch (userRole) {
      case 'student':
        return [
          ...common,
          { icon: BookOpen, label: 'My Courses', badge: null, active: currentPage === 'courses', submenu: true, page: 'courses' },
          { icon: Award, label: 'Achievements', badge: '3', active: currentPage === 'achievements', submenu: false, page: 'achievements' },
          { icon: User, label: 'Study Groups', badge: null, active: currentPage === 'study-groups', submenu: false, page: 'study-groups' },
        ];
      case 'teacher':
        return [
          ...common,
          { icon: Users, label: 'My Classes', badge: null, active: currentPage === 'classes', submenu: false, page: 'classes' },
          { icon: Book, label: 'Content Library', badge: null, active: currentPage === 'content', submenu: false, page: 'content' },
          { icon: Award, label: 'Grading Center', badge: '12', active: currentPage === 'grading', submenu: false, page: 'grading' },
        ];
      case 'admin':
        return [
          ...common,
          { icon: Users, label: 'User Management', badge: null, active: currentPage === 'users', submenu: false, page: 'users' },
          { icon: Book, label: 'System Analytics', badge: null, active: currentPage === 'analytics', submenu: false, page: 'analytics' },
          { icon: Settings, label: 'Platform Settings', badge: null, active: currentPage === 'settings', submenu: false, page: 'settings' },
        ];
      default:
        return common;
    }
  };

  const courses = [
    { name: 'Advanced Mathematics', progress: 85, color: 'bg-scholar-500' },
    { name: 'Computer Science', progress: 92, color: 'bg-cyber-500' },
    { name: 'Physics', progress: 67, color: 'bg-purple-500' },
    { name: 'Chemistry', progress: 78, color: 'bg-blue-500' },
  ];

  const handleMenuItemClick = (page?: string) => {
    if (page && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="w-64 h-screen bg-card border-r border-border overflow-y-auto">
      <div className="p-6">
        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-scholar-400 to-cyber-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {getMenuItems().map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <Collapsible open={isCoursesOpen} onOpenChange={setIsCoursesOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between hover:bg-muted/50"
                      onClick={() => handleMenuItemClick(item.page)}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1">
                    {courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="ml-7 p-2 rounded-lg hover:bg-muted/30 cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{course.name}</span>
                          <span className="text-xs text-muted-foreground">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${course.color}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className="w-full justify-start hover:bg-muted/50"
                  onClick={() => handleMenuItemClick(item.page)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto bg-scholar-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
