
import { useState } from 'react';
import { Trophy, Medal, Star, Award, Target, Calendar, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AchievementsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: BookOpen,
      category: 'learning',
      points: 50,
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common',
      progress: 100
    },
    {
      id: '2',
      title: 'Study Streak Master',
      description: 'Study for 7 consecutive days',
      icon: Target,
      category: 'consistency',
      points: 200,
      earned: true,
      earnedDate: '2024-01-22',
      rarity: 'rare',
      progress: 100
    },
    {
      id: '3',
      title: 'Perfect Score',
      description: 'Get 100% on any assignment',
      icon: Trophy,
      category: 'achievement',
      points: 150,
      earned: true,
      earnedDate: '2024-01-28',
      rarity: 'epic',
      progress: 100
    },
    {
      id: '4',
      title: 'Social Learner',
      description: 'Join 3 study groups',
      icon: Users,
      category: 'social',
      points: 100,
      earned: false,
      rarity: 'common',
      progress: 67
    },
    {
      id: '5',
      title: 'Knowledge Seeker',
      description: 'Complete 50 lessons',
      icon: Medal,
      category: 'learning',
      points: 500,
      earned: false,
      rarity: 'legendary',
      progress: 84
    }
  ];

  const stats = {
    totalPoints: 850,
    achievementsUnlocked: 3,
    currentStreak: 12,
    rank: 'Scholar'
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-slate-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-violet-500';
      case 'legendary': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const getIconColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-slate-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-violet-600';
      case 'legendary': return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  const getBackgroundColor = (earned: boolean, rarity: string) => {
    if (!earned) return 'bg-slate-50 border-slate-200';
    
    switch (rarity) {
      case 'common': return 'bg-slate-50 border-slate-300';
      case 'rare': return 'bg-blue-50 border-blue-300';
      case 'epic': return 'bg-violet-50 border-violet-300';
      case 'legendary': return 'bg-amber-50 border-amber-300';
      default: return 'bg-slate-50 border-slate-300';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-scholar-200 bg-scholar-50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-scholar-100 rounded-full">
              <Trophy className="w-6 h-6 text-scholar-600" />
            </div>
            <p className="text-2xl font-bold text-scholar-700">{stats.totalPoints}</p>
            <p className="text-sm text-scholar-600">Total Points</p>
          </CardContent>
        </Card>
        
        <Card className="border-cyber-200 bg-cyber-50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-cyber-100 rounded-full">
              <Award className="w-6 h-6 text-cyber-600" />
            </div>
            <p className="text-2xl font-bold text-cyber-700">{stats.achievementsUnlocked}</p>
            <p className="text-sm text-cyber-600">Achievements</p>
          </CardContent>
        </Card>
        
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-emerald-100 rounded-full">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-700">{stats.currentStreak}</p>
            <p className="text-sm text-emerald-600">Day Streak</p>
          </CardContent>
        </Card>
        
        <Card className="border-violet-200 bg-violet-50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-violet-100 rounded-full">
              <Star className="w-6 h-6 text-violet-600" />
            </div>
            <p className="text-2xl font-bold text-violet-700">{stats.rank}</p>
            <p className="text-sm text-violet-600">Current Rank</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="consistency">Consistency</TabsTrigger>
              <TabsTrigger value="achievement">Performance</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAchievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Card 
                      key={achievement.id} 
                      className={`transition-all duration-200 hover:shadow-md ${getBackgroundColor(achievement.earned, achievement.rarity)}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-white/80' : 'bg-slate-100'}`}>
                            <IconComponent className={`w-6 h-6 ${achievement.earned ? getIconColor(achievement.rarity) : 'text-slate-400'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className={`font-semibold ${achievement.earned ? 'text-slate-900' : 'text-slate-500'}`}>
                                {achievement.title}
                              </h3>
                              <Badge variant="secondary" className={`${getRarityColor(achievement.rarity)} text-white text-xs`}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className={`text-sm mb-2 ${achievement.earned ? 'text-slate-700' : 'text-slate-400'}`}>
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-medium ${achievement.earned ? 'text-scholar-600' : 'text-slate-400'}`}>
                                {achievement.points} points
                              </span>
                              {achievement.earned && achievement.earnedDate && (
                                <span className="text-xs text-emerald-600">
                                  Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            {!achievement.earned && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsPage;
