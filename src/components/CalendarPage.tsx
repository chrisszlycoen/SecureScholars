
import { useState } from 'react';
import { Calendar, Clock, BookOpen, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'assignment' | 'exam' | 'lecture' | 'meeting';
  course: string;
  date: string;
  time: string;
  color: string;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Calculus Problem Set Due',
      type: 'assignment',
      course: 'Advanced Mathematics',
      date: '2024-01-15',
      time: '11:59 PM',
      color: 'bg-scholar-500'
    },
    {
      id: '2',
      title: 'Computer Science Lecture',
      type: 'lecture',
      course: 'Computer Science',
      date: '2024-01-16',
      time: '10:00 AM',
      color: 'bg-cyber-500'
    },
    {
      id: '3',
      title: 'Physics Lab Session',
      type: 'meeting',
      course: 'Physics: Mechanics',
      date: '2024-01-17',
      time: '2:00 PM',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      title: 'Chemistry Midterm',
      type: 'exam',
      course: 'Organic Chemistry',
      date: '2024-01-20',
      time: '9:00 AM',
      color: 'bg-blue-500'
    }
  ];

  const todayEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  const upcomingEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    return eventDate > today;
  }).slice(0, 5);

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'assignment':
        return <FileText className="w-4 h-4" />;
      case 'exam':
        return <AlertCircle className="w-4 h-4" />;
      case 'lecture':
        return <BookOpen className="w-4 h-4" />;
      case 'meeting':
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventTypeBadge = (type: CalendarEvent['type']) => {
    const variants = {
      assignment: 'secondary',
      exam: 'destructive',
      lecture: 'default',
      meeting: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[type]} className="capitalize">
        {type}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-scholar-400 to-cyber-400 bg-clip-text text-transparent">
          Calendar
        </h1>
        <p className="text-muted-foreground mt-1">
          Stay organized with your academic schedule
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>January 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const hasEvent = events.some(event => 
                    new Date(event.date).getDate() === day
                  );
                  return (
                    <Button
                      key={day}
                      variant={hasEvent ? "default" : "ghost"}
                      className={`h-12 p-1 ${hasEvent ? 'bg-scholar-500 hover:bg-scholar-600' : ''}`}
                      onClick={() => setSelectedDate(new Date(2024, 0, day))}
                    >
                      {day}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Events */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Today's Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayEvents.length > 0 ? (
                  todayEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      {getEventIcon(event.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.course}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      {getEventTypeBadge(event.type)}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No events scheduled for today
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    {getEventIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.course}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                    {getEventTypeBadge(event.type)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
