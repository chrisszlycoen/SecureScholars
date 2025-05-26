
import { useState } from 'react';
import { Users, Plus, Search, Filter, Calendar, MessageCircle, BookOpen, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudyGroupsPage = () => {
  const [activeTab, setActiveTab] = useState('my-groups');

  const myGroups = [
    {
      id: '1',
      name: 'Advanced Mathematics Study Circle',
      subject: 'Mathematics',
      members: 8,
      maxMembers: 12,
      nextSession: '2024-01-20T15:00:00Z',
      description: 'Focused on calculus and differential equations',
      isOwner: true,
      lastActivity: '2 hours ago',
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Computer Science Fundamentals',
      subject: 'Computer Science',
      members: 6,
      maxMembers: 10,
      nextSession: '2024-01-22T14:00:00Z',
      description: 'Algorithms, data structures, and programming concepts',
      isOwner: false,
      lastActivity: '1 day ago',
      avatar: '/api/placeholder/100/100'
    }
  ];

  const availableGroups = [
    {
      id: '3',
      name: 'Physics Problem Solvers',
      subject: 'Physics',
      members: 5,
      maxMembers: 8,
      nextSession: '2024-01-21T16:00:00Z',
      description: 'Mechanics and thermodynamics focus',
      owner: 'Dr. Sarah Johnson',
      rating: 4.8,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '4',
      name: 'Chemistry Lab Partners',
      subject: 'Chemistry',
      members: 4,
      maxMembers: 6,
      nextSession: '2024-01-23T13:00:00Z',
      description: 'Organic chemistry and lab experiments',
      owner: 'Prof. Mike Chen',
      rating: 4.6,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '5',
      name: 'Literature Discussion Club',
      subject: 'Literature',
      members: 7,
      maxMembers: 15,
      nextSession: '2024-01-24T17:00:00Z',
      description: 'Modern literature analysis and discussion',
      owner: 'Dr. Anna Martinez',
      rating: 4.9,
      avatar: '/api/placeholder/100/100'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Mathematics': 'bg-scholar-500',
      'Computer Science': 'bg-cyber-500',
      'Physics': 'bg-purple-500',
      'Chemistry': 'bg-blue-500',
      'Literature': 'bg-green-500'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-scholar-400 to-cyber-400 bg-clip-text text-transparent">
            Study Groups
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect and collaborate with fellow students
          </p>
        </div>
        <Button className="bg-gradient-to-r from-scholar-500 to-cyber-500 hover:from-scholar-600 hover:to-cyber-600">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search study groups..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filter by Subject
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
          <TabsTrigger value="discover">Discover ({availableGroups.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="my-groups" className="space-y-4 mt-6">
          {myGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback>
                        <Users className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        {group.isOwner && (
                          <Badge variant="secondary" className="bg-scholar-100 text-scholar-700">
                            Owner
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{group.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{group.members}/{group.maxMembers} members</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Next: {formatDate(group.nextSession)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>Active {group.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getSubjectColor(group.subject)} text-white`}>
                      {group.subject}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="discover" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {availableGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback>
                        <Users className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{group.name}</h3>
                        <Badge className={`${getSubjectColor(group.subject)} text-white`}>
                          {group.subject}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{group.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>by {group.owner}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>★ {group.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{group.members}/{group.maxMembers}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(group.nextSession)}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Join Group
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyGroupsPage;
