import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  username: string;
  message: string;
  created_at: string;
}

const Chat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const AUTH_URL = 'https://functions.poehali.dev/694e743e-dd42-4594-821b-e422aa8a0b92';
  const CHAT_URL = 'https://functions.poehali.dev/8afc64c3-8cb6-4f81-99cf-5dd2427aa05e';

  useEffect(() => {
    const savedUsername = localStorage.getItem('minecraft_username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsAuthenticated(true);
      loadMessages();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(loadMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await fetch(CHAT_URL);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length < 3) {
      toast({
        title: 'Ошибка',
        description: 'Ник должен быть минимум 3 символа',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('minecraft_username', data.username);
      setUsername(data.username);
      setIsAuthenticated(true);
      loadMessages();
      
      toast({
        title: 'Добро пожаловать!',
        description: `Вы вошли как ${data.username}`
      });
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: 'Попробуйте другой ник',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Username': username
        },
        body: JSON.stringify({ message: newMessage.trim() })
      });

      if (!response.ok) throw new Error('Failed to send message');

      setNewMessage('');
      await loadMessages();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('minecraft_username');
    setIsAuthenticated(false);
    setUsername('');
    setMessages([]);
  };

  if (!isAuthenticated) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-primary/20 rounded-full">
                <Icon name="MessageCircle" size={32} className="text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold">Вход в чат</h3>
            <p className="text-muted-foreground">Введите свой игровой ник</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              placeholder="Ваш ник в Minecraft"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-center text-lg"
              maxLength={50}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти в чат'}
            </Button>
          </form>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="p-4 border-b border-border flex items-center justify-between bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Icon name="MessageCircle" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold">Общий чат</h3>
            <p className="text-xs text-muted-foreground">Игроков онлайн: {messages.length > 0 ? new Set(messages.map(m => m.username)).size : 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{username}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <Icon name="LogOut" size={16} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-2 opacity-20" />
              <p>Пока нет сообщений. Будьте первым!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.username === username ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 space-y-1 ${msg.username === username ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-2">
                    {msg.username !== username && (
                      <span className="text-xs font-bold text-primary">{msg.username}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                      msg.username === username
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm break-words">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Напишите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            maxLength={500}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !newMessage.trim()}>
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Chat;
