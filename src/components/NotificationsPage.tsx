
import { useState } from 'react';
import { Bell, Check, X, Filter, Search, Calendar, User, BookOpen, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'assignment',
      title: 'New Assignment: Advanced Calculus Problem Set',
      message: 'Dr. Sarah Johnson has posted a new assignment due on January 25th',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      priority: 'high',
      icon: BookOpen,
      from: 'Dr. Sarah Johnson',
      course: 'Advanced Mathematics'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Achievement Unlocked: Study Streak Master!',
      message: 'Congratulations! You\'ve studied for 7 consecutive days',
      timestamp: '2024-01-20T09:15:00Z',
      read: false,
      priority: 'medium',
      icon: Award,
      from: 'System'
    },
    {
      id: '3',
      type: 'group',
      title: 'Study Group Session Reminder',
      message: 'Advanced Mathematics Study Circle starts in 30 minutes',
      timestamp: '2024-01-20T08:45:00Z',
      read: true,
      priority: 'high',
      icon: Users,
      from: 'Study Group',
      course: 'Advanced Mathematics'
    },
    {
      id: '4',
      type: 'grade',
      title: 'Grade Posted: Physics Quiz #3',
      message: 'Your score: 95/100. Great work!',
      timestamp: '2024-01-19T16:20:00Z',
      read: true,
      priority: 'medium',
      icon: Award,
      from: 'Dr. Emily Rodriguez',
      course: 'Physics'
    },
    {
      id: '5',
      type: 'message',
      title: 'New Message from Dr. Mike Chen',
      message: 'Regarding your project proposal submission...',
      timestamp: '2024-01-19T14:30:00Z',
      read: false,
      priority: 'medium',
      icon: User,
      from: 'Dr. Mike Chen',
      course: 'Computer Science'
    },
    {
      id: '6',
      type: 'system',
      title: 'Scheduled Maintenance Notice',
      message: 'The platform will be under maintenance tonight from 11 PM to 1 AM',
      timestamp: '2024-01-19T12:00:00Z',
      read: true,
      priority: 'low',
      icon: Bell,
      from: 'System'
    }
  ]);

  const [settings, setSettings] = useState({
    assignments: true,
    grades: true,
    messages: true,
    achievements: true,
    studyGroups: true,
    system: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-400 bg-red-50';
      case 'medium': return 'border-l-amber-400 bg-amber-50';
      case 'low': return 'border-l-slate-400 bg-slate-50';
      default: return 'border-l-slate-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'achievement': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'group': return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'grade': return 'bg-scholar-50 text-scholar-700 border-scholar-200';
      case 'message': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'system': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notif => 
        activeTab === 'unread' ? !notif.read : notif.type === activeTab
      );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search notifications..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          <Check className="w-4 h-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadCount})
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="assignment">Assignments</TabsTrigger>
              <TabsTrigger value="achievement">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <Card 
                      key={notification.id} 
                      className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'ring-2 ring-blue-100' : ''
                      } hover:shadow-md transition-all duration-200`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`p-2 rounded-lg ${notification.read ? 'bg-slate-100' : 'bg-blue-100'}`}>
                              <IconComponent className={`w-5 h-5 ${notification.read ? 'text-slate-600' : 'text-blue-600'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className={`font-semibold ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                                  {notification.title}
                                </h3>
                                <Badge variant="outline" className={getTypeColor(notification.type)}>
                                  {notification.type}
                                </Badge>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-slate-600 text-sm mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span>From: {notification.from}</span>
                                {notification.course && <span>Course: {notification.course}</span>}
                                <span>{formatTimeAgo(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Notification Settings */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Assignments</span>
                  <Switch 
                    checked={settings.assignments}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, assignments: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Grades</span>
                  <Switch 
                    checked={settings.grades}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, grades: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Messages</span>
                  <Switch 
                    checked={settings.messages}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, messages: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Achievements</span>
                  <Switch 
                    checked={settings.achievements}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, achievements: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Study Groups</span>
                  <Switch 
                    checked={settings.studyGroups}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, studyGroups: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Updates</span>
                  <Switch 
                    checked={settings.system}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, system: checked }))
                    }
                  />
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Notifications</span>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <Switch 
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
