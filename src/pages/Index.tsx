import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Chat from '@/components/Chat';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  const donatePackages = [
    {
      name: 'VIP',
      price: '199₽',
      color: 'from-green-500 to-emerald-600',
      features: ['Цветной ник', 'Приватные территории', 'Доступ к /fly', '5 домов']
    },
    {
      name: 'PREMIUM',
      price: '399₽',
      color: 'from-blue-500 to-cyan-600',
      features: ['Все из VIP', 'Уникальные частицы', '/god режим', '15 домов', 'Кит каждые 12ч']
    },
    {
      name: 'LEGEND',
      price: '699₽',
      color: 'from-purple-500 to-pink-600',
      features: ['Все из PREMIUM', 'Креативный режим', 'Неограниченные дома', 'Админ-кит', 'Эксклюзивный префикс']
    }
  ];

  const team = [
    { name: 'qiwi_boss', role: 'Основатель', avatar: 'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e4b85d1d-5192-433d-a644-3fb61118fca5.jpg' },
    { name: 'Admin_Pro', role: 'Гл. Админ', avatar: 'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e4b85d1d-5192-433d-a644-3fb61118fca5.jpg' },
    { name: 'ModerHelper', role: 'Модератор', avatar: 'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e4b85d1d-5192-433d-a644-3fb61118fca5.jpg' },
    { name: 'BuildMaster', role: 'Строитель', avatar: 'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e4b85d1d-5192-433d-a644-3fb61118fca5.jpg' }
  ];

  const rules = [
    { icon: 'Ban', text: 'Запрещены читы и моды дающие преимущество' },
    { icon: 'MessageSquareOff', text: 'Мат и оскорбления караются баном' },
    { icon: 'Construction', text: 'Гриферство запрещено' },
    { icon: 'Users', text: 'Уважайте других игроков' },
    { icon: 'Shield', text: 'Запрещена реклама других серверов' },
    { icon: 'Sparkles', text: 'Не спамьте в чате' }
  ];

  const gallery = [
    'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e7351fe7-bb39-438a-afb0-33ee7738ab98.jpg',
    'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e7351fe7-bb39-438a-afb0-33ee7738ab98.jpg',
    'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e7351fe7-bb39-438a-afb0-33ee7738ab98.jpg',
    'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e7351fe7-bb39-438a-afb0-33ee7738ab98.jpg',
    'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e7351fe7-bb39-438a-afb0-33ee7738ab98.jpg',
    'https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/e7351fe7-bb39-438a-afb0-33ee7738ab98.jpg'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              QIWI WORLD
            </h1>
            <div className="hidden md:flex gap-6">
              {['home', 'chat', 'donate', 'team', 'rules', 'gallery'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' ? 'Главная' :
                   section === 'chat' ? 'Чат' :
                   section === 'donate' ? 'Донат' :
                   section === 'team' ? 'Команда' :
                   section === 'rules' ? 'Правила' : 'Галерея'}
                </button>
              ))}
            </div>
            <Button className="animate-glow">
              <Icon name="Copy" size={16} className="mr-2" />
              play.qiwiworld.ru
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary">Онлайн: 247 игроков</Badge>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                ДОБРО ПОЖАЛОВАТЬ НА
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  QIWI WORLD
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Лучший Minecraft сервер с уникальными режимами, дружным комьюнити и регулярными ивентами
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="text-lg px-8 hover-scale">
                  <Icon name="Gamepad2" size={20} className="mr-2" />
                  Играть
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 hover-scale">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Discord
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl rounded-full"></div>
              <img 
                src="https://cdn.poehali.dev/projects/a03ddf66-9a1c-4956-b810-1052760b5c14/files/47d7b10e-cfe5-471c-a526-215f0fc6d77f.jpg" 
                alt="QIWI WORLD" 
                className="relative rounded-2xl shadow-2xl hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="chat" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">ОБЩИЙ ЧАТ</h2>
            <p className="text-xl text-muted-foreground">Общайтесь с игроками онлайн</p>
          </div>
          <Chat />
        </div>
      </section>

      <section id="donate" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">ДОНАТ ПРИВИЛЕГИИ</h2>
            <p className="text-xl text-muted-foreground">Поддержи сервер и получи уникальные возможности</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {donatePackages.map((pkg, i) => (
              <Card 
                key={i} 
                className="relative overflow-hidden hover-scale border-2 hover:border-primary transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${pkg.color}`}></div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{pkg.name}</h3>
                    <p className="text-3xl font-black bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent">{pkg.price}</p>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={i === 2 ? 'default' : 'outline'}>
                    Купить
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">НАША КОМАНДА</h2>
            <p className="text-xl text-muted-foreground">Администрация всегда на связи</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <Card 
                key={i} 
                className="text-center hover-scale overflow-hidden group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">ПРАВИЛА СЕРВЕРА</h2>
            <p className="text-xl text-muted-foreground">Соблюдайте правила для комфортной игры</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <Card 
                key={i} 
                className="p-6 hover-scale hover:border-primary transition-all duration-300"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Icon name={rule.icon as any} size={24} className="text-primary" />
                  </div>
                  <p className="flex-1 pt-2">{rule.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">ГАЛЕРЕЯ</h2>
            <p className="text-xl text-muted-foreground">Скриншоты нашего мира</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <div 
                key={i} 
                className="relative overflow-hidden rounded-lg group hover-scale cursor-pointer"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Icon name="Expand" size={24} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                QIWI WORLD
              </h3>
              <p className="text-muted-foreground">Лучший Minecraft сервер 2025</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  <span>Discord: qiwiworld</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Send" size={16} />
                  <span>VK: vk.com/qiwiworld</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">IP для входа</h4>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <code className="text-primary font-mono">play.qiwiworld.ru</code>
                <Button size="sm" variant="ghost">
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
            © 2025 QIWI WORLD. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;