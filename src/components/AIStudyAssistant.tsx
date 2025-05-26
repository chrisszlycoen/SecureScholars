
import { useState } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'summary' | 'flashcard' | 'explanation';
}

const AIStudyAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm your AI Study Assistant. I can help you with summaries, create flashcards, explain complex topics, and answer questions about your courses. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { label: 'Create Flashcards', icon: BookOpen, action: 'flashcards' },
    { label: 'Summarize Chapter', icon: BrainCircuit, action: 'summary' },
    { label: 'Explain Concept', icon: Sparkles, action: 'explain' },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
        type: getResponseType(inputValue),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('flashcard')) {
      return "I'll help you create flashcards! Here are some key concepts from your Advanced Mathematics course:\n\n**Front:** What is the derivative of sin(x)?\n**Back:** cos(x)\n\n**Front:** Define a limit in calculus\n**Back:** The value that a function approaches as the input approaches some value\n\nWould you like me to create more flashcards for a specific topic?";
    } else if (lowerInput.includes('summary') || lowerInput.includes('summarize')) {
      return "Here's a summary of Chapter 5: Derivatives\n\n🔹 **Key Points:**\n• Derivatives measure the rate of change\n• The derivative of x^n is nx^(n-1)\n• Chain rule: d/dx[f(g(x))] = f'(g(x)) × g'(x)\n• Product rule: d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)\n\n📊 **Applications:**\n• Finding maximum and minimum values\n• Analyzing motion and velocity\n• Optimization problems";
    } else if (lowerInput.includes('explain')) {
      return "I'd be happy to explain any concept! For example, let me explain **derivatives**:\n\nThink of a derivative as the 'instantaneous rate of change' - like how fast your car is going at exactly 3:00 PM, not your average speed for the whole trip.\n\n🚗 **Real-world analogy:**\n• Position = where you are\n• Velocity = derivative of position\n• Acceleration = derivative of velocity\n\nMathematically, it's the slope of the tangent line to a curve at any given point. What specific concept would you like me to explain?";
    } else {
      return "That's a great question! I can help you understand this better. Could you provide more context about which course or topic this relates to? I have access to your course materials and can give you personalized explanations based on what you're currently studying.";
    }
  };

  const getResponseType = (input: string): 'text' | 'summary' | 'flashcard' | 'explanation' => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('flashcard')) return 'flashcard';
    if (lowerInput.includes('summary') || lowerInput.includes('summarize')) return 'summary';
    if (lowerInput.includes('explain')) return 'explanation';
    return 'text';
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      flashcards: "Create flashcards for my current mathematics unit",
      summary: "Summarize the last chapter I studied",
      explain: "Explain the concept of derivatives in simple terms"
    };
    
    setInputValue(actionMessages[action as keyof typeof actionMessages] || '');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-scholar-400 to-cyber-400 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span>AI Study Assistant</span>
          <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center space-x-2 text-xs"
            >
              <action.icon className="w-3 h-3" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-scholar-500 text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'ai' && (
                    <Bot className="w-4 h-4 mt-0.5 text-scholar-500" />
                  )}
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 mt-0.5" />
                  )}
                  <div className="flex-1">
                    {message.type && message.type !== 'text' && (
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {message.type}
                      </Badge>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-scholar-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-scholar-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-scholar-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-scholar-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your studies..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIStudyAssistant;
